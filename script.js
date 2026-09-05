/* =====================================================
   MIGUE HERRERA FANBASE
   SCRIPT PRINCIPAL
   ===================================================== */


/* =====================================================
   SUPABASE
   ===================================================== */

const supabaseUrl =
  "https://wzzdussogrbxkftviewi.supabase.co";


const supabaseKey =
  "sb_publishable_J_xHRzFAk546QMCWOkbL2Q_VB4Fpz34";


const supabaseClient =
  window.supabase.createClient(
    supabaseUrl,
    supabaseKey
  );


/* =====================================================
   PANTALLA DE ENTRADA
   ===================================================== */

const welcome =
  document.getElementById("welcome");

const enterBtn =
  document.getElementById("enterBtn");


/* =====================================================
   REPRODUCTOR DE MUSICA
   ===================================================== */

const audio =
  document.getElementById("audio");

const playBtn =
  document.getElementById("playBtn");

const nextBtn =
  document.getElementById("nextBtn");

const player =
  document.querySelector(".music-player");

const trackTitle =
  document.getElementById("trackTitle");

const trackArtist =
  document.getElementById("trackArtist");


/* =====================================================
   CANCIONES
   ===================================================== */

const songs = [

  {
    title: "Migue Herrera Anthem",
    artist: "sonido oficial de la fanbase",
    file: "assets/song.mp3"
  },

  {
    title: "Diet Pepsi",
    artist: "Addison Rae",
    file: "assets/music/diet-pepsi.mp3"
  },

  {
    title: "Headphones On",
    artist: "Addison Rae",
    file: "assets/music/headphones-on.mp3"
  },

  {
    title: "I Follow Rivers",
    artist: "Lykke Li",
    file: "assets/music/follow-rivers.mp3"
  },

  {
    title: "Man Down",
    artist: "Rihanna",
    file: "assets/music/man-down.mp3"
  },

  {
    title: "Rude Boy",
    artist: "Rihanna",
    file: "assets/music/rude-boy.mp3"
  }

];


/* =====================================================
   CANCION ACTUAL
   ===================================================== */

let currentSong = -1;


/* =====================================================
   ELEGIR CANCION ALEATORIA
   ===================================================== */

function randomSong() {

  if (songs.length === 0) {
    return;
  }


  let randomIndex;


  do {

    randomIndex =
      Math.floor(
        Math.random() * songs.length
      );

  } while (
    songs.length > 1 &&
    randomIndex === currentSong
  );


  currentSong =
    randomIndex;


  loadSong(currentSong);

}


/* =====================================================
   CARGAR CANCION
   ===================================================== */

function loadSong(index) {

  const song =
    songs[index];


  if (!song) {
    return;
  }


  audio.src =
    song.file;


  audio.load();


  if (trackTitle) {

    trackTitle.textContent =
      song.title;

  }


  if (trackArtist) {

    trackArtist.textContent =
      song.artist;

  }

}


/* =====================================================
   REPRODUCIR
   ===================================================== */

async function playMusic() {

  try {

    await audio.play();


    playBtn.textContent =
      "❚❚";


    player.classList.add(
      "playing"
    );

  }

  catch (error) {

    console.error(
      "No se pudo reproducir la canción:",
      error
    );


    playBtn.textContent =
      "▶";

  }

}


/* =====================================================
   PAUSAR
   ===================================================== */

function pauseMusic() {

  audio.pause();


  playBtn.textContent =
    "▶";


  player.classList.remove(
    "playing"
  );

}


/* =====================================================
   ENTRAR A LA FANBASE
   ===================================================== */

if (enterBtn) {

  enterBtn.addEventListener(
    "click",
    async () => {

      welcome.style.display =
        "none";


      /*
         La canción inicial
         es ALEATORIA.
      */

      randomSong();


      await playMusic();

    }
  );

}


/* =====================================================
   PLAY / PAUSA
   ===================================================== */

if (playBtn) {

  playBtn.addEventListener(
    "click",
    async () => {

      if (audio.paused) {

        await playMusic();

      }

      else {

        pauseMusic();

      }

    }
  );

}


/* =====================================================
   SIGUIENTE CANCION
   ===================================================== */

if (nextBtn) {

  nextBtn.addEventListener(
    "click",
    async () => {

      randomSong();

      await playMusic();

    }
  );

}


/* =====================================================
   CUANDO TERMINA UNA CANCION
   ===================================================== */

audio.addEventListener(
  "ended",
  async () => {

    randomSong();

    await playMusic();

  }
);


/* =====================================================
   ERROR DE AUDIO
   ===================================================== */

audio.addEventListener(
  "error",
  () => {

    console.error(
      "No se pudo cargar:",
      audio.src
    );


    playBtn.textContent =
      "▶";


    player.classList.remove(
      "playing"
    );

  }
);


/* =====================================================
   SISTEMA DE POST-ITS
   ===================================================== */

const addNoteBtn =
  document.getElementById(
    "addNoteBtn"
  );


const notesContainer =
  document.getElementById(
    "notesContainer"
  );


const noteNameInput =
  document.getElementById(
    "noteName"
  );


const noteTextInput =
  document.getElementById(
    "noteText"
  );


const toggleNotesBtn =
  document.getElementById(
    "toggleNotesBtn"
  );


/* =====================================================
   CARGAR NOTAS DESDE SUPABASE
   ===================================================== */

async function loadNotes() {

  if (!notesContainer) {
    return;
  }


  const {
    data,
    error
  } = await supabaseClient

    .from("notes")

    .select(
      "id, name, text, created_at"
    )

    .order(
      "created_at",
      {
        ascending: true
      }
    );


  if (error) {

    console.error(
      "Error cargando las notas:",
      error
    );

    return;

  }


  notesContainer.innerHTML =
    "";


  data.forEach(
    (note) => {

      createNoteElement(
        note
      );

    }
  );

}


/* =====================================================
   CREAR ELEMENTO POST-IT
   ===================================================== */

function createNoteElement(note) {

  const noteEl =
    document.createElement(
      "div"
    );


  noteEl.className =
    "sticky-note";


  /*
     BOTON ELIMINAR
  */

  const deleteButton =
    document.createElement(
      "button"
    );


  deleteButton.className =
    "sticky-note-delete";


  deleteButton.textContent =
    "✕";


  deleteButton.title =
    "Eliminar nota";


  /*
     NOMBRE
  */

  const nameElement =
    document.createElement(
      "div"
    );


  nameElement.className =
    "sticky-note-name";


  nameElement.textContent =
    note.name ||
    "Anónimo";


  /*
     TEXTO
  */

  const textElement =
    document.createElement(
      "div"
    );


  textElement.className =
    "sticky-note-text";


  textElement.textContent =
    note.text;


  /*
     ARMAR POST-IT
  */

  noteEl.appendChild(
    deleteButton
  );


  noteEl.appendChild(
    nameElement
  );


  noteEl.appendChild(
    textElement
  );


  /*
     ELIMINAR
  */

  deleteButton.addEventListener(
    "click",
    async () => {

      await deleteNote(
        note.id
      );

    }
  );


  notesContainer.appendChild(
    noteEl
  );

}


/* =====================================================
   GUARDAR NOTA EN SUPABASE
   ===================================================== */

async function saveNote() {

  if (
    !noteNameInput ||
    !noteTextInput
  ) {

    return;

  }


  const name =
    noteNameInput.value.trim() ||
    "Anónimo";


  const text =
    noteTextInput.value.trim();


  if (!text) {

    alert(
      "Escribí algo en la nota 😤"
    );

    return;

  }


  /*
     GUARDAMOS EN SUPABASE
  */

  const {
    error
  } = await supabaseClient

    .from("notes")

    .insert({

      name: name,

      text: text

    });


  if (error) {

    console.error(
      "Error guardando la nota:",
      error
    );


    alert(
      "No se pudo pegar la notita 😭"
    );


    return;

  }


  /*
     Limpiar formulario
  */

  noteNameInput.value =
    "";


  noteTextInput.value =
    "";


  /*
     Volver a cargar las notas
  */

  await loadNotes();

}


/* =====================================================
   ELIMINAR NOTA DE SUPABASE
   ===================================================== */

async function deleteNote(id) {

  if (!id) {
    return;
  }


  const {
    error
  } = await supabaseClient

    .from("notes")

    .delete()

    .eq(
      "id",
      id
    );


  if (error) {

    console.error(
      "Error eliminando la nota:",
      error
    );


    return;

  }


  await loadNotes();

}


/* =====================================================
   BOTON PEGAR NOTITA
   ===================================================== */

if (addNoteBtn) {

  addNoteBtn.addEventListener(
    "click",
    saveNote
  );

}


/* =====================================================
   CTRL + ENTER PARA GUARDAR
   ===================================================== */

if (noteTextInput) {

  noteTextInput.addEventListener(
    "keydown",
    (event) => {

      if (
        event.ctrlKey &&
        event.key === "Enter"
      ) {

        saveNote();

      }

    }
  );

}


/* =====================================================
   OCULTAR / MOSTRAR NOTITAS
   ===================================================== */

if (toggleNotesBtn) {

  toggleNotesBtn.addEventListener(
    "click",
    () => {

      const form =
        document.querySelector(
          ".note-form"
        );


      const hidden =
        notesContainer &&
        notesContainer.style.display ===
        "none";


      if (hidden) {

        notesContainer.style.display =
          "";


        if (form) {

          form.style.display =
            "";

        }


        toggleNotesBtn.textContent =
          "−";


        toggleNotesBtn.title =
          "Ocultar notas";

      }

      else {

        notesContainer.style.display =
          "none";


        if (form) {

          form.style.display =
            "none";

        }


        toggleNotesBtn.textContent =
          "+";


        toggleNotesBtn.title =
          "Mostrar notas";

      }

    }
  );

}


/* =====================================================
   ACTUALIZACIONES EN TIEMPO REAL
   ===================================================== */

supabaseClient

  .channel("notitas-fanbase")

  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "notes"
    },
    () => {

      loadNotes();

    }
  )

  .subscribe();


/* =====================================================
   INICIAR
   ===================================================== */

loadNotes();
