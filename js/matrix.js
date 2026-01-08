// matrix.js — Digital Stream Matrix (nuevo, distinto y funcional)

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

    // Caracteres
    const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArray = chars.split("");

    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);

    // Cada columna tiene un flujo ondulado
    const streams = Array.from({ length: columns }, (_, i) => ({
        x: i * fontSize,
        y: Math.random() * canvas.height,
        speed: 1.5 + Math.random() * 2.5,
        waveOffset: Math.random() * 1000
    }));

    function draw() {
        // Fondo con desvanecimiento suave
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${fontSize}px monospace`;

        streams.forEach(stream => {
            // Movimiento ondulado horizontal
            const wave = Math.sin((Date.now() + stream.waveOffset) * 0.002) * 10;

            // Elegir carácter
            const char = charArray[Math.floor(Math.random() * charArray.length)];

            // Color verde Matrix
            ctx.fillStyle = "#00ff66";

            // Dibujar carácter
            ctx.fillText(char, stream.x + wave, stream.y);

            // Mover hacia abajo
            stream.y += stream.speed;

            // Reiniciar cuando sale de pantalla
            if (stream.y > canvas.height) {
                stream.y = -fontSize;
                stream.speed = 1.5 + Math.random() * 2.5;
                stream.waveOffset = Math.random() * 1000;
            }
        });

        requestAnimationFrame(draw);
    }

    draw();
});

