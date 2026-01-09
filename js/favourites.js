// favorites.js — Gestión de GPUs favoritas en favorites.html
// Renderiza la lista, permite eliminar y limpiar favoritos.

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    //   REFERENCIAS
    // ============================

    const favoritesList = document.getElementById("favoritesList");
    const emptyMessage = document.getElementById("emptyFavoritesMessage");
    const clearFavoritesBtn = document.getElementById("clearFavoritesBtn");

    // ============================
    //   UTILIDADES
    // ============================

    function getFavorites() {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    }

    function setFavorites(list) {
        localStorage.setItem("favorites", JSON.stringify(list));
    }

    function mostrarMensajeFlotante(texto, tipo = "success") {
        const mensaje = document.createElement("div");
        mensaje.textContent = texto;
        mensaje.className = `alert alert-${tipo} fade-in`;
        mensaje.style.position = "fixed";
        mensaje.style.bottom = "20px";
        mensaje.style.right = "20px";
        mensaje.style.zIndex = "9999";
        mensaje.style.minWidth = "240px";

        document.body.appendChild(mensaje);

        setTimeout(() => mensaje.remove(), 2500);
    }

    // ============================
    //   RENDERIZAR FAVORITOS
    // ============================

    function renderFavorites() {
        const favs = getFavorites();
        favoritesList.innerHTML = "";

        if (favs.length === 0) {
            emptyMessage.style.display = "block";
            return;
        }

        emptyMessage.style.display = "none";

        favs.forEach(id => {
            const gpu = getGpuById(id);
            if (!gpu) return;

            const col = document.createElement("div");
            col.className = "col-12 col-md-6 col-lg-4";

            col.innerHTML = `
                <div class="card p-3 h-100 d-flex flex-column justify-content-between">

                    <div class="text-center mb-3">
                        <img 
                            src="${gpu.image}" 
                            alt="${gpu.name}" 
                            class="gpu-image"
                            style="cursor: pointer;"
                            data-open-id="${gpu.id}"
                        />
                    </div>

                    <h3 class="mb-2" style="cursor: pointer;" data-open-id="${gpu.id}">
                        ${gpu.name}
                    </h3>

                    <p class="gpu-meta mb-1"><strong>VRAM:</strong> ${gpu.vram}</p>
                    <p class="gpu-meta mb-1"><strong>Rendimiento:</strong> ${gpu.performanceScore}/100</p>
                    <p class="gpu-meta mb-1"><strong>Consumo:</strong> ${gpu.powerWatts} W</p>
                    <p class="gpu-meta mb-3"><strong>Precio:</strong> ${gpu.price} €</p>

                    <div class="d-flex flex-wrap gap-2 mt-auto">
                        <button 
                            class="btn btn-danger flex-fill"
                            data-remove-id="${gpu.id}"
                        >
                            Quitar
                        </button>

                        <button 
                            class="btn btn-secondary flex-fill"
                            data-open-id="${gpu.id}"
                        >
                            Ver ficha
                        </button>
                    </div>
                </div>
            `;

            favoritesList.appendChild(col);
        });

        activarEventos();
    }

    // ============================
    //   EVENTOS
    // ============================

    function activarEventos() {
        // Abrir ficha individual
        const openButtons = document.querySelectorAll("[data-open-id]");
        openButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-open-id");
                window.location.href = `gpu.html?id=${encodeURIComponent(id)}`;
            });
        });

        // Quitar GPU de favoritos
        const removeButtons = document.querySelectorAll("[data-remove-id]");
        removeButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-remove-id");
                let favs = getFavorites();
                favs = favs.filter(item => item !== id);
                setFavorites(favs);
                renderFavorites();
                mostrarMensajeFlotante("GPU eliminada de favoritos.");
            });
        });
    }

    // ============================
    //   LIMPIAR FAVORITOS
    // ============================

    if (clearFavoritesBtn) {
        clearFavoritesBtn.addEventListener("click", () => {
            const favs = getFavorites();
            if (favs.length === 0) {
                mostrarMensajeFlotante("No hay GPUs en favoritos.", "danger");
                return;
            }

            setFavorites([]);
            renderFavorites();
            mostrarMensajeFlotante("Favoritos limpiados.");
        });
    }

    // ============================
    //   INICIO
    // ============================

    renderFavorites();
});

