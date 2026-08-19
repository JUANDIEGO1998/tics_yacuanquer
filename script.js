// ⚠️ IMPORTANTE: Reemplaza esta URL con la que obtengas de Google Apps Script
// ✅ CORREGIDO: Usa la URL completa que obtengas al publicar
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycby1xqhahb1psBuzRKx0dTQaV4WaE3lr6jUlyHVK2w0EN1c6l1DGWgyBZqYBF_A0gX0m/exec";

/* =====================================================
   PREGUNTAS DEL RETO
   ===================================================== */

const questions = [

  // =====================================================
  // 🔐 SEGURIDAD DIGITAL
  // =====================================================

  [
    "🔐 Seguridad digital",
    "Un funcionario necesita crear una contraseña para acceder a una plataforma institucional. ¿Cuál de las siguientes opciones sería la más recomendable?",
    [
      "Yacuanquer2026",
      "Alcaldia#2026",
      "Yacuanquer123!",
      "M#r7!pQ2@xL9"
    ],
    3,
    "Una contraseña segura debe ser difícil de adivinar, tener suficiente longitud y combinar diferentes tipos de caracteres."
  ],

  [
    "🔐 Seguridad digital",
    "Recibes un correo aparentemente enviado por una entidad conocida. El mensaje indica que tu cuenta será bloqueada en pocas horas y contiene un enlace para actualizar la contraseña. ¿Qué sería lo más adecuado?",
    [
      "Ingresar al enlace para evitar que bloqueen la cuenta.",
      "Verificar la solicitud mediante un canal oficial antes de ingresar cualquier dato.",
      "Responder el correo preguntando si realmente fue enviado por la entidad.",
      "Reenviar el mensaje a otros funcionarios para saber qué hicieron ellos."
    ],
    1,
    "Los mensajes que generan urgencia pueden utilizarse para engañar al usuario. Lo recomendable es verificar la solicitud por un canal oficial y no utilizar directamente el enlace recibido."
  ],

  [
    "🔐 Seguridad digital",
    "Un funcionario tiene una contraseña segura para su correo institucional y la entidad activa una segunda verificación mediante un código enviado a su teléfono. ¿Qué beneficio se obtiene principalmente?",
    [
      "La contraseña deja de ser necesaria.",
      "El correo puede ser utilizado por varias personas.",
      "Se agrega una segunda capa de verificación para reducir el riesgo de accesos no autorizados.",
      "El sistema guarda automáticamente todas las contraseñas."
    ],
    2,
    "La autenticación de dos factores agrega una segunda verificación además de la contraseña, dificultando el acceso incluso si la contraseña llegara a ser comprometida."
  ],

  [
    "🔐 Seguridad digital",
    "Terminas tu jornada y debes retirarte unos minutos de un computador institucional que tiene abierto el correo y otros sistemas. ¿Cuál sería la mejor decisión?",
    [
      "Bloquear la sesión antes de retirarte.",
      "Dejar el equipo abierto porque regresarás pronto.",
      "Cerrar únicamente el correo y dejar los demás sistemas abiertos.",
      "Pedirle a otro compañero que vigile el computador."
    ],
    0,
    "Bloquear la sesión evita que otra persona pueda acceder a información o sistemas mientras el equipo se encuentra desatendido."
  ],

  // =====================================================
  // 📧 COMUNICACIÓN DIGITAL
  // =====================================================

  [
    "📧 Comunicación digital",
    "Vas a enviar un documento institucional a varias personas y el archivo contiene información que no todos necesitan conocer. ¿Qué deberías revisar antes de enviarlo?",
    [
      "Que el mensaje tenga muchas personas como destinatarios.",
      "Que el correo se envíe rápidamente.",
      "Que el asunto diga únicamente 'URGENTE'.",
      "Que los destinatarios, el archivo adjunto y los permisos de acceso sean los adecuados."
    ],
    3,
    "Antes de enviar información institucional es importante verificar destinatarios, archivos adjuntos y que la información llegue solamente a quienes realmente la necesitan."
  ],

  [
    "📧 Comunicación digital",
    "Recibes de un remitente desconocido un archivo llamado 'Documento_Importante.exe'. El mensaje parece relacionado con una actividad laboral. ¿Qué haces?",
    [
      "Abrirlo para comprobar qué contiene.",
      "Descargarlo y enviarlo a un compañero para que lo revise.",
      "No abrirlo y reportar el mensaje como sospechoso.",
      "Guardarlo en Drive para revisarlo después."
    ],
    2,
    "Los archivos ejecutables provenientes de fuentes desconocidas pueden contener software malicioso. Lo recomendable es no abrirlos y reportarlos."
  ],

  [
    "📧 Comunicación digital",
    "Necesitas enviar un correo a otra dependencia para solicitar información sobre un proceso. ¿Cuál de estas opciones representa una comunicación más adecuada?",
    [
      "Utilizar un asunto claro y explicar brevemente qué información se solicita y para qué se necesita.",
      "Enviar únicamente la palabra 'URGENTE'.",
      "No colocar asunto para que el destinatario lea directamente el contenido.",
      "Escribir todo el mensaje en mayúsculas para llamar la atención."
    ],
    0,
    "Un asunto claro y un mensaje concreto facilitan la comprensión, organización y seguimiento de las comunicaciones institucionales."
  ],

  [
    "📧 Comunicación digital",
    "Recibes un correo dirigido a varias personas, pero la respuesta que necesitas enviar solamente interesa al remitente. ¿Qué opción es más adecuada?",
    [
      "Responder a todos para asegurarte de que nadie quede por fuera.",
      "Reenviar el correo a toda la dependencia.",
      "Responder únicamente al remitente.",
      "Crear un nuevo correo sin explicar el contexto."
    ],
    2,
    "Responder únicamente al remitente cuando los demás destinatarios no necesitan la información evita compartir mensajes innecesariamente."
  ],

  // =====================================================
  // 📂 GESTIÓN DE INFORMACIÓN
  // =====================================================

  [
    "📂 Gestión de información",
    "Necesitas compartir un documento institucional con un compañero para que pueda editarlo. El archivo contiene información de trabajo que no debe quedar disponible públicamente. ¿Qué opción sería más adecuada?",
    [
      "Publicar el enlace para que cualquier persona pueda acceder.",
      "Configurar el acceso únicamente para las personas que necesitan trabajar con el documento.",
      "Enviar el documento a una cuenta personal.",
      "Publicarlo temporalmente y eliminarlo después."
    ],
    1,
    "Los documentos institucionales deben compartirse mediante permisos adecuados y únicamente con las personas que necesitan acceder a ellos."
  ],

  [
    "📂 Gestión de información",
    "Una dependencia tiene documentos de diferentes años y procesos almacenados en varias carpetas sin ningún orden. ¿Cuál organización facilitaría más su consulta?",
    [
      "Guardar todos los archivos directamente en el escritorio.",
      "Utilizar nombres como 'NUEVO', 'FINAL' y 'FINAL2'.",
      "Organizar las carpetas de acuerdo con proceso, año y tipo de documento.",
      "Crear una sola carpeta llamada 'Documentos importantes'."
    ],
    2,
    "Una estructura organizada por proceso, año y tipo de documento facilita encontrar, consultar y conservar la información."
  ],

  [
    "📂 Gestión de información",
    "Un funcionario guarda durante varios días un documento importante únicamente en el computador. El equipo presenta una falla y el archivo no puede recuperarse. ¿Qué medida habría ayudado a reducir este riesgo?",
    [
      "Realizar copias de seguridad periódicas en medios autorizados.",
      "Cambiar el nombre del archivo cada día.",
      "Guardar el archivo en diferentes carpetas del mismo computador.",
      "Imprimir el documento después de cada modificación."
    ],
    0,
    "Las copias de seguridad permiten recuperar información ante fallas del equipo, pérdida de archivos o incidentes tecnológicos."
  ],

  [
    "📂 Gestión de información",
    "Debes enviar información que contiene datos personales de ciudadanos a otra dependencia. ¿Cuál debería ser tu primera consideración?",
    [
      "Enviar la información desde cualquier correo para hacerlo más rápido.",
      "Publicarla en un grupo de WhatsApp de funcionarios.",
      "Enviar toda la información sin revisar quién la recibirá.",
      "Verificar que exista autorización, utilizar un canal institucional y limitar el acceso a quienes necesitan los datos."
    ],
    3,
    "La información personal debe manejarse de forma responsable, utilizando canales autorizados y limitando el acceso a las personas que realmente necesitan conocerla."
  ],

  // =====================================================
  // 🤖 INTELIGENCIA ARTIFICIAL
  // =====================================================

  [
    "🤖 Inteligencia artificial",
    "Un funcionario necesita preparar una presentación sobre seguridad digital y quiere utilizar una herramienta de inteligencia artificial para obtener algunas ideas. ¿Cuál sería un uso apropiado?",
    [
      "Compartir una base de datos de ciudadanos para que la IA prepare la presentación.",
      "Entregar las contraseñas institucionales para personalizar las recomendaciones.",
      "Solicitar ideas y una estructura general para la presentación sin incluir información confidencial.",
      "Copiar documentos internos completos en la herramienta."
    ],
    2,
    "La IA puede utilizarse como apoyo para generar ideas y estructurar contenidos, siempre evitando introducir información personal, confidencial o restringida sin autorización."
  ],

  [
    "🤖 Inteligencia artificial",
    "Una herramienta de IA genera una respuesta que parece correcta y el funcionario quiere incluirla en un documento oficial. ¿Qué debería hacer antes?",
    [
      "Revisar y verificar la información utilizando fuentes confiables.",
      "Copiarla directamente porque la herramienta utiliza inteligencia artificial.",
      "Preguntar a la IA si la respuesta es verdadera y utilizarla sin más revisión.",
      "Compartir el resultado con otros funcionarios para que decidan si es correcto."
    ],
    0,
    "Las herramientas de IA pueden generar información incorrecta, incompleta o desactualizada. Por eso sus resultados deben revisarse y verificarse antes de utilizarlos."
  ],

  [
    "🤖 Inteligencia artificial",
    "Necesitas ayuda para redactar un documento que contiene nombres, números de identificación y otros datos personales. ¿Cuál sería la alternativa más segura?",
    [
      "Copiar todo el documento en la herramienta de IA.",
      "Tomar fotografías de los documentos y subirlas.",
      "Compartir el archivo completo para obtener una respuesta más precisa.",
      "Eliminar o anonimizar los datos personales y trabajar con información que no permita identificar a las personas."
    ],
    3,
    "Cuando se utilicen herramientas de IA se debe proteger la información personal y confidencial. Trabajar con datos ficticios o anonimizados reduce este riesgo."
  ],

  [
    "🤖 Inteligencia artificial",
    "Un funcionario necesita pedirle a una IA que redacte una introducción para una capacitación. ¿Cuál de estas instrucciones probablemente producirá un resultado más útil?",
    [
      "Escribe algo sobre tecnología.",
      "Redacta una introducción de 150 palabras sobre seguridad digital dirigida a funcionarios públicos, utilizando un lenguaje claro y profesional.",
      "Hazme una introducción.",
      "Necesito un texto para una capacitación."
    ],
    1,
    "Una instrucción clara proporciona contexto, objetivo, extensión y características del resultado esperado, lo que facilita obtener una respuesta más útil."
  ],

  // =====================================================
  // 💻 HERRAMIENTAS DIGITALES
  // =====================================================

  [
    "💻 Herramientas digitales",
    "Tienes una hoja de cálculo con aproximadamente 200 registros y necesitas localizar rápidamente los correspondientes a una dependencia específica. ¿Qué función sería más útil?",
    [
      "Aplicar un filtro de datos.",
      "Cambiar el fondo de pantalla del computador.",
      "Imprimir todos los registros y revisarlos manualmente.",
      "Reiniciar el computador."
    ],
    0,
    "Los filtros permiten mostrar únicamente los registros que cumplen determinados criterios y facilitan la consulta de grandes cantidades de información."
  ],

  [
    "💻 Herramientas digitales",
    "Tres funcionarios necesitan trabajar al mismo tiempo en un documento y quieren evitar tener varias versiones diferentes del mismo archivo. ¿Cuál sería la opción más conveniente cuando la herramienta institucional lo permite?",
    [
      "Enviar una copia diferente por correo a cada funcionario.",
      "Trabajar sobre un documento compartido con permisos adecuados.",
      "Imprimir el documento y repartir las hojas.",
      "Cada funcionario debe crear su propia versión y unirlas al final."
    ],
    1,
    "El trabajo colaborativo sobre un documento compartido permite trabajar sobre una misma versión y reduce la duplicación de archivos."
  ],

  [
    "💻 Herramientas digitales",
    "Antes de participar en una reunión virtual de trabajo en la que debes presentar información, ¿qué sería recomendable hacer?",
    [
      "Conectarte directamente cuando empiece la reunión.",
      "Compartir públicamente el enlace por si alguien necesita ingresar.",
      "Verificar previamente conexión, audio, cámara y los documentos que vas a utilizar.",
      "Conectarte desde cualquier dispositivo sin revisar sus condiciones de seguridad."
    ],
    2,
    "Una revisión previa de los aspectos técnicos y del material de trabajo reduce inconvenientes durante la reunión y permite participar de manera adecuada."
  ],

  [
    "💻 Herramientas digitales",
    "Una dependencia conserva varios documentos únicamente en papel y necesita consultarlos con mayor facilidad desde los equipos institucionales. ¿Qué opción puede ayudar?",
    [
      "Digitalizarlos mediante un escáner o una aplicación autorizada.",
      "Tomarles fotografías y publicarlas en redes sociales.",
      "Cambiarles el nombre antes de archivarlos.",
      "Imprimirlos nuevamente en un tamaño diferente."
    ],
    0,
    "La digitalización permite convertir documentos físicos en archivos electrónicos que pueden organizarse y consultarse mediante los sistemas autorizados."
  ],

  // =====================================================
  // 🌎 CIUDADANÍA DIGITAL
  // =====================================================

  [
    "🌎 Ciudadanía digital",
    "Un compañero te solicita por WhatsApp una base de datos que contiene información personal de ciudadanos porque dice que la necesita para realizar una tarea. ¿Qué deberías hacer?",
    [
      "Enviarla porque es un compañero de trabajo.",
      "Mandarla desde tu correo personal para evitar problemas con el correo institucional.",
      "Publicarla en un grupo para que todos puedan consultarla.",
      "Verificar que esté autorizado para recibirla y utilizar el canal institucional correspondiente."
    ],
    3,
    "El hecho de que una persona sea compañero de trabajo no significa que tenga autorización para acceder a información personal. Se deben verificar los permisos y utilizar los canales institucionales."
  ],

  [
    "🌎 Ciudadanía digital",
    "Un funcionario utiliza ocasionalmente un computador institucional para consultar redes sociales. ¿Cuál de estas prácticas representa un mayor cuidado frente a la información de la entidad?",
    [
      "Publicar fotografías de documentos internos si no muestran nombres.",
      "Evitar publicar información institucional sensible, capturas de sistemas o documentos internos.",
      "Compartir capturas de pantalla de los sistemas para mostrar el trabajo realizado.",
      "Publicar información interna siempre que la cuenta sea privada."
    ],
    1,
    "La información institucional puede ser sensible incluso cuando no contiene nombres. Se debe evitar publicar documentos, capturas o información que pueda comprometer a la entidad."
  ],

  [
    "🌎 Ciudadanía digital",
    "Estás utilizando un computador compartido y debes alejarte durante unos minutos para atender otra actividad. El equipo tiene una sesión institucional abierta. ¿Qué deberías hacer?",
    [
      "Bloquear la sesión antes de retirarte.",
      "Dejar la sesión abierta porque solo estarás unos minutos.",
      "Escribir la contraseña cerca del computador para facilitar el acceso al regresar.",
      "Pedirle a un compañero que continúe utilizando el equipo."
    ],
    0,
    "Bloquear la sesión protege la información y evita que otra persona pueda utilizar los sistemas mientras el equipo se encuentra desatendido."
  ],

  [
    "🌎 Ciudadanía digital",
    "Haces clic accidentalmente en un enlace sospechoso desde tu equipo institucional. Después de abrirlo no notas ningún cambio en el computador. ¿Cuál sería la acción más adecuada?",
    [
      "No hacer nada porque aparentemente no ocurrió nada.",
      "Eliminar inmediatamente todos los archivos del computador.",
      "Informar oportunamente al responsable o área correspondiente para que pueda evaluar el posible riesgo.",
      "Continuar trabajando y solamente reportarlo si el equipo presenta problemas."
    ],
    2,
    "Aunque no se observe un problema inmediatamente, un enlace sospechoso podría representar un riesgo. Reportarlo oportunamente permite evaluar la situación y tomar medidas preventivas."
  ]

];


/* =====================================================
   ESTADO DE LA PLATAFORMA
   ===================================================== */

let state = {
  user: {},
  index: 0,
  score: 0,
  answers: [],
  categoryScores: {},
  survey: {},
  competenciasVistas: [],

  cronometroInicio: null,
  cronometroIntervalo: null,
  tiempoTotalSegundos: 0
};


/* =====================================================
   ELEMENTOS
   ===================================================== */

const app = document.getElementById("app");
const progressText = document.getElementById("progressText");

const categories = [
  ...new Set(
    questions.map(
      q => q[0]
    )
  )
];


/* =====================================================
   FUNCIONES DEL CRONÓMETRO
   ===================================================== */

function iniciarCronometro() {

  if (state.cronometroIntervalo) {
    clearInterval(state.cronometroIntervalo);
  }

  state.cronometroInicio = Date.now();
  state.tiempoTotalSegundos = 0;

  actualizarCronometro();

  state.cronometroIntervalo = setInterval(
    actualizarCronometro,
    1000
  );

}


function obtenerTiempoTranscurrido() {

  if (!state.cronometroInicio) {
    return 0;
  }

  return Math.floor(
    (Date.now() - state.cronometroInicio) / 1000
  );

}


function formatearTiempo(segundos) {

  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;

  return (
    String(minutos).padStart(2, "0") +
    ":" +
    String(segundosRestantes).padStart(2, "0")
  );

}


function actualizarCronometro() {

  const tiempo = obtenerTiempoTranscurrido();
  const tiempoFormateado = formatearTiempo(tiempo);

  const elemento = document.getElementById("cronometro");
  if (elemento) {
    elemento.textContent = "⏱️ " + tiempoFormateado;
  }

  const topElement = document.getElementById("cronometroTop");
  if (topElement) {
    topElement.textContent = "⏱️ " + tiempoFormateado;
  }

}


function detenerCronometro() {

  if (state.cronometroIntervalo) {
    clearInterval(state.cronometroIntervalo);
    state.cronometroIntervalo = null;
  }

  state.tiempoTotalSegundos = obtenerTiempoTranscurrido();

}


/* =====================================================
   PANTALLA DE BIENVENIDA
   ===================================================== */

function renderWelcome() {

  progressText.textContent = "";

  app.innerHTML = `
    <section class="card hero">

      <span class="badge">
        CAPACITACIÓN · 2026
      </span>

      <h1>
        🎮 Reto Digital Yacuanquer
      </h1>

      <p>
        Demuestra tus competencias digitales a través
        de situaciones prácticas del trabajo cotidiano
        en la Alcaldía.
      </p>

      <div class="grid">

        <div class="feature">
          🔐
          <b>Seguridad</b>
          <span>
            Protege tus cuentas e información.
          </span>
        </div>

        <div class="feature">
          📧
          <b>Comunicación</b>
          <span>
            Comunícate de forma segura.
          </span>
        </div>

        <div class="feature">
          🤖
          <b>IA</b>
          <span>
            Usa la inteligencia artificial
            responsablemente.
          </span>
        </div>

      </div>

      <button
        class="btn"
        onclick="renderRegister()">

        🚀 Comenzar reto

      </button>

    </section>
  `;
}


/* =====================================================
   REGISTRO DEL PARTICIPANTE
   ===================================================== */

function renderRegister() {

  progressText.textContent =
    "Registro del participante";

  app.innerHTML = `
    <section class="card">

      <span class="badge">
        PASO 1
      </span>

      <h2>
        👤 Identificación del participante
      </h2>

      <p>
        Ingresa tus datos para registrar tu participación.
      </p>

      <div class="form-grid">

        <div class="field full">

          <label>
            Nombre completo
          </label>

          <input
            id="name"
            placeholder="">

        </div>

        <div class="field">

          <label>
            Dependencia
          </label>

          <input
            id="dep"
            placeholder="">

        </div>

        <div class="field">

          <label>
            Cargo
          </label>

          <input
            id="role"
            placeholder="">

        </div>

      </div>

      <div class="notice">

        🔒 La información se utilizará para registrar
        la participación y los resultados de la actividad.

      </div>

      <div class="actions">

        <button
          class="btn"
          onclick="startQuiz()">

          Continuar →

        </button>

      </div>

    </section>
  `;
}


/* =====================================================
   INICIAR PROCESO
   ===================================================== */

function startQuiz() {

  const name =
    document
      .getElementById("name")
      .value
      .trim();

  const dep =
    document
      .getElementById("dep")
      .value
      .trim();

  const role =
    document
      .getElementById("role")
      .value
      .trim();

  if (
    !name ||
    !dep ||
    !role
  ) {

    return alert(
      "Por favor completa nombre, dependencia y cargo."
    );

  }

  state.user = {
    name: name,
    dep: dep,
    role: role
  };

  state.index = 0;
  state.score = 0;
  state.answers = [];
  state.categoryScores = {};
  state.survey = {};
  state.competenciasVistas = [];

  state.cronometroInicio = null;
  state.cronometroIntervalo = null;
  state.tiempoTotalSegundos = 0;

  categories.forEach(
    c => {

      state.categoryScores[c] = {
        correct: 0,
        total: 0
      };

    }
  );

  renderIntroduction();

}


/* =====================================================
   INTRODUCCIÓN INTERACTIVA
   ===================================================== */

function renderIntroduction() {

  progressText.textContent =
    "Preparación del reto";

  app.innerHTML = `
    <section class="card">

      <span class="badge">
        PASO 2 · PREPARACIÓN
      </span>

      <div
        class="hero"
        style="padding:10px 0 15px">

        <div class="big">
          💻
        </div>

        <h2>
          Desarrollo de Competencias Digitales
        </h2>

        <p>
          <b>Alcaldía Municipal de Yacuanquer</b>
        </p>

      </div>

      <h3>
        👋 ¡Bienvenido al Reto Digital!
      </h3>

      <p>
        Antes de comenzar las preguntas, te invitamos
        a realizar un breve recorrido por las principales
        competencias digitales que hacen parte del reto.
      </p>

      <div class="notice">

        💡 <b>¿Cómo prepararte?</b>

        <br><br>

        Haz clic en cada una de las competencias para
        conocer algunos conceptos, recomendaciones y
        buenas prácticas que te ayudarán durante el reto.

      </div>

      <h3>
        📚 Conoce las competencias
      </h3>

      <div class="grid">

        <div
          class="feature"
          onclick="mostrarCompetencia('seguridad')"
          style="cursor:pointer">

          <div style="font-size:30px">
            🔐
          </div>

          <b>
            Seguridad digital
          </b>

          <span>
            Protección de cuentas,
            información y equipos.
          </span>

          <small>
            👆 Haz clic para aprender más
          </small>

        </div>

        <div
          class="feature"
          onclick="mostrarCompetencia('comunicacion')"
          style="cursor:pointer">

          <div style="font-size:30px">
            📧
          </div>

          <b>
            Comunicación digital
          </b>

          <span>
            Uso adecuado y seguro
            de los medios digitales.
          </span>

          <small>
            👆 Haz clic para aprender más
          </small>

        </div>

        <div
          class="feature"
          onclick="mostrarCompetencia('informacion')"
          style="cursor:pointer">

          <div style="font-size:30px">
            📂
          </div>

          <b>
            Gestión de información
          </b>

          <span>
            Organización, almacenamiento
            y protección de información.
          </span>

          <small>
            👆 Haz clic para aprender más
          </small>

        </div>

        <div
          class="feature"
          onclick="mostrarCompetencia('ia')"
          style="cursor:pointer">

          <div style="font-size:30px">
            🤖
          </div>

          <b>
            Inteligencia artificial
          </b>

          <span>
            Uso responsable y práctico
            de herramientas de IA.
          </span>

          <small>
            👆 Haz clic para aprender más
          </small>

        </div>

        <div
          class="feature"
          onclick="mostrarCompetencia('herramientas')"
          style="cursor:pointer">

          <div style="font-size:30px">
            💻
          </div>

          <b>
            Herramientas digitales
          </b>

          <span>
            Tecnología para facilitar
            las actividades laborales.
          </span>

          <small>
            👆 Haz clic para aprender más
          </small>

        </div>

        <div
          class="feature"
          onclick="mostrarCompetencia('ciudadania')"
          style="cursor:pointer">

          <div style="font-size:30px">
            🌎
          </div>

          <b>
            Ciudadanía digital
          </b>

          <span>
            Comportamiento responsable
            y seguro en entornos digitales.
          </span>

          <small>
            👆 Haz clic para aprender más
          </small>

        </div>

      </div>

      <div
        id="competenciaInfo"
        style="
          margin-top:25px;
          display:none;
        ">
      </div>

      <div
        id="progresoCompetencias"
        class="notice"
        style="margin-top:25px">

        📚 Has revisado
        <b>0 de 6</b>
        competencias.

        <br><br>

        👆 Haz clic en las seis tarjetas para
        conocer la información antes de comenzar.

      </div>

      <div class="notice">

        🎯 <b>Recuerda:</b>

        <br><br>

        El objetivo del reto no es solamente obtener
        un buen puntaje. Queremos identificar nuestros
        conocimientos actuales y reconocer oportunidades
        para seguir fortaleciendo nuestras competencias
        digitales.

      </div>

      <div class="actions">

        <button
          id="btnComenzarReto"
          class="btn"
          onclick="beginQuestions()"
          disabled
          style="
            opacity:0.5;
            cursor:not-allowed;
          ">

          🔒 REVISA LAS 6 COMPETENCIAS

        </button>

      </div>

    </section>
  `;

}


/* =====================================================
   INFORMACIÓN DE LAS COMPETENCIAS
   ===================================================== */

function mostrarCompetencia(tipo) {

  const info =
    document.getElementById(
      "competenciaInfo"
    );

  const contenidos = {

    seguridad: {

      icono: "🔐",

      titulo: "Seguridad digital",

      texto: `

        <p>
          La seguridad digital busca proteger las cuentas,
          equipos, sistemas e información institucional
          frente a accesos no autorizados, pérdida de
          información y posibles ataques.
        </p>

        <h4>🔑 Contraseñas</h4>

        <p>
          Utiliza contraseñas largas, difíciles de adivinar
          y evita utilizar la misma contraseña para diferentes
          servicios.
        </p>

        <h4>🛡️ Autenticación</h4>

        <p>
          La autenticación de dos factores agrega una segunda
          capa de protección además de la contraseña.
        </p>

        <h4>📧 Phishing</h4>

        <p>
          Desconfía de correos que generen urgencia,
          soliciten contraseñas, datos personales o pidan
          abrir enlaces sospechosos.
        </p>

        <h4>🔒 Protección del equipo</h4>

        <p>
          Cuando te alejes del computador institucional,
          bloquea la sesión para evitar accesos no autorizados.
        </p>

      `

    },

    comunicacion: {

      icono: "📧",

      titulo: "Comunicación digital",

      texto: `

        <p>
          La comunicación digital permite intercambiar
          información de manera rápida, pero también
          requiere responsabilidad y cuidado.
        </p>

        <h4>✉️ Correos institucionales</h4>

        <p>
          Antes de enviar un correo revisa cuidadosamente
          los destinatarios, el asunto y los archivos adjuntos.
        </p>

        <h4>📎 Archivos</h4>

        <p>
          Evita abrir archivos ejecutables o documentos
          provenientes de remitentes desconocidos o sospechosos.
        </p>

        <h4>📝 Asunto y contenido</h4>

        <p>
          Utiliza asuntos claros y explica brevemente
          el propósito del mensaje.
        </p>

        <h4>👥 Responder correctamente</h4>

        <p>
          Utiliza “Responder a todos” solamente cuando
          todas las personas realmente necesiten recibir
          tu respuesta.
        </p>

      `

    },

    informacion: {

      icono: "📂",

      titulo: "Gestión de información",

      texto: `

        <p>
          Gestionar correctamente la información permite
          encontrarla, compartirla y protegerla de manera
          adecuada.
        </p>

        <h4>📁 Organización</h4>

        <p>
          Mantén los documentos organizados en carpetas
          utilizando estructuras claras, por ejemplo,
          proceso, año y tipo de documento.
        </p>

        <h4>☁️ Compartir información</h4>

        <p>
          Cuando compartas un documento utiliza permisos
          adecuados y permite el acceso solamente a quienes
          realmente necesitan trabajar con él.
        </p>

        <h4>💾 Copias de seguridad</h4>

        <p>
          Las copias de seguridad periódicas ayudan a recuperar
          información ante fallas, pérdida de archivos o
          incidentes tecnológicos.
        </p>

        <h4>🔒 Datos personales</h4>

        <p>
          La información personal debe manejarse con cuidado,
          utilizando canales autorizados y limitando el acceso
          a las personas que lo necesitan.
        </p>

      `

    },

    ia: {

      icono: "🤖",

      titulo: "Inteligencia artificial",

      texto: `

        <p>
          Las herramientas de inteligencia artificial pueden
          apoyar diferentes actividades laborales como generar
          ideas, organizar información, redactar textos o
          facilitar algunas tareas.
        </p>

        <h4>💡 Utilízala como apoyo</h4>

        <p>
          La IA puede ayudarte a generar ideas o mejorar
          contenidos, pero la decisión final y revisión
          siempre debe estar a cargo de la persona.
        </p>

        <h4>🔎 Verifica la información</h4>

        <p>
          Una herramienta de IA puede generar información
          incorrecta o incompleta. Es importante revisar
          y verificar sus respuestas antes de utilizarlas.
        </p>

        <h4>🔐 Protege la información</h4>

        <p>
          No introduzcas contraseñas, datos personales o
          información institucional confidencial en herramientas
          de IA sin autorización.
        </p>

        <h4>✍️ Da instrucciones claras</h4>

        <p>
          Una instrucción clara, específica y con contexto
          permite obtener respuestas más útiles.
        </p>

      `

    },

    herramientas: {

      icono: "💻",

      titulo: "Herramientas digitales",

      texto: `

        <p>
          Las herramientas digitales permiten realizar
          actividades laborales de manera más organizada,
          rápida y eficiente.
        </p>

        <h4>🔎 Buscar información</h4>

        <p>
          En hojas de cálculo y otras herramientas puedes
          utilizar filtros para encontrar rápidamente
          información específica.
        </p>

        <h4>👥 Trabajo colaborativo</h4>

        <p>
          Cuando una herramienta lo permita, varias personas
          pueden trabajar sobre un mismo documento compartido,
          utilizando los permisos adecuados.
        </p>

        <h4>🎥 Reuniones virtuales</h4>

        <p>
          Antes de una reunión virtual verifica conexión,
          micrófono, cámara y los documentos que vas a necesitar.
        </p>

        <h4>📄 Digitalización</h4>

        <p>
          Los escáneres y aplicaciones autorizadas permiten
          convertir documentos físicos en archivos digitales.
        </p>

      `

    },

    ciudadania: {

      icono: "🌎",

      titulo: "Ciudadanía digital",

      texto: `

        <p>
          La ciudadanía digital consiste en utilizar la
          tecnología de manera responsable, segura y
          respetuosa, especialmente cuando manejamos
          información institucional.
        </p>

        <h4>🔒 Información personal</h4>

        <p>
          No compartas bases de datos o información personal
          sin verificar que exista autorización para hacerlo.
        </p>

        <h4>📱 Redes sociales</h4>

        <p>
          Evita publicar información institucional sensible,
          capturas de sistemas internos o documentos que
          puedan comprometer a la entidad.
        </p>

        <h4>🖥️ Equipos compartidos</h4>

        <p>
          Si utilizas un computador compartido, bloquea
          la sesión cuando te retires para proteger la
          información.
        </p>

        <h4>⚠️ Reportar incidentes</h4>

        <p>
          Si haces clic accidentalmente en un enlace sospechoso
          o detectas una situación de riesgo, informa
          oportunamente al responsable correspondiente.
        </p>

      `

    }

  };

  const c =
    contenidos[tipo];

  if (
    !state.competenciasVistas.includes(tipo)
  ) {

    state.competenciasVistas.push(tipo);

  }

  info.style.display =
    "block";

  info.innerHTML = `

    <div
      class="notice"
      style="
        padding:25px;
        border-left:5px solid #2563eb;
      ">

      <div
        style="
          font-size:42px;
          margin-bottom:10px;
        ">

        ${c.icono}

      </div>

      <h2>
        ${c.titulo}
      </h2>

      <div
        style="
          font-size:16px;
          line-height:1.7;
        ">

        ${c.texto}

      </div>

      <div
        style="
          margin-top:20px;
          padding:12px;
          background:#eef6ff;
          border-radius:10px;
        ">

        💡 <b>Consejo:</b>

        Lee estos conceptos antes de continuar.
        Algunas situaciones del reto están relacionadas
        con estas buenas prácticas.

      </div>

    </div>

  `;

  actualizarProgresoCompetencias();

  info.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

}


/* =====================================================
   ACTUALIZAR PROGRESO DE COMPETENCIAS
   ===================================================== */

function actualizarProgresoCompetencias() {

  const contador =
    state.competenciasVistas.length;

  const progreso =
    document.getElementById(
      "progresoCompetencias"
    );

  const boton =
    document.getElementById(
      "btnComenzarReto"
    );

  if (!progreso || !boton) {
    return;
  }

  if (
    contador < 6
  ) {

    progreso.innerHTML = `

      📚 Has revisado
      <b>${contador} de 6</b>
      competencias.

      <br><br>

      👆 Revisa las competencias que faltan
      antes de comenzar el reto.

    `;

    boton.disabled = true;
    boton.style.opacity = "0.5";
    boton.style.cursor = "not-allowed";
    boton.innerHTML = "🔒 REVISA LAS 6 COMPETENCIAS";

  } else {

    progreso.innerHTML = `

      🎉 <b>¡Excelente!</b>

      Ya revisaste las
      <b>6 competencias digitales.</b>

      <br><br>

      ✅ Ya estás preparado para comenzar.

    `;

    boton.disabled = false;
    boton.style.opacity = "1";
    boton.style.cursor = "pointer";
    boton.innerHTML = "🚀 COMENZAR EL RETO";

  }

}


/* =====================================================
   COMENZAR LAS PREGUNTAS
   ===================================================== */

function beginQuestions() {

  if (
    state.competenciasVistas.length < 6
  ) {

    return alert(
      "Antes de comenzar debes revisar las 6 competencias digitales."
    );

  }

  state.index = 0;

  iniciarCronometro();

  renderQuestion();

}


/* =====================================================
   MOSTRAR PREGUNTA
   ===================================================== */

function renderQuestion() {

  const q =
    questions[
      state.index
    ];

  const pct =
    Math.round(
      (
        state.index /
        questions.length
      ) * 100
    );

  const respuestaAnterior =
    state.answers[state.index] !== undefined;

  progressText.textContent =
    `Pregunta ${state.index + 1} de ${questions.length} · ${pct}%`;

  const opcionesHTML =
    q[2]
      .map(
        (o, i) => {

          let clases = "option";

          if (respuestaAnterior) {
            if (i === q[3]) {
              clases += " correct";
            }
            if (i === state.answers[state.index] && i !== q[3]) {
              clases += " wrong";
            }
          }

          const seleccionada =
            respuestaAnterior &&
            i === state.answers[state.index];

          return `

            <button
              class="${clases}"
              onclick="answer(${i})"
              id="opt${i}"
              ${respuestaAnterior ? 'disabled' : ''}
              style="${seleccionada ? 'border-color:#2563eb;background:#eef6ff;' : ''}">

              ${String.fromCharCode(65 + i)}.
              ${o}

              ${seleccionada ? ' ✅' : ''}

            </button>

          `;

        }
      )
      .join("");

  app.innerHTML = `

    <section class="card">

      <div
        style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:15px;
          flex-wrap:wrap;
          margin-bottom:15px;
        ">

        <div class="question-top">

          <span class="mission">
            ${q[0]}
          </span>

          <span>
            💯 100 puntos
          </span>

        </div>

        <div
          id="cronometro"
          style="
            font-size:18px;
            font-weight:700;
            padding:10px 16px;
            border-radius:10px;
            background:#eef6ff;
            color:#1d4ed8;
            white-space:nowrap;
          ">

          ⏱️ 00:00

        </div>

      </div>

      <div class="bar">

        <div
          class="fill"
          style="width:${pct}%">
        </div>

      </div>

      <div class="qtext">

        ${state.index + 1}.
        ${q[1]}

      </div>

      <div class="options">

        ${opcionesHTML}

      </div>

      <div id="feedback">
        ${
          respuestaAnterior
            ? `

              <div class="feedback">

                ${
                  state.answers[state.index] === q[3]
                    ? "✅ <b>¡Correcto! +100 puntos</b>"
                    : "❌ <b>Respuesta incorrecta</b>"
                }

                <br>

                ${q[4]}

              </div>

            `
            : ""
        }
      </div>

      <div class="actions" style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;">

        <div style="display:flex;gap:10px;flex-wrap:wrap;">

          <button
            class="btn secondary"
            onclick="volverACompetencias()"
            style="background:#eef3fa;color:#26364f;">

            📚 Competencias

          </button>

          ${
            state.index > 0
              ? `
                <button
                  class="btn secondary"
                  onclick="preguntaAnterior()"
                  style="background:#eef3fa;color:#26364f;">

                  ⬅️ Anterior

                </button>
              `
              : ""
          }

        </div>

        <div>

          ${
            respuestaAnterior
              ? `

                <button
                  id="nextBtn"
                  class="btn"
                  onclick="nextQuestion()">

                  ${
                    state.index ===
                    questions.length - 1
                      ? "Ver resultado 🏆"
                      : "Siguiente →"
                  }

                </button>

              `
              : `
                <button
                  id="nextBtn"
                  class="btn"
                  disabled
                  style="opacity:0.5;cursor:not-allowed;">

                  ${
                    state.index ===
                    questions.length - 1
                      ? "Ver resultado 🏆"
                      : "Siguiente →"
                  }

                </button>
              `
          }

        </div>

      </div>

    </section>

  `;

  actualizarCronometro();

}


/* =====================================================
   VOLVER A COMPETENCIAS
   ===================================================== */

function volverACompetencias() {

  if (
    state.answers[state.index] === undefined
  ) {

    const confirmar =
      confirm(
        "⚠️ Aún no has respondido esta pregunta.\n\n" +
        "Si sales, perderás el progreso de esta pregunta.\n\n" +
        "¿Quieres continuar?"
      );

    if (!confirmar) {
      return;
    }

    state.answers[state.index] = undefined;

  }

  if (state.cronometroIntervalo) {
    clearInterval(state.cronometroIntervalo);
    state.cronometroIntervalo = null;
  }

  state.tiempoTotalSegundos = obtenerTiempoTranscurrido();

  renderIntroduction();

}


/* =====================================================
   PREGUNTA ANTERIOR - SOLO PARA REVISAR
   ===================================================== */

function preguntaAnterior() {

  if (state.index > 0) {

    const confirmar =
      confirm(
        "🔙 ¿Volver a la pregunta anterior?\n\n" +
        "Podrás revisarla, pero NO podrás cambiar tu respuesta.\n\n" +
        "¿Continuar?"
      );

    if (!confirmar) {
      return;
    }

    state.index--;

    renderQuestion();

  }

}


/* =====================================================
   RESPONDER
   ===================================================== */

function answer(i) {

  if (
    state.answers[
      state.index
    ] !== undefined
  ) {

    return;

  }

  const q =
    questions[
      state.index
    ];

  const correct =
    i === q[3];

  state.answers[
    state.index
  ] = i;

  state.categoryScores[
    q[0]
  ].total++;

  if (correct) {

    state.score += 100;

    state.categoryScores[
      q[0]
    ].correct++;

  }

  renderQuestion();

}


/* =====================================================
   SIGUIENTE PREGUNTA
   ===================================================== */

function nextQuestion() {

  if (state.answers[state.index] === undefined) {
    return alert("Por favor responde la pregunta antes de continuar.");
  }

  state.index++;

  if (
    state.index <
    questions.length
  ) {

    renderQuestion();

  } else {

    detenerCronometro();

    renderResult();

  }

}


/* =====================================================
   DETERMINAR NIVEL
   ===================================================== */

function level(score) {

  if (
    score >= 2040
  ) {

    return [
      "🏆",
      "Nivel Experto"
    ];

  }

  if (
    score >= 1680
  ) {

    return [
      "🥈",
      "Nivel Avanzado"
    ];

  }

  if (
    score >= 1200
  ) {

    return [
      "🥉",
      "Nivel Básico"
    ];

  }

  return [
    "🌱",
    "Nivel inicial"
  ];

}


/* =====================================================
   RESULTADO
   ===================================================== */

function renderResult() {

  progressText.textContent =
    "¡Reto completado!";

  const [
    icon,
    lvl
  ] =
    level(
      state.score
    );

  const bars =
    categories
      .map(
        c => {

          const s =
            state.categoryScores[c];

          const p =
            s.total
              ? Math.round(
                s.correct /
                s.total *
                100
              )
              : 0;

          const wrong =
            s.total -
            s.correct;

          return `

            <div
              class="bar-row"
              style="
                margin-bottom:22px;
                padding:14px;
                background:#f8fafc;
                border-radius:12px;
              ">

              <div
                style="
                  display:flex;
                  justify-content:space-between;
                  align-items:center;
                  gap:12px;
                  margin-bottom:8px;
                ">

                <b>
                  ${c}
                </b>

                <span style="font-weight:700;">
                  ${p}%
                </span>

              </div>

              <div class="bar">

                <div
                  class="fill"
                  style="width:${p}%">
                </div>

              </div>

              <div
                style="
                  display:flex;
                  gap:18px;
                  flex-wrap:wrap;
                  margin-top:10px;
                  font-size:14px;
                ">

                <span>
                  ✅ <b>${s.correct}</b>
                  ${
                    s.correct === 1
                      ? "respuesta buena"
                      : "respuestas buenas"
                  }
                </span>

                <span>
                  ❌ <b>${wrong}</b>
                  ${
                    wrong === 1
                      ? "respuesta mala"
                      : "respuestas malas"
                  }
                </span>

              </div>

            </div>

          `;

        }
      )
      .join("");

  // ✅ CORREGIDO: Cálculo correcto del porcentaje
  const resultPct = Math.round((state.score / 2400) * 100);

  app.innerHTML = `

    <section class="card">

      <div
        class="hero"
        style="padding:20px">

        <div class="big">
          ${icon}
        </div>

        <h2>
          ¡Reto completado!
        </h2>

        <div class="score">
          ${state.score} / 2400
        </div>

        <div class="level">
          ${lvl}
        </div>

      </div>

      <div class="stats">

        <div class="stat">

          <b>
            ${resultPct}%
          </b>

          Resultado

        </div>

        <div class="stat">

          <b>
            24/24
          </b>

          Preguntas

        </div>

        <div class="stat">

          <b>
            100%
          </b>

          Completado

        </div>

        <div class="stat">

          <b id="tiempoResultado">
            ${formatearTiempo(
              state.tiempoTotalSegundos
            )}
          </b>

          Tiempo

        </div>

      </div>

      <h3>
        📊 Tu perfil por competencia
      </h3>

      <div class="bars">

        ${bars}

      </div>

      <div class="actions" style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;">

        <button
          class="btn secondary"
          onclick="volverACompetencias()"
          style="background:#eef3fa;color:#26364f;">

          📚 Revisar competencias

        </button>

        <button
          class="btn"
          onclick="renderSurvey()">

          📝 Completar encuesta

        </button>

      </div>

    </section>

  `;

}


/* =====================================================
   ENCUESTA
   ===================================================== */

function renderSurvey() {

  progressText.textContent =
    "Encuesta final";

  app.innerHTML = `

    <section class="card">

      <span class="badge">
        ÚLTIMO PASO
      </span>

      <h2>
        📝 Encuesta de satisfacción
      </h2>

      <p>
        Tu opinión nos ayudará a mejorar
        futuras capacitaciones.
      </p>

      <div class="survey">

        <div class="survey-group">

          <label>
            1. ¿Cómo calificas la capacitación?
          </label>

          <div class="survey-options">

            ${
              ["1", "2", "3", "4", "5"]
                .map(
                  x => `

                    <label>

                      <input
                        type="radio"
                        name="s1"
                        value="${x}">

                      ${"⭐".repeat(+x)}

                    </label>

                  `
                )
                .join("")
            }

          </div>

        </div>

        <div class="survey-group">

          <label>
            2. ¿Los temas tratados son aplicables
            a tus actividades laborales?
          </label>

          <div class="survey-options">

            ${
              ["Sí", "Parcialmente", "No"]
                .map(
                  x => `

                    <label>

                      <input
                        type="radio"
                        name="s2"
                        value="${x}">

                      ${x}

                    </label>

                  `
                )
                .join("")
            }

          </div>

        </div>

        <div class="survey-group">

          <label>
            3. ¿La metodología interactiva
            facilitó tu aprendizaje?
          </label>

          <div class="survey-options">

            ${
              ["Sí", "Parcialmente", "No"]
                .map(
                  x => `

                    <label>

                      <input
                        type="radio"
                        name="s3"
                        value="${x}">

                      ${x}

                    </label>

                  `
                )
                .join("")
            }

          </div>

        </div>

        <div class="survey-group">

          <label>
            4. ¿Qué tema te gustaría profundizar?
          </label>

          <select id="s4">

            <option value="">
              Selecciona
            </option>

            ${
              categories
                .map(
                  c => `
                    <option>
                      ${c}
                    </option>
                  `
                )
                .join("")
            }

          </select>

        </div>

        <div class="survey-group">

          <label>
            5. ¿Qué sugerencia tienes
            para próximas capacitaciones?
          </label>

          <textarea
            id="s5"
            rows="4"
            placeholder="Escribe tu sugerencia...">
          </textarea>

        </div>

      </div>

      <div class="actions">

        <button
          class="btn"
          onclick="finish()">

          📤 Enviar encuesta

        </button>

      </div>

    </section>

  `;

}


/* =====================================================
   ENVIAR RESULTADO A GOOGLE SHEETS (CORREGIDO)
   ===================================================== */

async function finish() {

  // ✅ DETENER EL CRONÓMETRO PRIMERO
  detenerCronometro();

  const get =
    n =>
      document
        .querySelector(
          `input[name="${n}"]:checked`
        )
        ?.value || "";

  state.survey = {

    s1:
      get("s1"),

    s2:
      get("s2"),

    s3:
      get("s3"),

    s4:
      document
        .getElementById("s4")
        .value,

    s5:
      document
        .getElementById("s5")
        .value

  };

  if (
    !state.survey.s1 ||
    !state.survey.s2 ||
    !state.survey.s3 ||
    !state.survey.s4
  ) {

    return alert(
      "Completa las preguntas obligatorias de la encuesta."
    );

  }

  // CAPTURAR EL TIEMPO FINAL
  state.tiempoTotalSegundos = obtenerTiempoTranscurrido();

  // ✅ CORREGIDO: Cálculo correcto del porcentaje
  const porcentajeCorrecto = Math.round((state.score / 2400) * 100);

  // ✅ CORREGIDO: Estructura completa para doPost
  const record = {

    fecha: new Intl.DateTimeFormat("es-CO", {
      timeZone: "America/Bogota",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).format(new Date()),

    nombre:
      state.user.name,

    dependencia:
      state.user.dep,

    cargo:
      state.user.role,

    puntaje:
      state.score,

    porcentaje:
      porcentajeCorrecto,

    nivel:
      level(
        state.score
      )[1],

    respuestas:
      JSON.stringify(state.answers),

    resultadosCompetencias:
      JSON.stringify(state.categoryScores),

    encuesta: {
      s1: state.survey.s1,
      s2: state.survey.s2,
      s3: state.survey.s3,
      s4: state.survey.s4,
      s5: state.survey.s5
    },

    tiempo:
      formatearTiempo(
        state.tiempoTotalSegundos
      ),

    tiempoSegundos:
      state.tiempoTotalSegundos

  };

  localStorage.setItem(
    "ultimoRetoDigital",
    JSON.stringify(record)
  );

  app.innerHTML = `

    <section class="card thanks">

      <div class="big">
        ⏳
      </div>

      <h2>
        Guardando tu participación...
      </h2>

      <p>
        Estamos enviando tu resultado.
      </p>

    </section>

  `;

  if (
    GOOGLE_SHEETS_URL &&
    !GOOGLE_SHEETS_URL.includes(
      "PEGA_AQUI"
    )
  ) {

    try {

      // ✅ CORREGIDO: usar text/plain para evitar el preflight CORS
      // que Google Apps Script no responde (por eso no llegaba nada a la hoja)
      const response = await fetch(
        GOOGLE_SHEETS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body:
            JSON.stringify(record)
        }
      );

      // ✅ Verificar la respuesta
      const result = await response.json();
      console.log("Respuesta de Google Sheets:", result);

      if (!result.ok) {
        console.warn("Error al guardar:", result.error);
      }

    } catch (e) {

      console.error(
        "No se pudo enviar a Google Sheets:",
        e
      );

    }

  }

  mostrarFinal();

}


/* =====================================================
   PANTALLA FINAL CON POSICIÓN (CORREGIDO)
   ===================================================== */

async function mostrarFinal() {

  progressText.textContent =
    "Participación registrada";

  let totalBuenas = 0;
  let totalMalas = 0;

  categories.forEach(c => {
    const s = state.categoryScores[c];
    totalBuenas += s.correct || 0;
    totalMalas += (s.total || 0) - (s.correct || 0);
  });

  let puesto = "—";
  let totalParticipantes = 0;
  let mensajePuesto = "⏳ Calculando posición...";
  let emojiPuesto = "📍";

  try {
    // ✅ CORREGIDO: Construir URL correctamente
    const urlPosicion = GOOGLE_SHEETS_URL +
      "?action=posicion&nombre=" + encodeURIComponent(state.user.name) +
      "&dependencia=" + encodeURIComponent(state.user.dep);

    const response = await fetch(urlPosicion);

    if (!response.ok) throw new Error("Error en la respuesta del servidor");

    const data = await response.json();

    if (data.ok) {
      puesto = data.puesto > 0 ? data.puesto : "—";
      totalParticipantes = data.totalParticipantes || 0;
    }
  } catch (error) {
    console.warn("No se pudo obtener la posición:", error);
    // ✅ Si falla, no mostrar error al usuario
  }

  // ✅ CORREGIDO: Mensajes según posición
  if (totalParticipantes > 0 && puesto !== "—") {
    mensajePuesto = "📍 Tu puesto es #" + puesto + " de " + totalParticipantes + " participantes";
    emojiPuesto = "📍";
  } else if (totalParticipantes > 0) {
    mensajePuesto = "📊 Participante registrado";
    emojiPuesto = "📊";
  } else {
    mensajePuesto = "🌟 Eres el primer participante registrado";
    emojiPuesto = "🌟";
  }

  app.innerHTML = `

    <section class="card thanks">

      <div class="big">
        🎉
      </div>

      <h2>
        ¡Gracias por participar! <br>
        <span style="font-size:18px;color:#667085;">
          Área Ingeniería de Sistemas - Alcaldía Yacuanquer (N)
        </span>
      </h2>

      <p>
        Tu participación ha sido registrada correctamente.
      </p>

      <div class="stats">

        <div class="stat">

          <b>
            ${state.score}
          </b>

          Puntos

        </div>

        <div class="stat">

          <b>
            ✅ ${totalBuenas} | ❌ ${totalMalas}
          </b>

          Buenas / Malas

        </div>

        <div class="stat">

          <b>
            ${level(state.score)[1]}
          </b>

          Nivel

        </div>

        <div class="stat">

          <b>
            ${formatearTiempo(state.tiempoTotalSegundos)}
          </b>

          Tiempo

        </div>

      </div>

      <div style="
        background: #f0f7ff;
        border-radius: 16px;
        padding: 20px;
        margin: 20px 0;
        border: 2px solid #d4e4ff;
        text-align: center;
      ">

        <div style="font-size: 48px; margin-bottom: 5px;">
          ${emojiPuesto}
        </div>

        <p style="font-size: 20px; font-weight: 700; color: #1d4ed8; margin: 0;">
          ${mensajePuesto}
        </p>

      </div>

      <div class="notice">

        ✅ Tu resultado y encuesta
        fueron enviados correctamente.

      </div>

      <div class="actions" style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">

        <button
          class="btn"
          onclick="terminarReto()">

          🏁 TERMINAR RETO

        </button>

        <button
          class="btn secondary"
          onclick="volverACompetencias()"
          style="background:#eef3fa;color:#26364f;">

          📚 Revisar competencias

        </button>

      </div>

    </section>

  `;

}


/* =====================================================
   TERMINAR RETO
   ===================================================== */

function terminarReto() {

  detenerCronometro();

  progressText.textContent =
    "Reto finalizado";

  app.innerHTML = `

    <section class="card thanks">

      <div class="big">
        🏁
      </div>

      <h2>
        ¡Reto finalizado!
      </h2>

      <p>
        Gracias por participar en la capacitación
        de Desarrollo de Competencias Digitales
        de la Alcaldía de Yacuanquer.
      </p>

      <div class="notice">

        ✅ Tu participación ya fue registrada.

      </div>

      <p class="muted">

        Ya puedes cerrar esta pestaña.

      </p>

    </section>

  `;

}


/* =====================================================
   INICIAR PLATAFORMA
   ===================================================== */

renderWelcome();