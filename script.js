const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbyswqq64yFBf_fDqzoAtK_atng9w4AM0UtWS2sCvyNFV074zmyp2DW6eYcObBLbkLB8/exec";


/* =====================================================
   PREGUNTAS DEL RETO
   ===================================================== */

const questions = [
  ["🔐 Seguridad digital", "¿Cuál de estas contraseñas ofrece mejores condiciones de seguridad?", ["Yacuanquer2026", "123456789", "Alcaldia123", "M#r7!pQ2@xL9"], 3, "Una contraseña segura debe ser difícil de adivinar y combinar diferentes tipos de caracteres."],

  ["🔐 Seguridad digital", "Recibes un correo que dice: “URGENTE: Su cuenta institucional será suspendida hoy. Haga clic aquí para confirmar sus datos”. ¿Qué deberías hacer?", ["Hacer clic rápidamente.", "Introducir la contraseña y luego cambiarla.", "Verificar el remitente, no abrir el enlace y reportar el mensaje.", "Reenviarlo a compañeros para preguntarles."], 2, "Los mensajes que generan urgencia y solicitan credenciales mediante enlaces pueden ser intentos de phishing."],

  ["🔐 Seguridad digital", "¿Qué beneficio proporciona principalmente la autenticación de dos factores?", ["Hace que el computador funcione más rápido.", "Añade una segunda capa de seguridad para acceder a una cuenta.", "Elimina la necesidad de tener contraseña.", "Permite compartir la contraseña."], 1, "La autenticación de dos factores añade una segunda verificación además de la contraseña."],

  ["🔐 Seguridad digital", "Terminas tu jornada y tu computador institucional queda encendido con tu correo abierto. ¿Qué deberías hacer?", ["Dejarlo así.", "Bloquear o cerrar la sesión antes de retirarte.", "Compartir la contraseña.", "Dejar una nota indicando que el correo está abierto."], 1, "Bloquear o cerrar la sesión evita accesos no autorizados a información y sistemas."],


  ["📧 Comunicación digital", "Vas a enviar un documento institucional a varias personas. ¿Qué deberías hacer antes de enviar el mensaje?", ["Enviarlo inmediatamente.", "Revisar destinatarios, asunto y archivos adjuntos.", "Enviarlo primero y corregir después.", "Utilizar siempre “Responder a todos”."], 1, "Una revisión previa ayuda a evitar filtraciones, destinatarios incorrectos y adjuntos equivocados."],

  ["📧 Comunicación digital", "Recibes de un remitente desconocido un archivo llamado “Documento_Importante.exe”. ¿Qué haces?", ["Lo abres.", "Lo descargas y lo envías a un compañero.", "No lo abres y reportas el correo como sospechoso.", "Lo guardas en Drive."], 2, "Los archivos ejecutables de fuentes desconocidas pueden contener software malicioso."],

  ["📧 Comunicación digital", "¿Cuál es una buena práctica al enviar un correo institucional?", ["Poner solo “URGENTE”.", "No colocar asunto.", "Usar un asunto claro y explicar brevemente el propósito.", "Escribir todo en mayúsculas."], 2, "Un asunto claro facilita identificar, organizar y buscar la información."],

  ["📧 Comunicación digital", "Recibes un correo dirigido a varias personas, pero tu respuesta solo interesa al remitente. ¿Qué opción es más adecuada?", ["Responder a todos.", "Responder únicamente al remitente.", "Reenviarlo a toda la entidad.", "Crear un correo sin contexto."], 1, "Usar correctamente “Responder” o “Responder a todos” evita compartir información innecesariamente."],


  ["📂 Gestión de información", "Necesitas compartir un documento institucional con un compañero para que pueda editarlo. ¿Cuál es una buena práctica?", ["Usar un enlace público.", "Configurar el acceso solo para quienes necesitan trabajar con él.", "Publicarlo en redes sociales.", "Usar una cuenta personal sin autorización."], 1, "Los documentos institucionales deben compartirse con permisos adecuados."],

  ["📂 Gestión de información", "¿Cuál estructura facilita más la organización de documentos?", ["documento1, documento2, documento3", "VARIOS, NUEVO, FINAL", "Carpetas organizadas por proceso, año y tipo de documento.", "Guardar todo en el escritorio."], 2, "Una estructura organizada facilita encontrar, compartir y conservar información."],

  ["📂 Gestión de información", "Un documento importante se pierde por una falla del computador. ¿Qué práctica habría reducido este riesgo?", ["Guardar únicamente en el escritorio.", "Crear copias de seguridad periódicas en medios autorizados.", "Cambiar el nombre del archivo.", "Imprimirlo y eliminar el archivo digital."], 1, "Las copias de seguridad permiten recuperar información ante fallas o incidentes."],

  ["📂 Gestión de información", "Debes enviar información con datos personales de ciudadanos. ¿Cuál es la mejor práctica?", ["Enviar a cualquier correo.", "Publicar en WhatsApp.", "Usar canales autorizados y limitar el acceso a quienes necesitan la información.", "Subirla a una plataforma pública."], 2, "La información personal debe manejarse responsablemente y con acceso limitado."],


  ["🤖 Inteligencia artificial", "¿Cuál es un uso apropiado de una herramienta de inteligencia artificial?", ["Compartir bases de datos con información personal.", "Solicitar ideas para estructurar una presentación.", "Entregar contraseñas institucionales.", "Introducir información confidencial sin autorización."], 1, "La IA puede apoyar ideas y tareas, pero no se debe introducir información personal o confidencial sin autorización."],

  ["🤖 Inteligencia artificial", "Una IA te proporciona una respuesta que parece correcta. ¿Qué debes hacer antes de usarla en un documento oficial?", ["Copiarla inmediatamente.", "Confiar porque es IA.", "Revisar y verificar la información con fuentes confiables.", "Compartirla sin revisarla."], 2, "La IA puede generar información incorrecta o desactualizada; siempre debe verificarse."],

  ["🤖 Inteligencia artificial", "Necesitas ayuda para redactar un documento que contiene nombres, identificaciones y datos personales. ¿Qué haces?", ["Copiar toda la información en la IA.", "Eliminar o anonimizar los datos sensibles y trabajar con información no identificable.", "Tomar una foto y subirla.", "Compartir el documento completo."], 1, "Se debe proteger la información personal y confidencial; es preferible trabajar con ejemplos ficticios o datos anonimizados."],

  ["🤖 Inteligencia artificial", "¿Cuál instrucción probablemente generará una respuesta más útil de una IA?", ["Hazme un documento.", "Escribe algo sobre tecnología.", "Redacta una introducción de 150 palabras sobre seguridad digital para funcionarios públicos, con lenguaje claro y profesional.", "Necesito ayuda."], 2, "Un buen prompt define objetivo, contexto, extensión y características del resultado."],


  ["💻 Herramientas digitales", "Tienes 200 registros y necesitas encontrar rápidamente los de una dependencia determinada. ¿Qué herramienta puede ayudarte?", ["Filtro de datos.", "Cambiar el fondo de pantalla.", "Imprimir todo.", "Reiniciar el computador."], 0, "Los filtros permiten localizar información específica dentro de grandes cantidades de datos."],

  ["💻 Herramientas digitales", "Tres funcionarios necesitan trabajar simultáneamente en un mismo documento. ¿Qué opción es más eficiente cuando la herramienta institucional lo permite?", ["Enviar diferentes copias por correo.", "Trabajar sobre un documento compartido con permisos adecuados.", "Imprimirlo y repartirlo.", "Cada uno crea un documento diferente."], 1, "El trabajo colaborativo permite trabajar sobre una misma versión y reduce duplicados."],

  ["💻 Herramientas digitales", "Antes de participar en una reunión virtual de trabajo, ¿qué es recomendable?", ["Conectarse sin revisar nada.", "Verificar conexión, audio, cámara y material necesario.", "Compartir públicamente el enlace.", "Conectarse desde cualquier dispositivo sin verificar seguridad."], 1, "Una revisión previa reduce problemas técnicos y mejora la participación."],

  ["💻 Herramientas digitales", "Necesitas convertir un documento en papel a un archivo digital. ¿Qué herramienta puede ser útil?", ["Un escáner o aplicación autorizada de digitalización.", "Una calculadora.", "Un reproductor de música.", "El administrador de tareas."], 0, "La digitalización convierte documentos físicos en archivos electrónicos para su gestión."],


  ["🌎 Ciudadanía digital", "Un compañero te solicita por WhatsApp una base de datos con información personal de ciudadanos. ¿Qué deberías hacer?", ["Enviarla porque es compañero.", "Verificar si está autorizado y usar el canal institucional correspondiente.", "Publicarla en un grupo.", "Enviarla desde tu correo personal."], 1, "El acceso a información personal debe estar autorizado y utilizar canales institucionales."],

  ["🌎 Ciudadanía digital", "¿Cuál es una buena práctica al utilizar redes sociales desde un dispositivo institucional?", ["Publicar fotografías de documentos internos.", "Compartir información confidencial.", "Evitar publicar información institucional sensible o que comprometa a la entidad.", "Publicar capturas de sistemas internos."], 2, "La información institucional debe manejarse responsablemente también en redes sociales."],

  ["🌎 Ciudadanía digital", "Estás utilizando un computador compartido y debes retirarte unos minutos. ¿Qué debes hacer?", ["Dejar sistemas abiertos.", "Bloquear la sesión.", "Escribir tu contraseña en una nota.", "Pedir a alguien que vigile el equipo."], 1, "Bloquear la sesión evita que otra persona acceda a sistemas o información."],

  ["🌎 Ciudadanía digital", "Haces clic accidentalmente en un enlace sospechoso usando tu equipo institucional. ¿Qué deberías hacer?", ["Ocultarlo.", "Continuar normalmente.", "Informar inmediatamente al área o responsable correspondiente.", "Eliminar todos los archivos."], 2, "Reportar rápidamente permite evaluar el riesgo y tomar medidas oportunas."]
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
  competenciasVistas: []
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
   PANTALLA DE BIENVENIDA
   ===================================================== */

function renderWelcome(){

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

function renderRegister(){

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
            placeholder="Ej. María Pérez">

        </div>

        <div class="field">

          <label>
            Dependencia
          </label>

          <input
            id="dep"
            placeholder="Ej. Secretaría de Gobierno">

        </div>

        <div class="field">

          <label>
            Cargo
          </label>

          <input
            id="role"
            placeholder="Ej. Profesional / Técnico / Auxiliar">

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

function startQuiz(){

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


  if(
    !name ||
    !dep ||
    !role
  ){

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

function renderIntroduction(){

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

function mostrarCompetencia(tipo){

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

        <h4>
          🔑 Contraseñas
        </h4>

        <p>
          Utiliza contraseñas largas, difíciles de adivinar
          y evita utilizar la misma contraseña para diferentes
          servicios.
        </p>

        <h4>
          🛡️ Autenticación
        </h4>

        <p>
          La autenticación de dos factores agrega una segunda
          capa de protección además de la contraseña.
        </p>

        <h4>
          📧 Phishing
        </h4>

        <p>
          Desconfía de correos que generen urgencia,
          soliciten contraseñas, datos personales o pidan
          abrir enlaces sospechosos.
        </p>

        <h4>
          🔒 Protección del equipo
        </h4>

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

        <h4>
          ✉️ Correos institucionales
        </h4>

        <p>
          Antes de enviar un correo revisa cuidadosamente
          los destinatarios, el asunto y los archivos adjuntos.
        </p>

        <h4>
          📎 Archivos
        </h4>

        <p>
          Evita abrir archivos ejecutables o documentos
          provenientes de remitentes desconocidos o sospechosos.
        </p>

        <h4>
          📝 Asunto y contenido
        </h4>

        <p>
          Utiliza asuntos claros y explica brevemente
          el propósito del mensaje.
        </p>

        <h4>
          👥 Responder correctamente
        </h4>

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

        <h4>
          📁 Organización
        </h4>

        <p>
          Mantén los documentos organizados en carpetas
          utilizando estructuras claras, por ejemplo,
          proceso, año y tipo de documento.
        </p>

        <h4>
          ☁️ Compartir información
        </h4>

        <p>
          Cuando compartas un documento utiliza permisos
          adecuados y permite el acceso solamente a quienes
          realmente necesitan trabajar con él.
        </p>

        <h4>
          💾 Copias de seguridad
        </h4>

        <p>
          Las copias de seguridad periódicas ayudan a recuperar
          información ante fallas, pérdida de archivos o
          incidentes tecnológicos.
        </p>

        <h4>
          🔒 Datos personales
        </h4>

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

        <h4>
          💡 Utilízala como apoyo
        </h4>

        <p>
          La IA puede ayudarte a generar ideas o mejorar
          contenidos, pero la decisión final y revisión
          siempre debe estar a cargo de la persona.
        </p>

        <h4>
          🔎 Verifica la información
        </h4>

        <p>
          Una herramienta de IA puede generar información
          incorrecta o incompleta. Es importante revisar
          y verificar sus respuestas antes de utilizarlas.
        </p>

        <h4>
          🔐 Protege la información
        </h4>

        <p>
          No introduzcas contraseñas, datos personales o
          información institucional confidencial en herramientas
          de IA sin autorización.
        </p>

        <h4>
          ✍️ Da instrucciones claras
        </h4>

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

        <h4>
          🔎 Buscar información
        </h4>

        <p>
          En hojas de cálculo y otras herramientas puedes
          utilizar filtros para encontrar rápidamente
          información específica.
        </p>

        <h4>
          👥 Trabajo colaborativo
        </h4>

        <p>
          Cuando una herramienta lo permita, varias personas
          pueden trabajar sobre un mismo documento compartido,
          utilizando los permisos adecuados.
        </p>

        <h4>
          🎥 Reuniones virtuales
        </h4>

        <p>
          Antes de una reunión virtual verifica conexión,
          micrófono, cámara y los documentos que vas a necesitar.
        </p>

        <h4>
          📄 Digitalización
        </h4>

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

        <h4>
          🔒 Información personal
        </h4>

        <p>
          No compartas bases de datos o información personal
          sin verificar que exista autorización para hacerlo.
        </p>

        <h4>
          📱 Redes sociales
        </h4>

        <p>
          Evita publicar información institucional sensible,
          capturas de sistemas internos o documentos que
          puedan comprometer a la entidad.
        </p>

        <h4>
          🖥️ Equipos compartidos
        </h4>

        <p>
          Si utilizas un computador compartido, bloquea
          la sesión cuando te retires para proteger la
          información.
        </p>

        <h4>
          ⚠️ Reportar incidentes
        </h4>

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


  if(
    !state.competenciasVistas.includes(tipo)
  ){

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
    behavior:"smooth",
    block:"center"
  });

}


/* =====================================================
   ACTUALIZAR PROGRESO DE COMPETENCIAS
   ===================================================== */

function actualizarProgresoCompetencias(){

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


  if(!progreso || !boton){
    return;
  }


  if(
    contador < 6
  ){

    progreso.innerHTML = `

      📚 Has revisado
      <b>${contador} de 6</b>
      competencias.

      <br><br>

      👆 Revisa las competencias que faltan
      antes de comenzar el reto.

    `;


    boton.disabled = true;

    boton.style.opacity =
      "0.5";

    boton.style.cursor =
      "not-allowed";

    boton.innerHTML =
      "🔒 REVISA LAS 6 COMPETENCIAS";

  }

  else{

    progreso.innerHTML = `

      🎉 <b>¡Excelente!</b>

      Ya revisaste las
      <b>6 competencias digitales.</b>

      <br><br>

      ✅ Ya estás preparado para comenzar.

    `;


    boton.disabled = false;

    boton.style.opacity =
      "1";

    boton.style.cursor =
      "pointer";

    boton.innerHTML =
      "🚀 COMENZAR EL RETO";

  }

}


/* =====================================================
   COMENZAR LAS PREGUNTAS
   ===================================================== */

function beginQuestions(){

  if(
    state.competenciasVistas.length < 6
  ){

    return alert(
      "Antes de comenzar debes revisar las 6 competencias digitales."
    );

  }


  state.index = 0;

  renderQuestion();

}


/* =====================================================
   MOSTRAR PREGUNTA
   ===================================================== */

function renderQuestion(){

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


  progressText.textContent =
    `Pregunta ${state.index + 1} de ${questions.length} · ${pct}%`;


  app.innerHTML = `

    <section class="card">

      <div class="question-top">

        <span class="mission">
          ${q[0]}
        </span>

        <span>
          💯 100 puntos
        </span>

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

        ${
          q[2]
            .map(
              (o,i) => `

                <button
                  class="option"
                  onclick="answer(${i})"
                  id="opt${i}">

                  ${String.fromCharCode(65+i)}.
                  ${o}

                </button>

              `
            )
            .join("")
        }

      </div>


      <div id="feedback"></div>


      <div class="actions">

        <button
          id="nextBtn"
          class="btn hidden"
          onclick="nextQuestion()">

          ${
            state.index ===
            questions.length - 1
              ? "Ver resultado"
              : "Siguiente →"
          }

        </button>

      </div>

    </section>

  `;

}


/* =====================================================
   RESPONDER
   ===================================================== */

function answer(i){

  if(
    state.answers[
      state.index
    ] !== undefined
  ){

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


  if(correct){

    state.score += 100;

    state.categoryScores[
      q[0]
    ].correct++;


    document
      .getElementById(
        "opt" + i
      )
      .classList
      .add("correct");

  }

  else{

    document
      .getElementById(
        "opt" + i
      )
      .classList
      .add("wrong");


    document
      .getElementById(
        "opt" + q[3]
      )
      .classList
      .add("correct");

  }


  document
    .querySelectorAll(
      ".option"
    )
    .forEach(
      b => b.disabled = true
    );


  document
    .getElementById(
      "feedback"
    )
    .innerHTML = `

      <div class="feedback">

        ${
          correct
            ? "✅ <b>¡Correcto! +100 puntos</b>"
            : "❌ <b>Respuesta incorrecta</b>"
        }

        <br>

        ${q[4]}

      </div>

    `;


  document
    .getElementById(
      "nextBtn"
    )
    .classList
    .remove("hidden");

}


/* =====================================================
   SIGUIENTE PREGUNTA
   ===================================================== */

function nextQuestion(){

  state.index++;


  if(
    state.index <
    questions.length
  ){

    renderQuestion();

  }

  else{

    renderResult();

  }

}


/* =====================================================
   DETERMINAR NIVEL
   ===================================================== */

function level(score){

  if(
    score >= 2040
  ){

    return [
      "🏆",
      "Experto Digital Yacuanquer"
    ];

  }


  if(
    score >= 1680
  ){

    return [
      "🥈",
      "Usuario Digital Avanzado"
    ];

  }


  if(
    score >= 1200
  ){

    return [
      "🥉",
      "Usuario Digital"
    ];

  }


  return [
    "🌱",
    "Explorador Digital"
  ];

}


/* =====================================================
   RESULTADO
   ===================================================== */

function renderResult(){

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


          return `

            <div class="bar-row">

              <b>
                ${c}
              </b>

              <div class="bar">

                <div
                  class="fill"
                  style="width:${p}%">
                </div>

              </div>

              <span>
                ${p}%
              </span>

            </div>

          `;

        }
      )
      .join("");


  const resultPct =
    Math.round(
      state.score /
      24
    );


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

      </div>


      <h3>
        📊 Tu perfil por competencia
      </h3>


      <div class="bars">

        ${bars}

      </div>


      <div class="actions">

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

function renderSurvey(){

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
              ["1","2","3","4","5"]
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
              ["Sí","Parcialmente","No"]
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
              ["Sí","Parcialmente","No"]
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
   ENVIAR RESULTADO A GOOGLE SHEETS
   ===================================================== */

async function finish(){

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


  if(
    !state.survey.s1 ||
    !state.survey.s2 ||
    !state.survey.s3 ||
    !state.survey.s4
  ){

    return alert(
      "Completa las preguntas obligatorias de la encuesta."
    );

  }


  const record = {

    nombre:
      state.user.name,

    dependencia:
      state.user.dep,

    cargo:
      state.user.role,

    puntaje:
      state.score,

    porcentaje:
      Math.round(
        state.score /
        24
      ),

    nivel:
      level(
        state.score
      )[1],

    respuestas:
      state.answers,

    resultadosCompetencias:
      state.categoryScores,

    encuesta:
      state.survey,

    fecha:
      new Date()
        .toISOString()

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


  if(
    GOOGLE_SHEETS_URL &&
    !GOOGLE_SHEETS_URL.includes(
      "PEGA_AQUI"
    )
  ){

    try{

      await fetch(
        GOOGLE_SHEETS_URL,
        {
          method:"POST",

          mode:"no-cors",

          headers:{
            "Content-Type":
              "text/plain;charset=utf-8"
          },

          body:
            JSON.stringify(record)
        }
      );

    }

    catch(e){

      console.warn(
        "No se pudo enviar a Google Sheets:",
        e
      );

    }

  }


  mostrarFinal();

}


/* =====================================================
   PANTALLA FINAL DESPUÉS DE ENVIAR
   ===================================================== */

function mostrarFinal(){

  progressText.textContent =
    "Participación registrada";


  app.innerHTML = `

    <section class="card thanks">

      <div class="big">
        🎉
      </div>


      <h2>
        ¡Gracias por participar!
      </h2>


      <p>
        Tu participación ha sido registrada
        correctamente.
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
            ${Math.round(
              state.score /
              24
            )}%
          </b>

          Resultado

        </div>


        <div class="stat">

          <b>
            ${level(
              state.score
            )[1]}
          </b>

          Nivel

        </div>

      </div>


      <div class="notice">

        ✅ Tu resultado y encuesta
        fueron enviados correctamente.

      </div>


      <div class="actions">

        <button
          class="btn"
          onclick="terminarReto()">

          🏁 TERMINAR RETO

        </button>

      </div>

    </section>

  `;

}


/* =====================================================
   TERMINAR RETO
   ===================================================== */

function terminarReto(){

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
