// ranking.js — TarjetasGráficas-JM

const rankingType = document.getElementById("ranking-type");
const rankingList = document.getElementById("ranking-list");

// Función para extraer número de GB desde "32 GB GDDR7"
function parseVRAM(vramString) {
    const match = vramString.match(/(\d+)\s*GB/i);
    return match ? parseInt(match[1]) : 0;
}

// Función para calcular calidad/precio
function valueScore(gpu) {
    if (!gpu.performanceScore || !gpu.price) return 0;
    return gpu.performanceScore / gpu.price;
}

// Renderizar tarjetas
function renderRanking() {
    const type = rankingType.value;
    let gpus = [...gpuData];

    switch (type) {
        case "performance":
            gpus.sort((a, b) => b.performanceScore - a.performanceScore);
            break;
        case "price":
            gpus.sort((a, b) => a.price - b.price);
            break;
        case "value":
            gpus.sort((a, b) => valueScore(b) - valueScore(a));
            break;
        case "vram":
            gpus.sort((a, b) => parseVRAM(b.vram) - parseVRAM(a.vram));
            break;
        case "power":
            gpus.sort((a, b) => a.powerWatts - b.powerWatts);
            break;
        case "psu":
            gpus.sort((a, b) => a.recommendedPSU - b.recommendedPSU);
            break;
    }

    rankingList.innerHTML = gpus.map((gpu, i) => `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card bg-secondary text-light h-100 shadow-sm">
                <img src="${gpu.image}" class="card-img-top" alt="${gpu.name}">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${i + 1}. ${gpu.name}</h5>
                    <p class="card-text small">
                        <strong>VRAM:</strong> ${gpu.vram}<br>
                        <strong>Rendimiento:</strong> ${gpu.performanceScore}<br>
                        <strong>Precio:</strong> ${gpu.price} €<br>
                        <strong>Consumo:</strong> ${gpu.powerWatts} W<br>
                        <strong>Fuente recomendada:</strong> ${gpu.recommendedPSU} W
                    </p>
                    <a href="gpu.html?id=${gpu.id}" class="btn btn-light w-100">Ver detalles</a>
                </div>
            </div>
        </div>
    `).join("");
}

rankingType.addEventListener("change", renderRanking);
renderRanking();
