// matrix.js — Matrix Rain ORIGINAL (complejo, bonito y profesional)

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    canvas.id = "matrix";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    // Ajustar tamaño
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Caracteres Matrix clásicos
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArray = chars.split("");

    const fontSize = 18;
    const columns = Math.floor(window.innerWidth / fontSize);

    // Cada columna tiene:
    // - y: posición vertical
    // - speed: velocidad
    // - trail: longitud de la estela
    const drops = Array.from({ length: columns }, () => ({
        y: Math.random() * -50,
        speed: 2 + Math.random() * 4,
        trail: 8 + Math.floor(Math.random() * 20)
    }));

    function draw() {
        // Fondo con estela suave
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drops.forEach((drop, i) => {
            // Dibujar la columna completa (cabeza + estela)
            for (let j = 0; j < drop.trail; j++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                const yPos = (drop.y - j) * fontSize;

                if (yPos < 0) continue;

                // Cabeza brillante
                if (j === 0) {
                    ctx.fillStyle = "#ccffcc";
                } else {
                    // Estela degradada
                    const opacity = 1 - j / drop.trail;
                    ctx.fillStyle = `rgba(0, 255, 100, ${opacity})`;
                }

                ctx.font = `${fontSize}px monospace`;
                ctx.fillText(text, i * fontSize, yPos);
            }

            // Mover columna
            drop.y += drop.speed;

            // Reiniciar cuando sale de pantalla
            if (drop.y * fontSize > canvas.height + drop.trail * fontSize) {
                drop.y = Math.random() * -20;
                drop.speed = 2 + Math.random() * 4;
                drop.trail = 8 + Math.floor(Math.random() * 20);
            }
        });

        requestAnimationFrame(draw);
    }

    draw();
});
