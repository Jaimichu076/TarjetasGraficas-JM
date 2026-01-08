// matrix.js
// Fondo Matrix ULTRA+ optimizado para rendimiento

document.addEventListener("DOMContentLoaded", () => {
    // Crear el canvas
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

    // Caracteres Matrix
    const chars = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArray = chars.split("");

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    // Posición inicial de cada columna
    const drops = Array(columns).fill(1);

    // Animación
    function draw() {
        // Fondo semitransparente para efecto de estela
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff9d";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const char = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            // Reiniciar columna aleatoriamente
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }

        requestAnimationFrame(draw);
    }

    draw();
});
