// matrix.js — Hacker Mode ULTRA+ (profesional y agresivo)

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    canvas.id = "matrix";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const chars = "01<>[]{}$#@&%+=/*ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArray = chars.split("");

    const baseFont = 16;
    const columns = Math.floor(window.innerWidth / baseFont);

    const drops = Array.from({ length: columns }, () => ({
        y: Math.random() * -1000,
        speed: 3 + Math.random() * 4,
        opacity: 0.4 + Math.random() * 0.6,
        size: baseFont + Math.random() * 6
    }));

    function hackerGreen() {
        const g = 180 + Math.floor(Math.random() * 75);
        return `rgb(0, ${g}, 0)`;
    }

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drops.forEach((drop, i) => {
            ctx.font = `${drop.size}px monospace`;
            ctx.fillStyle = hackerGreen();
            ctx.globalAlpha = drop.opacity;

            const char = charArray[Math.floor(Math.random() * charArray.length)];

            // Efecto glitch suave
            const glitchX = (Math.random() > 0.97) ? (Math.random() * 4 - 2) : 0;

            ctx.fillText(char, i * baseFont + glitchX, drop.y * drop.size);

            drop.y += drop.speed;

            if (drop.y * drop.size > canvas.height) {
                drop.y = Math.random() * -20;
                drop.speed = 3 + Math.random() * 4;
                drop.opacity = 0.4 + Math.random() * 0.6;
                drop.size = baseFont + Math.random() * 6;
            }
        });

        requestAnimationFrame(draw);
    }

    draw();
});
