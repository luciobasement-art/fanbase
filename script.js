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
   IMPORTANTE:

   Todos estos archivos tienen que estar dentro de:

   assets/music/

   EXCEPTO song.mp3, que sigue siendo el Anthem.

   Si preferís meter todos los MP3 directamente dentro
   de assets/, cambiá "assets/music/" por "assets/".
*/

const songs = [

  {
    title: "Migue Herrera Anthem",
    artist: "sonido oficial de la fanbase",
    file: "assets/song.mp3"
  },

  {
    title: "3SOME - Chzter, FLVCKKA, angely2k",
    artist: "3SOME",
    file: "assets/music/3SOME - Chzter, FLVCKKA, angely2k.mp3"
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
    title: "CHRYSTAL - THE DAYS",
    artist: "NOTION REMIX",
    file: "assets/music/CHRYSTAL - THE DAYS (NOTION REMIX).mp3"
  },

  {
    title: "Lykke Li - I Follow Rivers",
    artist: "Lykke Li",
    file: "assets/music/Lykke Li - I Follow Rivers (Lyrics).mp3"
  },

  {
    title: "Mike Posner - I Took A Pill In Ibiza",
    artist: "Seeb Remix",
    file: "assets/music/Mike Posner - I Took A Pill In Ibiza (Seeb Remix) (Explicit).mp3"
  },

  {
    title: "Rihanna - Man Down",
    artist: "Rihanna",
    file: "assets/music/Rihanna - Man Down.mp3"
  },

  {
    title: "Rihanna - Rude Boy",
    artist: "Rihanna",
    file: "assets/music/Rihanna - Rude Boy.mp3"
  },

  {
    title: "si se echa un pedo se lo velo",
    artist: "sonido de la fanbase",
    file: "assets/music/si se echa un pedo se lo velo.mp3"
  }

];


/*
   Elegimos una canción ALEATORIA.

   Esto significa que NO empieza siempre con
   Migue Herrera Anthem.
*/

let currentSong = -1;


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


/*
   Reproduce la canción actual.
*/

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


/*
   Pausa.
*/

function pauseMusic() {

  audio.pause();

  playBtn.textContent =
    "▶";

  player.classList.remove(
    "playing"
  );

}


/*
   Botón ENTER.

   Primero elegimos la canción aleatoria
   y después intentamos reproducirla.
*/

enterBtn.addEventListener(
  "click",
  async () => {

    welcome.style.display =
      "none";

    randomSong();

    await playMusic();

  }
);


/*
   Play / pausa
*/

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


/*
   Siguiente canción.

   También selecciona aleatoriamente.
*/

nextBtn.addEventListener(
  "click",
  async () => {

    randomSong();

    await playMusic();

  }
);


/*
   Cuando termina una canción,
   automáticamente elige otra aleatoria.
*/

audio.addEventListener(
  "ended",
  async () => {

    randomSong();

    await playMusic();

  }
);


/*
   Si un archivo no existe,
   mostramos el nombre en el reproductor
   pero no rompemos la página.
*/

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


/*
   Cargar notas guardadas.

   Se utiliza localStorage para que,
   si volvés a abrir la página en el mismo
   navegador, sigan apareciendo.
*/

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


/*
   Crear una nota.
*/

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


  /*
     Usamos textContent en vez de
     meter directamente el texto
     dentro de innerHTML.
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


/*
   Guardar una nueva nota.
*/

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


/*
   Eliminar una nota.
*/

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


/*
   Botón PEGAR NOTITA
*/

addNoteBtn.addEventListener(
  "click",
  saveNote
);


/*
   CTRL + ENTER también guarda.
*/

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


/*
   Ocultar / mostrar las notitas.
*/

toggleNotesBtn.addEventListener(
  "click",
  () => {

    const hidden =
      notesContainer.style.display ===
      "none";

    if (hidden) {

      notesContainer.style.display =
        "";

      document.querySelector(
        ".note-form"
      ).style.display =
        "";

      toggleNotesBtn.textContent =
        "−";

      toggleNotesBtn.title =
        "Ocultar notas";

    } else {

      notesContainer.style.display =
        "none";

      document.querySelector(
        ".note-form"
      ).style.display =
        "none";

      toggleNotesBtn.textContent =
        "+";

      toggleNotesBtn.title =
        "Mostrar notas";

    }

  }
);


/* =====================================================
   INICIAR
   ===================================================== */

loadNotes();
