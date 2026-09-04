// =====================================================
// MIGUE HERRERA FANBASE
// REPRODUCTOR + POST-ITS
// =====================================================


// =====================================================
// REPRODUCTOR
// =====================================================

const welcome =
  document.getElementById("welcome");

const enterBtn =
  document.getElementById("enterBtn");

const audio =
  document.getElementById("audio");

const playBtn =
  document.getElementById("playBtn");

const player =
  document.querySelector(".music-player");


// =====================================================
// REPRODUCIR
// =====================================================

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


// =====================================================
// ENTRAR
// =====================================================

enterBtn.addEventListener(
  "click",
  async () => {

    welcome.style.display =
      "none";

    await playMusic();

  }
);


// =====================================================
// PLAY / PAUSE
// =====================================================

playBtn.addEventListener(
  "click",
  async () => {

    if (audio.paused) {

      await playMusic();

    } else {

      audio.pause();

      playBtn.textContent =
        "▶";

      player.classList.remove(
        "playing"
      );

    }

  }
);


// =====================================================
// ERROR AUDIO
// =====================================================

audio.addEventListener(
  "error",
  () => {

    playBtn.title =
      "No se encontró assets/song.mp3";

  }
);



// =====================================================
// POST-ITS
// =====================================================

const addNoteBtn =
  document.getElementById(
    "addNoteBtn"
  );

const notesContainer =
  document.getElementById(
    "notesContainer"
  );

const toggleNotesBtn =
  document.getElementById(
    "toggleNotesBtn"
  );

const notesSidebar =
  document.getElementById(
    "notesSidebar"
  );


const noteNameInput =
  document.getElementById(
    "noteName"
  );

const noteTextInput =
  document.getElementById(
    "noteText"
  );


const STORAGE_KEY =
  "migueNotes";



// =====================================================
// OBTENER NOTAS
// =====================================================

function getNotes() {

  try {

    return JSON.parse(
      localStorage.getItem(
        STORAGE_KEY
      ) || "[]"
    );

  } catch (error) {

    return [];

  }

}



// =====================================================
// CARGAR NOTAS
// =====================================================

function loadNotes() {

  const notes =
    getNotes();


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



// =====================================================
// CREAR POST-IT
// =====================================================

function createNoteElement(
  name,
  text,
  index
) {

  const note =
    document.createElement(
      "div"
    );

  note.className =
    "sticky-note";


  // NOMBRE

  const nameElement =
    document.createElement(
      "div"
    );

  nameElement.className =
    "sticky-note-name";

  nameElement.textContent =
    name || "Anónimo";


  // TEXTO

  const textElement =
    document.createElement(
      "div"
    );

  textElement.className =
    "sticky-note-text";

  textElement.textContent =
    text;


  // BOTON X

  const deleteButton =
    document.createElement(
      "button"
    );

  deleteButton.className =
    "sticky-note-delete";

  deleteButton.type =
    "button";

  deleteButton.textContent =
    "✕";

  deleteButton.title =
    "Borrar nota";


  deleteButton.addEventListener(
    "click",
    () => {

      deleteNote(index);

    }
  );


  note.appendChild(
    deleteButton
  );

  note.appendChild(
    nameElement
  );

  note.appendChild(
    textElement
  );


  notesContainer.appendChild(
    note
  );

}



// =====================================================
// GUARDAR NOTA
// =====================================================

function saveNote() {

  const name =
    noteNameInput.value.trim();


  const text =
    noteTextInput.value.trim();


  if (!text) {

    alert(
      "Escribí algo en la nota 😤"
    );

    noteTextInput.focus();

    return;

  }


  const notes =
    getNotes();


  notes.push({

    name:
      name || "Anónimo",

    text:
      text

  });


  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(notes)
  );


  loadNotes();


  noteNameInput.value =
    "";

  noteTextInput.value =
    "";



  noteTextInput.focus();

}



// =====================================================
// BORRAR NOTA
// =====================================================

function deleteNote(index) {

  const notes =
    getNotes();


  notes.splice(
    index,
    1
  );


  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(notes)
  );


  loadNotes();

}



// =====================================================
// PEGAR NOTITA
// =====================================================

addNoteBtn.addEventListener(
  "click",
  saveNote
);



// =====================================================
// OCULTAR NOTAS
// =====================================================

toggleNotesBtn.addEventListener(
  "click",
  () => {

    notesSidebar.classList.toggle(
      "notes-hidden"
    );


    if (
      notesSidebar.classList.contains(
        "notes-hidden"
      )
    ) {

      toggleNotesBtn.textContent =
        "+";

      toggleNotesBtn.title =
        "Mostrar notas";

    } else {

      toggleNotesBtn.textContent =
        "−";

      toggleNotesBtn.title =
        "Ocultar notas";

    }

  }
);



// =====================================================
// CTRL + ENTER PARA PUBLICAR
// =====================================================

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



// =====================================================
// CARGAR NOTAS AL ABRIR
// =====================================================

loadNotes();
