
const SHEET_NAME = "Resultados";
const DASHBOARD_NAME = "Dashboard";


/* =====================================================
   CONFIGURACIÓN INICIAL
   ===================================================== */

function setup() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  const headers = [
    "Fecha",
    "Nombre",
    "Dependencia",
    "Cargo",
    "Puntaje",
    "Porcentaje",
    "Nivel",
    "Respuestas",
    "Resultados por competencia",
    "Encuesta 1 - Calificación",
    "Encuesta 2 - Aplicabilidad",
    "Encuesta 3 - Metodología",
    "Encuesta 4 - Tema a profundizar",
    "Encuesta 5 - Sugerencia"
  ];

  /*
   * Si la hoja está vacía,
   * crear encabezados.
   */
  if (sheet.getLastRow() === 0) {

    sheet
      .getRange(1, 1, 1, headers.length)
      .setValues([headers]);

  }

  /*
   * Mantener únicamente la primera fila
   * inmovilizada en Resultados.
   */
  sheet.setFrozenRows(1);

  /*
   * Crear o actualizar Dashboard.
   */
  crearDashboard();
}


/* =====================================================
   RECIBIR RESULTADOS DE LA PLATAFORMA
   ===================================================== */

function doPost(e) {

  try {

    if (
      !e ||
      !e.postData ||
      !e.postData.contents
    ) {

      return ContentService
        .createTextOutput(
          JSON.stringify({
            ok: false,
            error: "No se recibieron datos."
          })
        )
        .setMimeType(
          ContentService.MimeType.JSON
        );

    }

    const data =
      JSON.parse(
        e.postData.contents
      );


    let sheet =
      SpreadsheetApp
        .getActiveSpreadsheet()
        .getSheetByName(
          SHEET_NAME
        );


    /*
     * Si no existe Resultados,
     * crearla.
     */
    if (!sheet) {

      const ss =
        SpreadsheetApp
          .getActiveSpreadsheet();

      sheet =
        ss.insertSheet(
          SHEET_NAME
        );


      const headers = [
        "Fecha",
        "Nombre",
        "Dependencia",
        "Cargo",
        "Puntaje",
        "Porcentaje",
        "Nivel",
        "Respuestas",
        "Resultados por competencia",
        "Encuesta 1 - Calificación",
        "Encuesta 2 - Aplicabilidad",
        "Encuesta 3 - Metodología",
        "Encuesta 4 - Tema a profundizar",
        "Encuesta 5 - Sugerencia"
      ];


      sheet
        .getRange(
          1,
          1,
          1,
          headers.length
        )
        .setValues(
          [headers]
        );


      sheet.setFrozenRows(1);

    }


    const encuesta =
      data.encuesta || {};


    /*
     * Registrar el resultado.
     */
    sheet.appendRow([

      data.fecha ||
        new Date().toISOString(),

      data.nombre ||
        "",

      data.dependencia ||
        "",

      data.cargo ||
        "",

      data.puntaje ||
        0,

      data.porcentaje ||
        0,

      data.nivel ||
        "",

      JSON.stringify(
        data.respuestas ||
        []
      ),

      JSON.stringify(
        data.resultadosCompetencias ||
        {}
      ),

      encuesta.s1 ||
        "",

      encuesta.s2 ||
        "",

      encuesta.s3 ||
        "",

      encuesta.s4 ||
        "",

      encuesta.s5 ||
        ""

    ]);


    /*
     * Actualizar Dashboard
     * después de cada participación.
     */
    crearDashboard();


    return ContentService
      .createTextOutput(
        JSON.stringify({
          ok: true
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );


  } catch (error) {

    return ContentService
      .createTextOutput(
        JSON.stringify({
          ok: false,
          error: String(error)
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );

  }

}


/* =====================================================
   SERVICIO ACTIVO
   ===================================================== */

function doGet() {

  return ContentService
    .createTextOutput(
      "Reto Digital Yacuanquer: servicio activo."
    );

}


/* =====================================================
   CREAR DASHBOARD
   ===================================================== */

function crearDashboard() {

  const ss =
    SpreadsheetApp
      .getActiveSpreadsheet();


  const resultados =
    ss.getSheetByName(
      SHEET_NAME
    );


  if (!resultados) {
    return;
  }


  /*
   * Crear Dashboard si no existe.
   */
  let dashboard =
    ss.getSheetByName(
      DASHBOARD_NAME
    );


  if (!dashboard) {

    dashboard =
      ss.insertSheet(
        DASHBOARD_NAME
      );

  }


  /* =====================================================
     LIMPIAR DASHBOARD
     ===================================================== */

  /*
   * Eliminar filas inmovilizadas.
   */
  dashboard.setFrozenRows(0);


  /*
   * Separar cualquier combinación antigua
   * que haya quedado de versiones anteriores.
   *
   * Esto evita los errores:
   *
   * "No se pueden combinar filas inmovilizadas..."
   *
   * y
   *
   * "Debes seleccionar todas las celdas..."
   */
  try {

    dashboard
      .getRange(
        1,
        1,
        dashboard.getMaxRows(),
        dashboard.getMaxColumns()
      )
      .breakApart();

  } catch (error) {

    console.log(
      "No había combinaciones que separar."
    );

  }


  /*
   * Eliminar gráficos anteriores.
   */
  const graficos =
    dashboard.getCharts();


  graficos.forEach(
    function(grafico) {

      dashboard.removeChart(
        grafico
      );

    }
  );


  /*
   * Limpiar contenido y formato.
   */
  dashboard.clear();


  /* =====================================================
     COMPROBAR SI HAY RESULTADOS
     ===================================================== */

  const ultimaFila =
    resultados.getLastRow();


  if (ultimaFila < 2) {

    dashboard
      .getRange("A1")
      .setValue(
        "📊 RETO DIGITAL YACUANQUER 2026"
      );


    dashboard
      .getRange("A1")
      .setFontSize(22)
      .setFontWeight("bold")
      .setBackground("#1F4E78")
      .setFontColor("#FFFFFF");


    dashboard
      .getRange("A3")
      .setValue(
        "Todavía no hay participantes registrados."
      );


    return;

  }


  /* =====================================================
     LEER RESULTADOS
     ===================================================== */

  const datos =
    resultados
      .getRange(
        2,
        1,
        ultimaFila - 1,
        14
      )
      .getValues();


  const totalParticipantes =
    datos.length;


  /* =====================================================
     VARIABLES
     ===================================================== */

  let sumaPorcentaje = 0;

  let cantidadPorcentaje = 0;


  /*
   * Niveles siempre disponibles.
   */
  const niveles = {

    "Avanzado": 0,

    "Competente": 0,

    "Básico": 0,

    "Por fortalecer": 0

  };


  /*
   * Dependencias.
   */
  const dependencias = {};


  /* =====================================================
     PROCESAR CADA PARTICIPANTE
     ===================================================== */

  datos.forEach(
    function(row) {


      /* -----------------------------------------------
         PORCENTAJE
         ----------------------------------------------- */

      const porcentaje =
        convertirPorcentaje(
          row[5]
        );


      if (
        porcentaje !== null
      ) {

        sumaPorcentaje +=
          porcentaje;

        cantidadPorcentaje++;

      }


      /* -----------------------------------------------
         NIVEL
         ----------------------------------------------- */

      let nivel =
        normalizarNivel(
          row[6]
        );


      /*
       * Si el nivel viene vacío o no se reconoce,
       * calcularlo automáticamente mediante porcentaje.
       */
      if (
        !nivel &&
        porcentaje !== null
      ) {

        nivel =
          calcularNivel(
            porcentaje
          );

      }


      /*
       * Si no existe nivel ni porcentaje,
       * dejarlo como "Por fortalecer".
       *
       * Esto permite que el participante
       * no desaparezca del gráfico.
       */
      if (!nivel) {

        nivel =
          "Por fortalecer";

      }


      niveles[nivel]++;


      /* -----------------------------------------------
         DEPENDENCIA
         ----------------------------------------------- */

      let dependencia =
        String(
          row[2] || ""
        ).trim();


      if (!dependencia) {

        dependencia =
          "Sin dependencia registrada";

      }


      if (
        !dependencias[dependencia]
      ) {

        dependencias[dependencia] =
          0;

      }


      dependencias[dependencia]++;

    }
  );


  /* =====================================================
     PROMEDIO GENERAL
     ===================================================== */

  let promedio =
    0;


  if (
    cantidadPorcentaje > 0
  ) {

    promedio =
      Math.round(
        sumaPorcentaje /
        cantidadPorcentaje
      );

  }


  /* =====================================================
     NIVEL MÁS FRECUENTE
     ===================================================== */

  let nivelPrincipal =
    "Sin datos";


  let mayorCantidad =
    0;


  Object.keys(
    niveles
  ).forEach(
    function(nivel) {

      if (
        niveles[nivel] >
        mayorCantidad
      ) {

        mayorCantidad =
          niveles[nivel];

        nivelPrincipal =
          nivel;

      }

    }
  );


  /* =====================================================
     TÍTULO
     ===================================================== */

  dashboard
    .getRange("A1:H1")
    .setValues([

      [
        "📊 RETO DIGITAL YACUANQUER 2026",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ]

    ]);


  /*
   * NO usamos merge().
   */
  dashboard
    .getRange("A1:H1")
    .setBackground(
      "#1F4E78"
    )
    .setFontColor(
      "#FFFFFF"
    )
    .setFontSize(
      20
    )
    .setFontWeight(
      "bold"
    );


  dashboard
    .getRange("A2")
    .setValue(
      "Resultados de la evaluación de competencias digitales"
    );


  dashboard
    .getRange("A2")
    .setFontSize(
      12
    )
    .setFontStyle(
      "italic"
    );


  /* =====================================================
     INDICADORES
     ===================================================== */

  dashboard
    .getRange("A4:B7")
    .setValues([

      [
        "👥 Total participantes",
        totalParticipantes
      ],

      [
        "📈 Promedio general",
        promedio + "%"
      ],

      [
        "🏆 Nivel más frecuente",
        nivelPrincipal
      ],

      [
        "👤 Participantes en ese nivel",
        mayorCantidad
      ]

    ]);


  dashboard
    .getRange("A4:A7")
    .setFontWeight(
      "bold"
    );


  dashboard
    .getRange("A4:B4")
    .setBackground(
      "#E8F0FE"
    );


  dashboard
    .getRange("A5:B5")
    .setBackground(
      "#E6F4EA"
    );


  dashboard
    .getRange("A6:B6")
    .setBackground(
      "#FFF4CE"
    );


  dashboard
    .getRange("A7:B7")
    .setBackground(
      "#FCE8E6"
    );


  /* =====================================================
     TABLA DE DEPENDENCIAS
     ===================================================== */

  dashboard
    .getRange("A10:B10")
    .setValues([

      [
        "Dependencia",
        "Participantes"
      ]

    ]);


  dashboard
    .getRange("A10:B10")
    .setFontWeight(
      "bold"
    )
    .setBackground(
      "#1F4E78"
    )
    .setFontColor(
      "#FFFFFF"
    );


  let filaDependencia =
    11;


  Object.keys(
    dependencias
  )
    .sort()
    .forEach(
      function(dependencia) {

        dashboard
          .getRange(
            filaDependencia,
            1,
            1,
            2
          )
          .setValues([

            [
              dependencia,
              dependencias[
                dependencia
              ]
            ]

          ]);


        filaDependencia++;

      }
    );


  /* =====================================================
     TABLA DE NIVELES
     ===================================================== */

  dashboard
    .getRange("D10:E10")
    .setValues([

      [
        "Nivel",
        "Participantes"
      ]

    ]);


  dashboard
    .getRange("D10:E10")
    .setFontWeight(
      "bold"
    )
    .setBackground(
      "#1F4E78"
    )
    .setFontColor(
      "#FFFFFF"
    );


  const ordenNiveles = [

    "Avanzado",

    "Competente",

    "Básico",

    "Por fortalecer"

  ];


  let filaNivel =
    11;


  ordenNiveles.forEach(
    function(nivel) {

      dashboard
        .getRange(
          filaNivel,
          4,
          1,
          2
        )
        .setValues([

          [
            nivel,
            niveles[nivel]
          ]

        ]);


      /*
       * Colores.
       */
      let color =
        "#D9EAD3";


      if (
        nivel === "Avanzado"
      ) {

        color =
          "#34A853";

      }


      if (
        nivel === "Competente"
      ) {

        color =
          "#4285F4";

      }


      if (
        nivel === "Básico"
      ) {

        color =
          "#FBBC04";

      }


      if (
        nivel === "Por fortalecer"
      ) {

        color =
          "#EA4335";

      }


      dashboard
        .getRange(
          filaNivel,
          4
        )
        .setBackground(
          color
        )
        .setFontColor(
          "#FFFFFF"
        )
        .setFontWeight(
          "bold"
        );


      filaNivel++;

    }
  );


  /* =====================================================
     EXPLICACIÓN DE NIVELES
     ===================================================== */

  dashboard
    .getRange("D17:F17")
    .setValues([

      [
        "Nivel",
        "Color",
        "¿Qué significa?"
      ]

    ]);


  dashboard
    .getRange("D17:F17")
    .setFontWeight(
      "bold"
    )
    .setBackground(
      "#1F4E78"
    )
    .setFontColor(
      "#FFFFFF"
    );


  dashboard
    .getRange("D18:F21")
    .setValues([

      [
        "Avanzado",
        "🟢",
        "Buen dominio de las competencias digitales."
      ],

      [
        "Competente",
        "🔵",
        "Desempeño adecuado en el uso de herramientas digitales."
      ],

      [
        "Básico",
        "🟡",
        "Tiene conocimientos iniciales y puede fortalecer algunas áreas."
      ],

      [
        "Por fortalecer",
        "🔴",
        "Requiere mayor acompañamiento y capacitación."
      ]

    ]);


  dashboard
    .getRange("D18:D21")
    .setFontWeight(
      "bold"
    );


  /* =====================================================
     GRÁFICO 1
     PARTICIPANTES POR DEPENDENCIA
     ===================================================== */

  const cantidadDependencias =
    Object.keys(
      dependencias
    ).length;


  if (
    cantidadDependencias > 0
  ) {

    const rangoDependencias =
      dashboard.getRange(
        10,
        1,
        cantidadDependencias + 1,
        2
      );


    const graficoDependencias =
      dashboard
        .newChart()
        .setChartType(
          Charts.ChartType.COLUMN
        )
        .addRange(
          rangoDependencias
        )
        .setPosition(
          10,
          7,
          0,
          0
        )
        .setOption(
          "title",
          "👥 Participantes por dependencia"
        )
        .setOption(
          "legend",
          {
            position:
              "none"
          }
        )
        .setOption(
          "height",
          350
        )
        .setOption(
          "width",
          600
        )
        .build();


    dashboard.insertChart(
      graficoDependencias
    );

  }


  /* =====================================================
     GRÁFICO 2
     DISTRIBUCIÓN POR NIVEL
     ===================================================== */

  /*
   * Siempre habrá cuatro niveles:
   * Avanzado
   * Competente
   * Básico
   * Por fortalecer
   *
   * Aunque alguno tenga 0 participantes.
   */

  const rangoNiveles =
    dashboard.getRange(
      10,
      4,
      5,
      2
    );


  const graficoNiveles =
    dashboard
      .newChart()
      .setChartType(
        Charts.ChartType.PIE
      )
      .addRange(
        rangoNiveles
      )
      .setPosition(
        28,
        7,
        0,
        0
      )
      .setOption(
        "title",
        "🏆 Distribución por nivel"
      )
      .setOption(
        "pieSliceText",
        "percentage"
      )
      .setOption(
        "legend",
        {
          position:
            "right"
        }
      )
      .setOption(
        "height",
        350
      )
      .setOption(
        "width",
        600
      )
      .setOption(
        "slices",
        {

          0: {
            color:
              "#34A853"
          },

          1: {
            color:
              "#4285F4"
          },

          2: {
            color:
              "#FBBC04"
          },

          3: {
            color:
              "#EA4335"
          }

        }
      )
      .build();


  dashboard.insertChart(
    graficoNiveles
  );


  /* =====================================================
     INFORMACIÓN ADICIONAL
     ===================================================== */

  dashboard
    .getRange("A17:B21")
    .setValues([

      [
        "📌 Interpretación",
        ""
      ],

      [
        "🟢 Avanzado",
        "80% a 100%"
      ],

      [
        "🔵 Competente",
        "60% a 79%"
      ],

      [
        "🟡 Básico",
        "40% a 59%"
      ],

      [
        "🔴 Por fortalecer",
        "0% a 39%"
      ]

    ]);


  dashboard
    .getRange("A17:B17")
    .setFontWeight(
      "bold"
    )
    .setBackground(
      "#1F4E78"
    )
    .setFontColor(
      "#FFFFFF"
    );


  /* =====================================================
     FORMATO FINAL
     ===================================================== */

  dashboard
    .setColumnWidth(
      1,
      230
    );


  dashboard
    .setColumnWidth(
      2,
      140
    );


  dashboard
    .setColumnWidth(
      3,
      30
    );


  dashboard
    .setColumnWidth(
      4,
      150
    );


  dashboard
    .setColumnWidth(
      5,
      110
    );


  dashboard
    .setColumnWidth(
      6,
      350
    );


  dashboard
    .setColumnWidth(
      7,
      30
    );


  dashboard
    .setColumnWidth(
      8,
      30
    );


  dashboard
    .getRange(
      "A1:H40"
    )
    .setVerticalAlignment(
      "middle"
    );


  dashboard
    .getRange(
      "A1:H40"
    )
    .setWrap(
      true
    );


  dashboard.setRowHeight(
    1,
    45
  );


  dashboard.setRowHeight(
    2,
    30
  );


  dashboard.setRowHeight(
    17,
    30
  );


  dashboard.setRowHeight(
    18,
    30
  );


  dashboard.setRowHeight(
    19,
    30
  );


  dashboard.setRowHeight(
    20,
    30
  );


  dashboard.setRowHeight(
    21,
    30
  );

}


/* =====================================================
   CONVERTIR PORCENTAJE
   ===================================================== */

function convertirPorcentaje(valor) {

  if (
    valor === null ||
    valor === undefined ||
    valor === ""
  ) {

    return null;

  }


  let numero;


  /*
   * Si ya es número.
   */
  if (
    typeof valor === "number"
  ) {

    numero =
      valor;

  }

  /*
   * Si es texto.
   */
  else {

    numero =
      parseFloat(
        String(valor)
          .replace("%", "")
          .replace(",", ".")
          .trim()
      );

  }


  if (
    isNaN(numero)
  ) {

    return null;

  }


  /*
   * Si viene como decimal:
   *
   * 0.85 → 85
   * 0.72 → 72
   */
  if (
    numero > 0 &&
    numero <= 1
  ) {

    numero =
      numero * 100;

  }


  /*
   * Mantenerlo dentro de 0-100.
   */
  numero =
    Math.max(
      0,
      Math.min(
        100,
        numero
      )
    );


  return numero;

}


/* =====================================================
   NORMALIZAR NIVEL
   ===================================================== */

function normalizarNivel(valor) {

  if (
    valor === null ||
    valor === undefined ||
    valor === ""
  ) {

    return null;

  }


  const texto =
    String(valor)
      .toLowerCase()
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .trim();


  /*
   * Avanzado
   */
  if (
    texto.includes(
      "avanz"
    )
  ) {

    return "Avanzado";

  }


  /*
   * Competente
   */
  if (
    texto.includes(
      "compet"
    )
  ) {

    return "Competente";

  }


  /*
   * Básico
   */
  if (
    texto.includes(
      "basic"
    )
  ) {

    return "Básico";

  }


  /*
   * Por fortalecer
   */
  if (
    texto.includes(
      "fortal"
    ) ||
    texto.includes(
      "mejorar"
    )
  ) {

    return "Por fortalecer";

  }


  return null;

}


/* =====================================================
   CALCULAR NIVEL SEGÚN PORCENTAJE
   ===================================================== */

function calcularNivel(porcentaje) {

  if (
    porcentaje >= 80
  ) {

    return "Avanzado";

  }


  if (
    porcentaje >= 60
  ) {

    return "Competente";

  }


  if (
    porcentaje >= 40
  ) {

    return "Básico";

  }


  return "Por fortalecer";

}
/* =====================================================
   MENÚ RETO DIGITAL
   ===================================================== */

function onOpen() {

  SpreadsheetApp
    .getUi()
    .createMenu("📊 Reto Digital")
    .addItem(
      "🔄 Actualizar resultados",
      "actualizarResultados"
    )
    .addItem(
      "📊 Abrir Dashboard",
      "abrirDashboard"
    )
    .addToUi();

}


/* =====================================================
   ACTUALIZAR RESULTADOS
   ===================================================== */

function actualizarResultados() {

  crearDashboard();

  SpreadsheetApp
    .getActiveSpreadsheet()
    .toast(
      "Resultados y gráficos actualizados correctamente.",
      "✅ Reto Digital",
      5
    );

}


/* =====================================================
   ABRIR DASHBOARD
   ===================================================== */

function abrirDashboard() {

  const ss =
    SpreadsheetApp
      .getActiveSpreadsheet();

  const dashboard =
    ss.getSheetByName(
      DASHBOARD_NAME
    );

  if (!dashboard) {

    crearDashboard();

  }

  ss.setActiveSheet(
    ss.getSheetByName(
      DASHBOARD_NAME
    )
  );

}