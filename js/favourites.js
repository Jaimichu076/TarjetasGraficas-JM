// favorites.js — Gestión de GPUs favoritas

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("favoritesList");

    renderFavorites();

    // Renderizar todas las GPUs favoritas
    function renderFavorites() {
        container.innerHTML = "";

        let favs = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favs.length === 0) {
            container.innerHTML = `
                <p class="text-center mt-4">No tienes GPUs en favoritos.</p>
            `;
            return;
        }

        favs.forEach(id => {
            const gpu = getGpuById(id);
            if (!gpu) return;

            const col = document.createElement("div");
            col.className = "col-md-4";

            col.innerHTML = `
                <div class="card p-3 h-100 text-center">
                    <img src="${gpu.image}" class="img-fluid mb-2" alt="${gpu.name}">
                    <h4>${gpu.name}</h4>
                    <p class="mb-1"><strong>VRAM:</strong> ${gpu.vram}</p>
                    <p class="mb-1"><strong>Rendimiento:</strong> ${gpu.performanceScore}/100</p>
                    <p class="mb-1"><strong>Precio:</strong> ${gpu.price}€</p>

                    <div class="d-flex justify-content-center gap-2 mt-3">
                        <a href="gpu.html?id=${gpu.id}" class="btn btn-primary">Ver</a>
                        <button class="btn btn-danger" onclick="removeFavorite('${gpu.id}')">Eliminar</button>
                    </div>
                </div>
            `;

            container.appendChild(col);
        });
    }

    // Eliminar GPU de favoritos
    window.removeFavorite = function(id) {
        let favs = JSON.parse(localStorage.getItem("favorites")) || [];
        favs = favs.filter(g => g !== id);
        localStorage.setItem("favorites", JSON.stringify(favs));
        renderFavorites();
    };
});

