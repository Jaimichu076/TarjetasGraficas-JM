// gpu.js
// Muestra la información de una GPU concreta usando el ID de la URL

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("gpu-details");
    if (!container) return;

    // Obtener ID desde la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // Buscar la GPU en la base de datos
    const gpu = getGpuById(id);

    // Si no existe, mostrar error
    if (!gpu) {
        container.innerHTML = `
            <div class="alert alert-danger text-center">
                <h4>GPU no encontrada</h4>
                <p>La tarjeta gráfica que buscas no existe.</p>
                <a href="gpus.html" class="btn btn-primary mt-3">Volver al catálogo</a>
            </div>
        `;
        return;
    }

    // Crear el contenido de la ficha
    container.innerHTML = `
        <div class="row">
            <!-- Imagen -->
            <div class="col-md-5 text-center mb-4">
                <img src="${gpu.image}" alt="${gpu.name}" class="img-fluid rounded shadow">
            </div>

            <!-- Información -->
            <div class="col-md-7">
                <h2 class="fw-bold">${gpu.name}</h2>
                <p class="text-muted">${gpu.description}</p>

                <ul class="list-group mb-4">
                    <li class="list-group-item"><strong>Marca:</strong> ${gpu.brand}</li>
                    <li class="list-group-item"><strong>VRAM:</strong> ${gpu.vram}</li>
                    <li class="list-group-item"><strong>TDP:</strong> ${gpu.tdp}W</li>
                    <li class="list-group-item"><strong>Año:</strong> ${gpu.year}</li>
                    <li class="list-group-item"><strong>Precio aprox:</strong> ${gpu.price}€</li>
                </ul>

                <h4 class="fw-bold">FPS estimados</h4>
                <ul class="list-group mb-4">
                    <li class="list-group-item"><strong>1080p:</strong> ${gpu.fps["1080p"]} FPS</li>
                    <li class="list-group-item"><strong>1440p:</strong> ${gpu.fps["1440p"]} FPS</li>
                    <li class="list-group-item"><strong>4K:</strong> ${gpu.fps["4K"]} FPS</li>
                </ul>

                <button id="fav-btn" class="btn btn-warning w-100 mb-3">
                    ⭐ Añadir a favoritos
                </button>

                <a href="gpus.html" class="btn btn-outline-light w-100">Volver al catálogo</a>
            </div>
        </div>
    `;

    // Preparar botón de favoritos (función real se hará en favorites.js)
    const favBtn = document.getElementById("fav-btn");
    favBtn.addEventListener("click", () => {
        alert("Esta GPU se añadirá a favoritos cuando implementemos favorites.js");
    });
});
