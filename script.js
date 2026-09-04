/* =====================================================
   MIGUE HERRERA FANBASE
   SCRIPT PRINCIPAL
   ===================================================== */


/* =====================================================
   PANTALLA DE ENTRADA
   ===================================================== */

const welcome = document.getElementById("welcome");
const enterBtn = document.getElementById("enterBtn");


/* =====================================================
   REPRODUCTOR DE MUSICA
   ===================================================== */

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const player = document.querySelector(".music-player");

const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");


/*
   CANCIONES

   Migue Herrera Anthem:
   assets/song.mp3

   Los demás temas están dentro de:
   assets/music/
*/

const songs = [

  {
    title: "Migue Herrera Anthem",
    artist: "sonido oficial de la fanbase",
    file: "assets/song.mp3"
  },

  {
    title: "Addison Rae - Diet Pepsi",
    artist: "Addison Rae",
    file: "assets/music/Addison Rae - Diet Pepsi (Official Lyric Video).mp3"
  },

  {
    title: "Addison Rae - Headphones On",
    artist: "Addison Rae",
    file: "assets/music/Addison Rae - Headphones On (Official Lyric Video).mp3"
  },

  {
    title: "Lykke Li - I Follow Rivers",
    artist: "Lykke Li",
    file: "assets/music/Lykke Li - I Follow Rivers (Lyrics).mp3"
  },

  {
    title: "Rihanna - Man Down",
    artist: "Rihanna",
    file: "assets/music/Rihanna - Man Down (Audio).mp3"
  },

  {
    title: "Rihanna - Rude Boy",
    artist: "Rihanna",
    file: "assets/music/Rihanna - Rude Boy.mp3"
  }

];


/*
   La canción inicial es ALEATORIA.
   NO empieza obligatoriamente con
   Migue Herrera Anthem.
*/

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

  currentSong = randomIndex;

  loadSong(currentSong);

}


/* =====================================================
   CARGAR CANCION
   ===================================================== */

function loadSong(index) {

  const song = songs[index];

  if (!song) {
    return;
  }

  audio.src = song.file;

  trackTitle.textContent =
    song.title;

  trackArtist.textContent =
    song.artist;

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

  } catch (error) {

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
   BOTON ENTRAR
   ===================================================== */

enterBtn.addEventListener(
  "click",
  async () => {

    welcome.style.display =
      "none";

    /*
       Elegimos una canción aleatoria
       cuando entra a la página.
    */

    randomSong();

    await playMusic();

  }
);


/* =====================================================
   PLAY / PAUSA
   ===================================================== */

playBtn.addEventListener(
  "click",
  async () => {

    if (audio.paused) {

      await playMusic();

    } else {

      pauseMusic();

    }

  }
);


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

const notesSidebar =
  document.getElementById(
    "notesSidebar"
  );


/* =====================================================
   CARGAR NOTAS
   ===================================================== */

function loadNotes() {

  const notes =
    JSON.parse(
      localStorage.getItem(
        "migueNotes"
      ) || "[]"
    );

  notesContainer.innerHTML =
    "";

  notes.forEach(
    (note, index) => {

      createNoteElement(
        note.name,
        note.text,
        index
      );

    }
  );

}


/* =====================================================
   CREAR NOTA
   ===================================================== */

function createNoteElement(
  name,
  text,
  index
) {

  const noteEl =
    document.createElement(
      "div"
    );

  noteEl.className =
    "sticky-note";


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


  const nameElement =
    document.createElement(
      "div"
    );

  nameElement.className =
    "sticky-note-name";

  nameElement.textContent =
    name || "Anónimo";


  const textElement =
    document.createElement(
      "div"
    );

  textElement.className =
    "sticky-note-text";

  textElement.textContent =
    text;


  noteEl.appendChild(
    deleteButton
  );

  noteEl.appendChild(
    nameElement
  );

  noteEl.appendChild(
    textElement
  );


  deleteButton.addEventListener(
    "click",
    () => {

      deleteNote(index);

    }
  );


  notesContainer.appendChild(
    noteEl
  );

}


/* =====================================================
   GUARDAR NOTA
   ===================================================== */

function saveNote() {

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


  const notes =
    JSON.parse(
      localStorage.getItem(
        "migueNotes"
      ) || "[]"
    );


  notes.push({

    name: name,

    text: text

  });


  localStorage.setItem(
    "migueNotes",
    JSON.stringify(notes)
  );


  noteNameInput.value =
    "";

  noteTextInput.value =
    "";


  loadNotes();

}


/* =====================================================
   ELIMINAR NOTA
   ===================================================== */

function deleteNote(index) {

  const notes =
    JSON.parse(
      localStorage.getItem(
        "migueNotes"
      ) || "[]"
    );


  notes.splice(
    index,
    1
  );


  localStorage.setItem(
    "migueNotes",
    JSON.stringify(notes)
  );


  loadNotes();

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
   CTRL + ENTER
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
        notesContainer.style.display ===
        "none";


      if (hidden) {

        notesContainer.style.display =
          "";

        if (form) {
          form.style.display = "";
        }

        toggleNotesBtn.textContent =
          "−";

        toggleNotesBtn.title =
          "Ocultar notas";

      } else {

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
   INICIAR
   ===================================================== */

loadNotes();
