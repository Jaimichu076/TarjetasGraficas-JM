// favorites.js — Gestión y visualización de GPUs favoritas en favorites.html

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    //   REFERENCIAS A ELEMENTOS
    // ============================

    const favoritesListContainer = document.getElementById("favoritesList");
    const clearFavoritesBtn = document.getElementById("clearFavoritesBtn");

    // Lista de IDs de GPUs favoritas
    let favorites = [];

    // ============================
    //   INICIALIZACIÓN
    // ============================

    function init() {
        cargarFavoritesDesdeLocalStorage();
        renderizarFavoritos();
        configurarEventos();
    }

    // Carga el array de IDs de localStorage
    function cargarFavoritesDesdeLocalStorage() {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    favorites = parsed;
                } else {
                    favorites = [];
                }
            } catch (e) {
                console.error("Error leyendo favoritos desde localStorage:", e);
                favorites = [];
            }
        } else {
            favorites = [];
        }
    }

    // Guarda la lista de favoritos en localStorage
    function guardarFavoritesEnLocalStorage() {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    // ============================
    //   EVENTOS
    // ============================

    function configurarEventos() {
        if (clearFavoritesBtn) {
            clearFavoritesBtn.addEventListener("click", () => {
                if (favorites.length === 0) {
                    mostrarMensajeFlotante("No hay favoritos que limpiar.");
                    return;
                }

                favorites = [];
                guardarFavoritesEnLocalStorage();
                renderizarFavoritos();
                mostrarMensajeFlotante("Se han eliminado todos los favoritos.");
            });
        }
    }

    // ============================
    //   RENDERIZAR FAVORITOS
    // ============================

    function renderizarFavoritos() {
        favoritesListContainer.innerHTML = "";

        if (favorites.length === 0) {
            const vacio = document.createElement("div");
            vacio.className = "col-12";

            vacio.innerHTML = `
                <div class="card p-4 text-center">
                    <h2 class="mb-2">Sin favoritos</h2>
                    <p class="text-muted-custom mb-3">
                        Aún no has marcado ninguna GPU como favorita.
                        Ve al catálogo y añade las tarjetas que quieras.
                    </p>
                    <a href="gpus.html" class="btn btn-primary">
                        Ir al catálogo de GPUs
                    </a>
                </div>
            `;

            favoritesListContainer.appendChild(vacio);
            return;
        }

        favorites.forEach(id => {
            const gpu = getGpuById(id);
            if (!gpu) return;

            const col = document.createElement("div");
            col.className = "col-md-4 col-lg-3";

            col.innerHTML = `
                <div class="card p-3 h-100 d-flex flex-column">
                    <div class="mb-2 text-center">
                        <img 
                            src="${gpu.image}" 
                            alt="${gpu.name}" 
                            class="img-fluid gpu-image"
                            style="cursor: pointer;"
                            data-gpu-id="${gpu.id}"
                        />
                    </div>

                    <h3 
                        class="gpu-card-title mb-1"
                        style="cursor: pointer;"
                        data-gpu-id="${gpu.id}"
                    >
                        ${gpu.name}
                    </h3>

                    <p class="gpu-meta mb-1">VRAM: ${gpu.vram}</p>
                    <p class="gpu-meta mb-1">Rendimiento: ${gpu.performanceScore}/100</p>
                    <p class="gpu-meta mb-2">Precio aprox.: ${gpu.price} €</p>

                    <div class="mt-auto d-flex flex-wrap gap-2">
                        <button 
                            class="btn btn-secondary btn-sm flex-fill"
                            data-open-id="${gpu.id}"
                        >
                            Ver ficha
                        </button>
                        <button 
                            class="btn btn-danger btn-sm flex-fill"
                            data-remove-id="${gpu.id}"
                        >
                            Quitar de favoritos
                        </button>
                    </div>
                </div>
            `;

            favoritesListContainer.appendChild(col);
        });

        activarEventosTarjetas();
    }

    // ============================
    //   EVENTOS EN TARJETAS
    // ============================

    function activarEventosTarjetas() {
        // Click en imagen o título para ir a gpu.html
        const infoClickables = favoritesListContainer.querySelectorAll("[data-gpu-id]");
        infoClickables.forEach(el => {
            el.addEventListener("click", () => {
                const id = el.getAttribute("data-gpu-id");
                if (id) {
                    window.location.href = `gpu.html?id=${encodeURIComponent(id)}`;
                }
            });
        });

        // Botón "Ver ficha"
        const openButtons = favoritesListContainer.querySelectorAll("button[data-open-id]");
        openButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-open-id");
                if (id) {
                    window.location.href = `gpu.html?id=${encodeURIComponent(id)}`;
                }
            });
        });

        // Botón "Quitar de favoritos"
        const removeButtons = favoritesListContainer.querySelectorAll("button[data-remove-id]");
        removeButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-remove-id");
                if (id) {
                    eliminarDeFavoritos(id);
                }
            });
        });
    }

    // ============================
    //   ELIMINAR FAVORITOS
    // ============================

    function eliminarDeFavoritos(id) {
        favorites = favorites.filter(favId => favId !== id);
        guardarFavoritesEnLocalStorage();
        renderizarFavoritos();
        mostrarMensajeFlotante("GPU eliminada de favoritos.");
    }

    // ============================
    //   MENSAJE FLOTANTE
    // ============================

    function mostrarMensajeFlotante(texto) {
        const mensaje = document.createElement("div");
        mensaje.textContent = texto;
        mensaje.className = "alert alert-success fade-in";
        mensaje.style.position = "fixed";
        mensaje.style.bottom = "20px";
        mensaje.style.right = "20px";
        mensaje.style.zIndex = "9999";
        mensaje.style.minWidth = "240px";

        document.body.appendChild(mensaje);

        setTimeout(() => {
            mensaje.remove();
        }, 2500);
    }

    // ============================
    //   INICIO
    // ============================

    init();
});
