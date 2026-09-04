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
      Math.floor(Math.random() * songs.length);

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

  audio.load();

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

    playBtn.textContent = "❚❚";

    player.classList.add("playing");

  } catch (error) {

    console.error(
      "No se pudo reproducir la canción:",
      error
    );

    playBtn.textContent = "▶";

  }

}


/* =====================================================
   PAUSAR
   ===================================================== */

function pauseMusic() {

  audio.pause();

  playBtn.textContent = "▶";

  player.classList.remove("playing");

}


/* =====================================================
   ENTRAR A LA FANBASE
   ===================================================== */

if (enterBtn) {

  enterBtn.addEventListener(
    "click",
    async () => {

      welcome.style.display = "none";

      /*
         La primera canción se elige
         ALEATORIAMENTE.
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

      } else {

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

    playBtn.textContent = "▶";

    player.classList.remove("playing");

  }
);


/* =====================================================
   SISTEMA DE POST-ITS
   ===================================================== */

const addNoteBtn =
  document.getElementById("addNoteBtn");

const notesContainer =
  document.getElementById("notesContainer");

const noteNameInput =
  document.getElementById("noteName");

const noteTextInput =
  document.getElementById("noteText");

const toggleNotesBtn =
  document.getElementById("toggleNotesBtn");


/* =====================================================
   CARGAR NOTAS
   ===================================================== */

function loadNotes() {

  if (!notesContainer) {
    return;
  }

  const notes =
    JSON.parse(
      localStorage.getItem("migueNotes") || "[]"
    );

  notesContainer.innerHTML = "";

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
    document.createElement("div");

  noteEl.className = "sticky-note";


  const deleteButton =
    document.createElement("button");

  deleteButton.className =
    "sticky-note-delete";

  deleteButton.textContent = "✕";

  deleteButton.title =
    "Eliminar nota";


  const nameElement =
    document.createElement("div");

  nameElement.className =
    "sticky-note-name";

  nameElement.textContent =
    name || "Anónimo";


  const textElement =
    document.createElement("div");

  textElement.className =
    "sticky-note-text";

  textElement.textContent =
    text;


  noteEl.appendChild(deleteButton);

  noteEl.appendChild(nameElement);

  noteEl.appendChild(textElement);


  deleteButton.addEventListener(
    "click",
    () => {

      deleteNote(index);

    }
  );


  notesContainer.appendChild(noteEl);

}


/* =====================================================
   GUARDAR NOTA
   ===================================================== */

function saveNote() {

  if (!noteNameInput || !noteTextInput) {
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


  const notes =
    JSON.parse(
      localStorage.getItem("migueNotes") || "[]"
    );


  notes.push({

    name: name,

    text: text

  });


  localStorage.setItem(
    "migueNotes",
    JSON.stringify(notes)
  );


  noteNameInput.value = "";

  noteTextInput.value = "";


  loadNotes();

}


/* =====================================================
   ELIMINAR NOTA
   ===================================================== */

function deleteNote(index) {

  const notes =
    JSON.parse(
      localStorage.getItem("migueNotes") || "[]"
    );


  notes.splice(index, 1);


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
        document.querySelector(".note-form");

      const hidden =
        notesContainer &&
        notesContainer.style.display === "none";


      if (hidden) {

        notesContainer.style.display = "";

        if (form) {
          form.style.display = "";
        }

        toggleNotesBtn.textContent = "−";

        toggleNotesBtn.title =
          "Ocultar notas";

      } else {

        notesContainer.style.display = "none";

        if (form) {
          form.style.display = "none";
        }

        toggleNotesBtn.textContent = "+";

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
