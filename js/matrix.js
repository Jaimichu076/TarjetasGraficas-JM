// matrix.js — Fondo Matrix más hacker y brillante

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "-1";
    canvas.style.pointerEvents = "none";
    document.body.appendChild(canvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const chars = "01█▓▒░";
    let fontSize = 18;
    let columns = Math.floor(window.innerWidth / fontSize);
    let drops = Array(columns).fill(1);

    function resetDrops() {
        columns = Math.floor(window.innerWidth / fontSize);
        drops = Array(columns).fill(1);
    }

    window.addEventListener("resize", resetDrops);

    function draw() {
        // Fondo semitransparente para una estela más visible
        ctx.fillStyle = "rgba(2, 4, 10, 0.25)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, "#00ff88");
        gradient.addColorStop(0.5, "#00e0ff");
        gradient.addColorStop(1, "#ff00c8");
        ctx.fillStyle = gradient;
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillText(text, x, y);

            // Reinicio aleatorio
            if (y > canvas.height && Math.random() > 0.96) {
                drops[i] = 0;
            }

            drops[i]++;
        }

        requestAnimationFrame(draw);
    }

    draw();
});



