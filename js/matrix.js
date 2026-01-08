// matrix.js — Efecto clásico de caída de números y letras

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    canvas.id = "matrix";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // Ajustar tamaño del canvas
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Caracteres: números + letras
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charArray = chars.split("");

    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);

    // Cada columna representa una "lluvia"
    const drops = Array(columns).fill(1);

    function draw() {
        // Fondo con estela suave
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff66"; // Verde Matrix profesional
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const char = charArray[Math.floor(Math.random() * charArray.length)];

            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            // Reiniciar columna cuando llega al final
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }

        requestAnimationFrame(draw);
    }

    draw();
});
