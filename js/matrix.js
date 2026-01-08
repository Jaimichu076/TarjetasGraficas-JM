// matrix.js — Caída lineal estilo Matrix clásico, adaptado a web

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    canvas.id = "matrix";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // Ajustar tamaño del canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Caracteres: solo números y letras
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charArray = chars.split("");

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    // Cada columna tiene su posición vertical
    const drops = Array(columns).fill(0);

    function drawMatrix() {
        // Fondo con estela suave
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff66";
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const char = charArray[Math.floor(Math.random() * charArray.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillText(char, x, y);

            // Reiniciar columna aleatoriamente
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            } else {
                drops[i]++;
            }
        }

        requestAnimationFrame(drawMatrix);
    }

    drawMatrix();
});


