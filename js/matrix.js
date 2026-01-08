// matrix.js — Fondo Matrix moderno y optimizado

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Insertar canvas al fondo
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "-1";
    canvas.style.pointerEvents = "none";
    document.body.appendChild(canvas);

    // Ajustar tamaño
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Caracteres estilo Matrix moderno
    const chars = "01";
    const fontSize = 16;
    const columns = Math.floor(window.innerWidth / fontSize);

    // Posición de cada columna
    const drops = Array(columns).fill(1);

    function draw() {
        // Fondo semitransparente para efecto de estela suave
        ctx.fillStyle = "rgba(15, 15, 15, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00c47a"; // Verde moderno
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillText(text, x, y);

            // Reiniciar columna aleatoriamente para efecto natural
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }

        requestAnimationFrame(draw);
    }

    draw();
});



