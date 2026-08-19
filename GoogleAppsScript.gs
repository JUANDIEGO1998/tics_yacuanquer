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
    "Encuesta 5 - Sugerencia",
    "Tiempo",
    "Tiempo (segundos)"
  ];

  if (sheet.getLastRow() === 0) {

    sheet
      .getRange(1, 1, 1, headers.length)
      .setValues([headers]);

  }

  sheet.setFrozenRows(1);

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

    const ss =
      SpreadsheetApp
        .getActiveSpreadsheet();

    let sheet =
      ss.getSheetByName(
        SHEET_NAME
      );

    if (!sheet) {

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
        "Encuesta 5 - Sugerencia",
        "Tiempo",
        "Tiempo (segundos)"
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

    sheet.appendRow([

      data.fecha ||
        new Date().toISOString(),

      data.nombre ||
        "",

      data.dependencia ||
        "",

      data.cargo ||
        "",

      Number(
        data.puntaje || 0
      ),

      data.porcentaje ||
        0,

      data.nivel ||
        "",

      JSON.stringify(
        data.respuestas || []
      ),

      JSON.stringify(
        data.resultadosCompetencias || {}
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
        "",

      data.tiempo ||
        "00:00",

      Number(
        data.tiempoSegundos || 0
      )

    ]);

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

  }

  catch (error) {

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
   CONSULTAR GANADORES
   ===================================================== */

function doGet() {

  try {

    const ss =
      SpreadsheetApp
        .getActiveSpreadsheet();

    const sheet =
      ss.getSheetByName(
        SHEET_NAME
      );

    if (!sheet) {

      return ContentService
        .createTextOutput(
          JSON.stringify({
            ok: true,
            ganadores: []
          })
        )
        .setMimeType(
          ContentService.MimeType.JSON
        );

    }

    const ultimaFila =
      sheet.getLastRow();

    if (ultimaFila < 2) {

      return ContentService
        .createTextOutput(
          JSON.stringify({
            ok: true,
            ganadores: []
          })
        )
        .setMimeType(
          ContentService.MimeType.JSON
        );

    }

    const datos =
      sheet
        .getRange(
          2,
          1,
          ultimaFila - 1,
          16
        )
        .getValues();

    const participantes =
      datos.map(
        function(row) {

          const puntaje =
            Number(
              row[4] || 0
            );

          const porcentaje =
            convertirPorcentaje(
              row[5]
            ) || 0;

          const buenas =
            Math.round(
              puntaje / 100
            );

          const malas =
            Math.max(
              0,
              24 - buenas
            );

          return {

            nombre:
              String(
                row[1] || ""
              ),

            dependencia:
              String(
                row[2] || ""
              ),

            cargo:
              String(
                row[3] || ""
              ),

            puntaje:
              puntaje,

            porcentaje:
              porcentaje,

            buenas:
              buenas,

            malas:
              malas,

            nivel:
              String(
                row[6] || ""
              ),

            tiempo:
              String(
                row[14] || "00:00"
              ),

            tiempoSegundos:
              Number(
                row[15] || 0
              )

          };

        }
      );


    participantes.sort(
      function(a, b) {

        if (
          b.puntaje !==
          a.puntaje
        ) {

          return (
            b.puntaje -
            a.puntaje
          );

        }

        if (
          a.tiempoSegundos !==
          b.tiempoSegundos
        ) {

          return (
            a.tiempoSegundos -
            b.tiempoSegundos
          );

        }

        return (
          b.buenas -
          a.buenas
        );

      }
    );


    const ganadores =
      participantes
        .slice(
          0,
          2
        )
        .map(
          function(
            participante,
            index
          ) {

            return {

              puesto:
                index + 1,

              ...participante

            };

          }
        );


    return ContentService
      .createTextOutput(
        JSON.stringify({

          ok: true,

          ganadores:
            ganadores

        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );

  }

  catch (error) {

    return ContentService
      .createTextOutput(
        JSON.stringify({
          ok: false,
          error: String(error),
          ganadores: []
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );

  }

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

  dashboard.setFrozenRows(0);


  /* =====================================================
     LIMPIAR DASHBOARD
     ===================================================== */

  try {

    dashboard
      .getRange(
        1,
        1,
        dashboard.getMaxRows(),
        dashboard.getMaxColumns()
      )
      .breakApart();

  }

  catch (error) {
    console.log(
      "No había combinaciones."
    );
  }


  const graficos =
    dashboard.getCharts();

  graficos.forEach(
    function(grafico) {

      dashboard.removeChart(
        grafico
      );

    }
  );


  dashboard.clear();


  /* =====================================================
     VERIFICAR DATOS
     ===================================================== */

  const ultimaFila =
    resultados.getLastRow();

  if (ultimaFila < 2) {

    dashboard
      .getRange(1, 1, 1, 9)
      .setValues([[
        "📊 RETO DIGITAL YACUANQUER 2026",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ]]);

    dashboard
      .getRange(1, 1, 1, 9)
      .setBackground("#1F4E78")
      .setFontColor("#FFFFFF")
      .setFontSize(20)
      .setFontWeight("bold");

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
        16
      )
      .getValues();


  const totalParticipantes =
    datos.length;


  /* =====================================================
     VARIABLES GENERALES
     ===================================================== */

  let sumaPorcentaje = 0;

  let cantidadPorcentaje = 0;

  let puntajeTotal = 0;

  let totalBuenas = 0;

  let totalMalas = 0;


  const niveles = {

    "Avanzado": 0,

    "Competente": 0,

    "Básico": 0,

    "Por fortalecer": 0

  };


  const dependencias = {};

  const competencias = {};


  /* =====================================================
     PROCESAR PARTICIPANTES
     ===================================================== */

  datos.forEach(
    function(row) {


      /* -----------------------------------------------
         PUNTAJE TOTAL
         ----------------------------------------------- */

      const puntaje =
        Number(
          row[4] || 0
        );

      puntajeTotal +=
        puntaje;


      /* -----------------------------------------------
         BUENAS Y MALAS
         ----------------------------------------------- */

      const buenas =
        Math.round(
          puntaje / 100
        );

      const malas =
        Math.max(
          0,
          24 - buenas
        );

      totalBuenas +=
        buenas;

      totalMalas +=
        malas;


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

      if (
        !nivel &&
        porcentaje !== null
      ) {

        nivel =
          calcularNivel(
            porcentaje
          );

      }

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
        !dependencias[
          dependencia
        ]
      ) {

        dependencias[
          dependencia
        ] = 0;

      }

      dependencias[
        dependencia
      ]++;


      /* -----------------------------------------------
         RESULTADOS POR COMPETENCIA
         ----------------------------------------------- */

      const resultadosCompetencia =
        row[8];

      if (
        resultadosCompetencia
      ) {

        try {

          const objeto =
            JSON.parse(
              resultadosCompetencia
            );


          Object.keys(
            objeto
          ).forEach(
            function(
              nombreCompetencia
            ) {


              if (
                !competencias[
                  nombreCompetencia
                ]
              ) {

                competencias[
                  nombreCompetencia
                ] = {

                  buenas: 0,

                  malas: 0,

                  total: 0

                };

              }


              const datosCompetencia =
                objeto[
                  nombreCompetencia
                ];


              const buenasCompetencia =
                Number(
                  datosCompetencia.correct ||
                  datosCompetencia.buenas ||
                  0
                );


              const totalCompetencia =
                Number(
                  datosCompetencia.total ||
                  0
                );


              const malasCompetencia =
                Math.max(
                  0,
                  totalCompetencia -
                  buenasCompetencia
                );


              competencias[
                nombreCompetencia
              ].buenas +=
                buenasCompetencia;


              competencias[
                nombreCompetencia
              ].malas +=
                malasCompetencia;


              competencias[
                nombreCompetencia
              ].total +=
                totalCompetencia;

            }
          );

        }

        catch(error) {

          console.log(
            "No se pudo leer competencia:",
            error
          );

        }

      }

    }
  );


  /* =====================================================
     PROMEDIOS
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


  let promedioPuntaje =
    0;

  if (
    totalParticipantes > 0
  ) {

    promedioPuntaje =
      Math.round(
        puntajeTotal /
        totalParticipantes
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
     RANKING
     ===================================================== */

  const ranking =
    datos
      .map(
        function(row) {

          const puntaje =
            Number(
              row[4] || 0
            );

          const buenas =
            Math.round(
              puntaje / 100
            );

          const malas =
            Math.max(
              0,
              24 - buenas
            );

          return {

            nombre:
              String(
                row[1] || ""
              ),

            dependencia:
              String(
                row[2] || ""
              ),

            cargo:
              String(
                row[3] || ""
              ),

            puntaje:
              puntaje,

            buenas:
              buenas,

            malas:
              malas,

            porcentaje:
              convertirPorcentaje(
                row[5]
              ) || 0,

            nivel:
              String(
                row[6] || ""
              ),

            tiempo:
              String(
                row[14] || "00:00"
              ),

            tiempoSegundos:
              Number(
                row[15] || 0
              )

          };

        }
      )
      .sort(
        function(a, b) {

          if (
            b.puntaje !==
            a.puntaje
          ) {

            return (
              b.puntaje -
              a.puntaje
            );

          }

          if (
            a.tiempoSegundos !==
            b.tiempoSegundos
          ) {

            return (
              a.tiempoSegundos -
              b.tiempoSegundos
            );

          }

          return (
            b.buenas -
            a.buenas
          );

        }
      );


  const primerPuesto =
    ranking[0] || null;

  const segundoPuesto =
    ranking[1] || null;


  /* =====================================================
     TÍTULO
     ===================================================== */

  dashboard
    .getRange(1, 1, 1, 9)
    .setValues([[
      "📊 RETO DIGITAL YACUANQUER 2026",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ]]);

  dashboard
    .getRange(1, 1, 1, 9)
    .setBackground("#1F4E78")
    .setFontColor("#FFFFFF")
    .setFontSize(20)
    .setFontWeight("bold");


  dashboard
    .getRange("A2")
    .setValue(
      "Resultados generales de la evaluación de competencias digitales"
    );

  dashboard
    .getRange("A2")
    .setFontSize(12)
    .setFontStyle("italic");


  /* =====================================================
     INDICADORES PRINCIPALES
     ===================================================== */

  dashboard
    .getRange("A4:B11")
    .setValues([

      [
        "👥 Total participantes",
        totalParticipantes
      ],

      [
        "🎯 Puntaje total acumulado",
        puntajeTotal
      ],

      [
        "📊 Puntaje promedio",
        promedioPuntaje
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
      ],

      [
        "✅ Total respuestas buenas",
        totalBuenas
      ],

      [
        "❌ Total respuestas malas",
        totalMalas
      ]

    ]);


  dashboard
    .getRange("A4:A11")
    .setFontWeight("bold");


  dashboard
    .getRange("A4:B4")
    .setBackground("#E8F0FE");

  dashboard
    .getRange("A5:B5")
    .setBackground("#E6F4EA");

  dashboard
    .getRange("A6:B6")
    .setBackground("#E8F0FE");

  dashboard
    .getRange("A7:B7")
    .setBackground("#E6F4EA");

  dashboard
    .getRange("A8:B8")
    .setBackground("#FFF4CE");

  dashboard
    .getRange("A9:B9")
    .setBackground("#FCE8E6");

  dashboard
    .getRange("A10:B10")
    .setBackground("#E6F4EA");

  dashboard
    .getRange("A11:B11")
    .setBackground("#FCE8E6");


  /* =====================================================
     GANADORES
     ===================================================== */

  dashboard
    .getRange("A13:G13")
    .setValues([[
      "🏆 GANADORES DEL RETO",
      "",
      "",
      "",
      "",
      "",
      ""
    ]]);

  dashboard
    .getRange("A13:G13")
    .setBackground("#1F4E78")
    .setFontColor("#FFFFFF")
    .setFontSize(15)
    .setFontWeight("bold");


  dashboard
    .getRange("A14:G14")
    .setValues([[
      "Puesto",
      "Participante",
      "Dependencia",
      "Cargo",
      "Buenas",
      "Puntaje",
      "Tiempo"
    ]]);

  dashboard
    .getRange("A14:G14")
    .setBackground("#D9EAF7")
    .setFontWeight("bold");


  const filasGanadores = [];


  if (primerPuesto) {

    filasGanadores.push([

      "🥇 Primer puesto",

      primerPuesto.nombre,

      primerPuesto.dependencia,

      primerPuesto.cargo,

      primerPuesto.buenas,

      primerPuesto.puntaje,

      primerPuesto.tiempo

    ]);

  }


  if (segundoPuesto) {

    filasGanadores.push([

      "🥈 Segundo puesto",

      segundoPuesto.nombre,

      segundoPuesto.dependencia,

      segundoPuesto.cargo,

      segundoPuesto.buenas,

      segundoPuesto.puntaje,

      segundoPuesto.tiempo

    ]);

  }


  if (
    filasGanadores.length > 0
  ) {

    dashboard
      .getRange(
        15,
        1,
        filasGanadores.length,
        7
      )
      .setValues(
        filasGanadores
      );

  }


  /* =====================================================
     COMPETENCIAS
     ===================================================== */

  const filaCompetenciasInicio =
    19;


  dashboard
    .getRange(
      filaCompetenciasInicio,
      1,
      1,
      4
    )
    .setValues([[
      "📚 RESULTADOS POR COMPETENCIA",
      "",
      "",
      ""
    ]]);


  dashboard
    .getRange(
      filaCompetenciasInicio,
      1,
      1,
      4
    )
    .setBackground("#1F4E78")
    .setFontColor("#FFFFFF")
    .setFontWeight("bold");


  dashboard
    .getRange(
      filaCompetenciasInicio + 1,
      1,
      1,
      4
    )
    .setValues([[
      "Competencia",
      "Respuestas buenas",
      "Respuestas malas",
      "Total respuestas"
    ]]);


  dashboard
    .getRange(
      filaCompetenciasInicio + 1,
      1,
      1,
      4
    )
    .setBackground("#D9EAF7")
    .setFontWeight("bold");


  const filasCompetencias = [];


  Object.keys(
    competencias
  )
    .sort()
    .forEach(
      function(nombreCompetencia) {

        const datosCompetencia =
          competencias[
            nombreCompetencia
          ];

        filasCompetencias.push([

          nombreCompetencia,

          datosCompetencia.buenas,

          datosCompetencia.malas,

          datosCompetencia.total

        ]);

      }
    );


  if (
    filasCompetencias.length > 0
  ) {

    dashboard
      .getRange(
        filaCompetenciasInicio + 2,
        1,
        filasCompetencias.length,
        4
      )
      .setValues(
        filasCompetencias
      );

  }


  /* =====================================================
     DEPENDENCIAS
     ===================================================== */

  const filaDependenciasInicio =
    Math.max(
      27,
      filaCompetenciasInicio +
      filasCompetencias.length +
      4
    );


  dashboard
    .getRange(
      filaDependenciasInicio,
      1,
      1,
      2
    )
    .setValues([[
      "Dependencia",
      "Participantes"
    ]]);


  dashboard
    .getRange(
      filaDependenciasInicio,
      1,
      1,
      2
    )
    .setFontWeight("bold")
    .setBackground("#1F4E78")
    .setFontColor("#FFFFFF");


  let filaDependencia =
    filaDependenciasInicio + 1;


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
          .setValues([[
            dependencia,
            dependencias[
              dependencia
            ]
          ]]);

        filaDependencia++;

      }
    );


  /* =====================================================
     NIVELES
     ===================================================== */

  const filaNivelesInicio =
    filaDependenciasInicio;


  dashboard
    .getRange(
      filaNivelesInicio,
      4,
      1,
      2
    )
    .setValues([[
      "Nivel",
      "Participantes"
    ]]);


  dashboard
    .getRange(
      filaNivelesInicio,
      4,
      1,
      2
    )
    .setFontWeight("bold")
    .setBackground("#1F4E78")
    .setFontColor("#FFFFFF");


  const ordenNiveles = [

    "Avanzado",

    "Competente",

    "Básico",

    "Por fortalecer"

  ];


  let filaNivel =
    filaNivelesInicio + 1;


  ordenNiveles.forEach(
    function(nivel) {

      dashboard
        .getRange(
          filaNivel,
          4,
          1,
          2
        )
        .setValues([[
          nivel,
          niveles[nivel]
        ]]);


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

  const filaExplicacion =
    filaNivelesInicio + 7;


  dashboard
    .getRange(
      filaExplicacion,
      4,
      1,
      3
    )
    .setValues([[
      "Nivel",
      "Rango",
      "¿Qué significa?"
    ]]);


  dashboard
    .getRange(
      filaExplicacion,
      4,
      1,
      3
    )
    .setFontWeight("bold")
    .setBackground("#1F4E78")
    .setFontColor("#FFFFFF");


  dashboard
    .getRange(
      filaExplicacion + 1,
      4,
      4,
      3
    )
    .setValues([

      [
        "Avanzado",
        "80% a 100%",
        "Buen dominio de las competencias digitales."
      ],

      [
        "Competente",
        "60% a 79%",
        "Desempeño adecuado en el uso de herramientas digitales."
      ],

      [
        "Básico",
        "40% a 59%",
        "Tiene conocimientos iniciales y puede fortalecer algunas áreas."
      ],

      [
        "Por fortalecer",
        "0% a 39%",
        "Requiere mayor acompañamiento y capacitación."
      ]

    ]);


  dashboard
    .getRange(
      filaExplicacion + 1,
      4,
      4,
      1
    )
    .setFontWeight("bold");


  /* =====================================================
     GRÁFICO DE DEPENDENCIAS
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
        filaDependenciasInicio,
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
          filaDependenciasInicio,
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
            position: "none"
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
     GRÁFICO DE NIVELES
     ===================================================== */

  const rangoNiveles =
    dashboard.getRange(
      filaNivelesInicio,
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
        filaNivelesInicio + 18,
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
          position: "right"
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
    graficoNiveles
  );


  /* =====================================================
     GRÁFICO DE BUENAS Y MALAS
     ===================================================== */

  if (
    filasCompetencias.length > 0
  ) {

    const rangoCompetencias =
      dashboard.getRange(
        filaCompetenciasInicio + 1,
        1,
        filasCompetencias.length + 1,
        3
      );


    const graficoCompetencias =
      dashboard
        .newChart()
        .setChartType(
          Charts.ChartType.COLUMN
        )
        .addRange(
          rangoCompetencias
        )
        .setPosition(
          filaCompetenciasInicio,
          7,
          0,
          0
        )
        .setOption(
          "title",
          "📊 Respuestas buenas y malas por competencia"
        )
        .setOption(
          "legend",
          {
            position: "bottom"
          }
        )
        .setOption(
          "height",
          400
        )
        .setOption(
          "width",
          700
        )
        .build();


    dashboard.insertChart(
      graficoCompetencias
    );

  }


  /* =====================================================
     INFORMACIÓN GENERAL
     ===================================================== */

  const filaInfo =
    filaNivelesInicio + 14;


  dashboard
    .getRange(
      filaInfo,
      1,
      5,
      2
    )
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
    .getRange(
      filaInfo,
      1
    )
    .setFontWeight("bold")
    .setBackground("#1F4E78")
    .setFontColor("#FFFFFF");


  /* =====================================================
     FORMATO FINAL
     ===================================================== */

  dashboard.setColumnWidth(
    1,
    230
  );

  dashboard.setColumnWidth(
    2,
    170
  );

  dashboard.setColumnWidth(
    3,
    230
  );

  dashboard.setColumnWidth(
    4,
    180
  );

  dashboard.setColumnWidth(
    5,
    130
  );

  dashboard.setColumnWidth(
    6,
    130
  );

  dashboard.setColumnWidth(
    7,
    110
  );

  dashboard.setColumnWidth(
    8,
    30
  );

  dashboard.setColumnWidth(
    9,
    30
  );


  dashboard
    .getRange(
      "A1:I100"
    )
    .setVerticalAlignment(
      "middle"
    );


  dashboard
    .getRange(
      "A1:I100"
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


  if (
    typeof valor === "number"
  ) {

    numero =
      valor;

  }

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


  if (
    numero > 0 &&
    numero <= 1
  ) {

    numero =
      numero * 100;

  }


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


  if (
    texto.includes(
      "avanz"
    )
  ) {

    return "Avanzado";

  }


  if (
    texto.includes(
      "compet"
    )
  ) {

    return "Competente";

  }


  if (
    texto.includes(
      "basic"
    )
  ) {

    return "Básico";

  }


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

function calcularNivel(
  porcentaje
) {

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
    .createMenu(
      "📊 Reto Digital"
    )
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