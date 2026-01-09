// matrix.js — Fondo Matrix estilo GPU Hub (versión estable)
// Lluvia de caracteres verde/cian, suave, clara y siempre visible.

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    //   CREAR CANVAS
    // ============================

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.id = "matrixCanvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "-1";
    canvas.style.pointerEvents = "none";

    document.body.prepend(canvas);

    // ============================
    //   AJUSTAR TAMAÑO
    // ============================

    function ajustarTamaño() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        inicializarColumnas();
    }

    window.addEventListener("resize", ajustarTamaño);
    ajustarTamaño();

    // ============================
    //   CONFIGURACIÓN MATRIX
    // ============================

    const caracteres = "01[]{}<>/\\=+-|";
    let tamañoFuente = 18;
    let columnas = 0;
    let gotas = [];

    function inicializarColumnas() {
        columnas = Math.floor(canvas.width / tamañoFuente);
        gotas = Array(columnas).fill(1);
    }

    // ============================
    //   DIBUJAR FRAME
    // ============================

    function dibujar() {
        // Fondo semitransparente para estela suave
        ctx.fillStyle = "rgba(2, 6, 23, 0.25)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Degradado Matrix verde/cian
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, "#00ff6a");
        grad.addColorStop(0.5, "#27e2ff");
        grad.addColorStop(1, "#00ff6a");

        ctx.fillStyle = grad;
        ctx.font = tamañoFuente + "px monospace";

        for (let i = 0; i < columnas; i++) {
            const char = caracteres[Math.floor(Math.random() * caracteres.length)];
            const x = i * tamañoFuente;
            const y = gotas[i] * tamañoFuente;

            ctx.fillText(char, x, y);

            // Reinicio aleatorio para efecto natural
            if (y > canvas.height && Math.random() > 0.965) {
                gotas[i] = 0;
            }

            gotas[i]++;
        }

        requestAnimationFrame(dibujar);
    }

    dibujar();
});

