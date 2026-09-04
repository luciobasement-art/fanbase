// Música
document.getElementById('enterBtn').addEventListener('click', () => {
  document.getElementById('welcome').style.display = 'none';
  const audio = document.getElementById('audio');
  audio.play().catch(() => console.log('Autoplay bloqueado'));
});

const playBtn = document.getElementById('playBtn');
const audio = document.getElementById('audio');
const musicPlayer = document.querySelector('.music-player');

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸';
    musicPlayer.classList.add('playing');
  } else {
    audio.pause();
    playBtn.textContent = '▶';
    musicPlayer.classList.remove('playing');
  }
});

// ========== SISTEMA DE NOTAS POST-IT ==========

// Elementos del DOM
const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');
const noteModal = document.querySelector('.note-modal') || createNoteModal();

// Crear el modal si no existe
function createNoteModal() {
  const modal = document.createElement('div');
  modal.className = 'note-modal';
  modal.innerHTML = `
    <div class="note-modal-content">
      <h2>✨ Nueva Nota ✨</h2>
      <form id="noteForm">
        <div class="form-group">
          <label for="noteName">Tu nombre:</label>
          <input type="text" id="noteName" placeholder="Ej: Lucio" required>
        </div>
        <div class="form-group">
          <label for="noteContent">Tu nota:</label>
          <textarea id="noteContent" placeholder="Escribe tu mensaje aquí..." required></textarea>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-cancel" onclick="closeNoteModal()">Cancelar</button>
          <button type="submit" class="btn-save">Guardar</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

// Abrir modal
addNoteBtn.addEventListener('click', () => {
  noteModal.classList.add('active');
  document.getElementById('noteName').focus();
});

// Cerrar modal
function closeNoteModal() {
  noteModal.classList.remove('active');
  document.getElementById('noteForm').reset();
}

// Cerrar modal al hacer click fuera
noteModal.addEventListener('click', (e) => {
  if (e.target === noteModal) {
    closeNoteModal();
  }
});

// Guardar nota
document.addEventListener('submit', (e) => {
  if (e.target.id === 'noteForm') {
    e.preventDefault();
    
    const name = document.getElementById('noteName').value.trim();
    const content = document.getElementById('noteContent').value.trim();
    
    if (name && content) {
      addNote(name, content);
      closeNoteModal();
    }
  }
});

// Agregar nota al DOM y al localStorage
function addNote(name, content) {
  const note = createNoteElement(name, content);
  notesContainer.insertBefore(note, notesContainer.firstChild);
  
  // Guardar en localStorage
  const notes = getNotes();
  notes.unshift({ name, content, id: Date.now() });
  localStorage.setItem('fanbaseNotes', JSON.stringify(notes));
}

// Crear elemento de nota
function createNoteElement(name, content, id = Date.now()) {
  const note = document.createElement('div');
  note.className = 'sticky-note';
  note.dataset.id = id;
  note.innerHTML = `
    <div class="sticky-note-header">
      <div class="sticky-note-name">${escapeHtml(name)}</div>
      <button type="button" class="sticky-note-delete" onclick="deleteNote(${id})">✕</button>
    </div>
    <p class="sticky-note-content">${escapeHtml(content)}</p>
  `;
  return note;
}

// Eliminar nota
function deleteNote(id) {
  const noteElement = document.querySelector(`[data-id="${id}"]`);
  if (noteElement) {
    noteElement.style.animation = 'noteAppear 0.3s ease-out reverse';
    setTimeout(() => {
      noteElement.remove();
      
      // Eliminar de localStorage
      const notes = getNotes().filter(note => note.id !== id);
      localStorage.setItem('fanbaseNotes', JSON.stringify(notes));
    }, 300);
  }
}

// Obtener notas de localStorage
function getNotes() {
  const stored = localStorage.getItem('fanbaseNotes');
  return stored ? JSON.parse(stored) : [];
}

// Cargar notas al abrir la página
function loadNotes() {
  const notes = getNotes();
  notes.forEach(note => {
    const element = createNoteElement(note.name, note.content, note.id);
    notesContainer.appendChild(element);
  });
}

// Escapar HTML para evitar inyecciones
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Cargar notas cuando la página carga
loadNotes();
