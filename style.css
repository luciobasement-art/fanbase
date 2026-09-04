document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // REPRODUCTOR DE MÚSICA
  // =========================

  const audio = document.getElementById("audio");
  const playButton = document.getElementById("playButton");

  if (audio && playButton) {

    playButton.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    audio.addEventListener("play", () => {
      playButton.textContent = "⏸";
    });

    audio.addEventListener("pause", () => {
      playButton.textContent = "▶";
    });

  }


  // =========================
  // BOTÓN DE ENTRAR
  // =========================

  const enterButton = document.getElementById("enterBtn");

  if (enterButton) {
    enterButton.addEventListener("click", () => {

      const audio = document.getElementById("audio");

      if (audio) {
        audio.play().catch(() => {});
      }

    });
  }

});
