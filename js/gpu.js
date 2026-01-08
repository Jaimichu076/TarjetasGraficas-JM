// gpu.js — Render dinámico de la ficha individual de GPU

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("gpuContent");

    // Obtener ID desde la URL
    const params = new URLSearchParams(window.location.search);
    const gpuId = params.get("id");

    if (!gpuId) {
        container.innerHTML = `<p class="text-center mt-4">No se ha especificado ninguna GPU.</p>`;
        return;
    }

    const gpu = getGpuById(gpuId);

    if (!gpu) {
        container.innerHTML = `<p class="text-center mt-4">GPU no encontrada.</p>`;
        return;
    }

    renderGpuPage(gpu);
});


// RENDER PRINCIPAL
function renderGpuPage(gpu) {
    const container = document.getElementById("gpuContent");

    container.innerHTML = `
        <div class="row g-4">

            <!-- Imagen -->
            <div class="col-md-5 text-center">
                <img src="${gpu.image}" class="img-fluid mb-3" alt="${gpu.name}">
            </div>

            <!-- Información principal -->
            <div class="col-md-7">
                <h2 class="fw-bold">${gpu.name}</h2>

                <p><strong>Marca:</strong> ${gpu.brand}</p>
                <p><strong>Serie:</strong> ${gpu.series}</p>
                <p><strong>VRAM:</strong> ${gpu.vram}</p>
                <p><strong>Rendimiento:</strong> ${gpu.performanceScore}/100</p>
                <p><strong>Consumo:</strong> ${gpu.powerWatts}W</p>
                <p><strong>PSU recomendada:</strong> ${gpu.recommendedPsu}W</p>
                <p><strong>Precio:</strong> ${gpu.price}€</p>

                <button class="btn btn-primary mt-3" onclick="addToFavorites('${gpu.id}')">
                    Añadir a favoritos
                </button>
            </div>

        </div>

        <hr class="my-5">

        <!-- FPS POR JUEGO -->
        <section>
            <h3 class="mb-3">Rendimiento en juegos (FPS)</h3>
            ${renderFpsTable(gpu)}
        </section>

        <hr class="my-5">

        <!-- GRÁFICAS (se rellenarán más adelante) -->
        <section>
            <h3 class="mb-3">Gráficas de rendimiento</h3>
            <p class="text-muted">Próximamente: gráficas comparativas por resolución.</p>

            <div id="chartsContainer" class="row g-4">
                <!-- Aquí irán las gráficas cuando las implementemos -->
            </div>
        </section>
    `;
}


// TABLA DE FPS POR JUEGO
function renderFpsTable(gpu) {
    const fps = gpu.gamesFps;

    let html = `
        <div class="table-responsive">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Juego</th>
                        <th>1080p</th>
                        <th>1440p</th>
                        <th>4K</th>
                    </tr>
                </thead>
                <tbody>
    `;

    for (const gameId in fps) {
        const game = getGameById(gameId);
        const row = fps[gameId];

        html += `
            <tr>
                <td>${game ? game.name : gameId}</td>
                <td>${row["1080p"]} FPS</td>
                <td>${row["1440p"]} FPS</td>
                <td>${row["4K"]} FPS</td>
            </tr>
        `;
    }

    html += `
                </tbody>
            </table>
        </div>
    `;

    return html;
}


// FAVORITOS
function addToFavorites(id) {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favs.includes(id)) {
        favs.push(id);
        localStorage.setItem("favorites", JSON.stringify(favs));
        alert("GPU añadida a favoritos");
    } else {
        alert("Esta GPU ya está en favoritos");
    }
}

