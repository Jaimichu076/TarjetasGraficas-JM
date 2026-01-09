// matrix.js — Fondo Matrix estilo GPU Hub
// Lluvia de caracteres verde/cian, discreta pero con vibe hacker clara.

document.addEventListener("DOMContentLoaded", () => {
    // Crear el canvas y añadirlo al body
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "-1";          // Siempre detrás del contenido
    canvas.style.pointerEvents = "none"; // No bloquea clics ni scroll

    document.body.appendChild(canvas);

    // Ajuste inicial de tamaño
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        resetColumns();
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Caracteres a mostrar (estilo terminal/Matrix)
    const characters = "01[]{}<>/\\=+-|";
    let fontSize = 16;
    let columns = 0;
    let drops = [];

    // Recalcular columnas y drops cuando cambia el tamaño
    function resetColumns() {
        fontSize = 16; // Puedes tocar esto si quieres más o menos densidad
        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(1);
    }

    // Dibujar un frame de la animación
    function drawFrame() {
        // Fondo semitransparente para efecto de estela
        // Color se coordina con el fondo del CSS (oscuro pero no negro puro)
        ctx.fillStyle = "rgba(2, 6, 23, 0.22)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Degradado vertical para mezclar verde y cian
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#00ff6a");   // Verde Matrix
        gradient.addColorStop(0.5, "#27e2ff"); // Cian
        gradient.addColorStop(1, "#00ff6a");   // Vuelve a verde

        ctx.fillStyle = gradient;
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const char = characters.charAt(Math.floor(Math.random() * characters.length));
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillText(char, x, y);

            // Si pasa del fondo, a veces resetea la columna para que no sea uniforme
            if (y > canvas.height && Math.random() > 0.965) {
                drops[i] = 0;
            }

            drops[i]++;
        }

        requestAnimationFrame(drawFrame);
    }

    drawFrame();
});
