// matrix.js — Matrix Rain ORIGINAL (mejorado ligeramente)

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

    // Caracteres clásicos: letras + números
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charArray = chars.split("");

    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);

    // Cada columna es una "lluvia"
    const drops = Array.from({ length: columns }, () => ({
        y: Math.random() * -50,
        speed: 2 + Math.random() * 3,
        trail: 12 + Math.floor(Math.random() * 18)
    }));

    function draw() {
        // Fondo con estela suave
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drops.forEach((drop, i) => {
            // Dibujar cabeza + estela
            for (let j = 0; j < drop.trail; j++) {
                const char = charArray[Math.floor(Math.random() * charArray.length)];
                const yPos = (drop.y - j) * fontSize;

                if (yPos < 0) continue;

                // Cabeza brillante
                if (j === 0) {
                    ctx.fillStyle = "#ccffcc";
                } else {
                    // Estela degradada
                    const opacity = 1 - j / drop.trail;
                    ctx.fillStyle = `rgba(0, 255, 70, ${opacity})`;
                }

                ctx.font = `${fontSize}px monospace`;
                ctx.fillText(char, i * fontSize, yPos);
            }

            // Mover columna
            drop.y += drop.speed;

            // Reiniciar cuando sale de pantalla
            if (drop.y * fontSize > canvas.height + drop.trail * fontSize) {
                drop.y = Math.random() * -20;
                drop.speed = 2 + Math.random() * 3;
                drop.trail = 12 + Math.floor(Math.random() * 18);
            }
        });

        requestAnimationFrame(draw);
    }

    draw();
});

