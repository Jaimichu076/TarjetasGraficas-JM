// ranking.js
// Lógica del ranking de GPUs

document.addEventListener("DOMContentLoaded", () => {
    const rankingType = document.getElementById("ranking-type");
    const rankingList = document.getElementById("ranking-list");

    // Función para calcular FPS promedio
    function avgFps(gpu) {
        return (gpu.fps["1080p"] + gpu.fps["1440p"] + gpu.fps["4K"]) / 3;
    }

    // Función para calcular calidad/precio
    function valueScore(gpu) {
        return gpu.performance / gpu.price;
    }

    // Función para mostrar el ranking
    function renderRanking() {
        const type = rankingType.value;
        let sorted = [...gpuData];

        // Ordenar según el criterio
        if (type === "performance") {
            sorted.sort((a, b) => b.performance - a.performance);
        } else if (type === "price") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (type === "value") {
            sorted.sort((a, b) => valueScore(b) - valueScore(a));
        } else if (type === "fps") {
            sorted.sort((a, b) => avgFps(b) - avgFps(a));
        }

        // Limpiar contenedor
        rankingList.innerHTML = "";

        // Mostrar tarjetas ordenadas
        sorted.forEach(gpu => {
            const card = document.createElement("div");
            card.className = "col-md-4";

            card.innerHTML = `
                <div class="card shadow-sm h-100">
                    <img src="${gpu.image}" class="card-img-top" alt="${gpu.name}">
                    <div class="card-body">
                        <h5 class="fw-bold">${gpu.name}</h5>
                        <p class="text-muted small mb-2">${gpu.vram}</p>
                        <p class="text-muted small mb-2">Rendimiento: ${gpu.performance}</p>
                        <p class="text-muted small mb-2">Precio: ${gpu.price}€</p>
                        <p class="text-muted small mb-3">FPS promedio: ${avgFps(gpu).toFixed(0)}</p>

                        <a href="gpu.html?id=${gpu.id}" class="btn btn-outline-primary w-100">
                            Ver detalles
                        </a>
                    </div>
                </div>
            `;

            rankingList.appendChild(card);
        });
    }

    // Render inicial
    renderRanking();

    // Actualizar cuando cambie el selector
    rankingType.addEventListener("change", renderRanking);
});
