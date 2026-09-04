const welcome = document.getElementById("welcome");
const enterBtn = document.getElementById("enterBtn");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const player = document.querySelector(".music-player");

async function playMusic() {
  try {
    await audio.play();
    playBtn.textContent = "❚❚";
    player.classList.add("playing");
  } catch (e) {
    playBtn.textContent = "▶";
  }
}

enterBtn.addEventListener("click", async () => {
  welcome.style.display = "none";
  await playMusic();
});

playBtn.addEventListener("click", async () => {
  if (audio.paused) {
    await playMusic();
  } else {
    audio.pause();
    playBtn.textContent = "▶";
    player.classList.remove("playing");
  }
});

// Si no hay audio todavía, el botón sigue funcionando sin romper la página.
audio.addEventListener("error", () => {
  playBtn.title = "Agregá assets/song.mp3 para activar la música";
});

// ========== SISTEMA DE NOTAS POST-IT ==========

const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

// Crear modal
const modal = document.createElement("div");
modal.className = "note-modal";
modal.innerHTML = `
  <div class="note-modal-content">
    <h2>✍️ Nueva Nota</h2>
    <label>Tu Nombre:</label>
    <input type="text" id="noteName" placeholder="ej: lucio, papu, etc">
    <label>Tu Nota:</label>
    <textarea id="noteText" placeholder="Escribe lo que quieras..."></textarea>
    <div class="note-modal-buttons">
      <button class="cancel-note">Cancelar</button>
      <button class="save-note">Guardar</button>
    </div>
  </div>
`;
document.body.appendChild(modal);

const noteNameInput = document.getElementById("noteName");
const noteTextInput = document.getElementById("noteText");
const saveNoteBtn = modal.querySelector(".save-note");
const cancelNoteBtn = modal.querySelector(".cancel-note");

// Cargar notas desde localStorage
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("migueNotes") || "[]");
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    createNoteElement(note.name, note.text, index);
  });
}

// Crear elemento de nota en el DOM
function createNoteElement(name, text, index) {
  const noteEl = document.createElement("div");
  noteEl.className = "sticky-note";
  noteEl.innerHTML = `
    <button class="sticky-note-delete" data-index="${index}">✕</button>
    <div class="sticky-note-name">${name || "Anónimo"}</div>
    <div class="sticky-note-text">${text}</div>
  `;
  
  noteEl.querySelector(".sticky-note-delete").addEventListener("click", () => {
    deleteNote(index);
  });
  
  notesContainer.appendChild(noteEl);
}

// Guardar nota
function saveNote() {
  const name = noteNameInput.value.trim() || "Anónimo";
  const text = noteTextInput.value.trim();
  
  if (!text) {
    alert("Escribí algo en la nota, boludo! 😤");
    return;
  }
  
  const notes = JSON.parse(localStorage.getItem("migueNotes") || "[]");
  notes.push({ name, text });
  localStorage.setItem("migueNotes", JSON.stringify(notes));
  
  loadNotes();
  closeModal();
}

// Eliminar nota
function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem("migueNotes") || "[]");
  notes.splice(index, 1);
  localStorage.setItem("migueNotes", JSON.stringify(notes));
  loadNotes();
}

// Abrir modal
function openModal() {
  modal.classList.add("active");
  noteNameInput.focus();
}

// Cerrar modal
function closeModal() {
  modal.classList.remove("active");
  noteNameInput.value = "";
  noteTextInput.value = "";
}

// Event listeners
addNoteBtn.addEventListener("click", openModal);
saveNoteBtn.addEventListener("click", saveNote);
cancelNoteBtn.addEventListener("click", closeModal);

// Cerrar modal al clickear afuera
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Enter para guardar
noteTextInput.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "Enter") {
    saveNote();
  }
});

// Cargar notas al iniciar
loadNotes();
