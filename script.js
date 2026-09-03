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
