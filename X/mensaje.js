// X/mensaje.js — Pantalla azul realista sin QR

document.addEventListener("DOMContentLoaded", () => {
  const progressEl = document.getElementById("bsodProgress");
  const soundEl = document.getElementById("bsodSound");

  // Reproducir sonido fuerte al inicio
  try {
    soundEl.volume = 1.0;
    soundEl.play().catch(() => {});
  } catch (err) {
    console.warn("No se pudo reproducir el sonido:", err);
  }

  let progress = 0;
  const totalTimeMs = 11000;
  const stepMs = 110;

  const interval = setInterval(() => {
    progress++;
    progressEl.textContent = progress;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        window.location.href = "menusecreto.html";
      }, 400);
    }
  }, stepMs);
});


