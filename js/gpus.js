// gpus.js — Renderizado del catálogo de GPUs en gpus.html
// Muestra todas las GPUs en tarjetas, integra búsqueda básica y acciones rápidas.

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    //   REFERENCIAS A ELEMENTOS
    // ============================

    const gpusListContainer = document.getElementById("gpusList");
    const searchInput = document.getElementById("searchInput");
    const clearSearchBtn = document.getElementById("clearSearchBtn");

    // Copia de trabajo del listado (para filtrar sin tocar gpuData original)
    let filteredGpus = [];

    // ============================
    //   INICIALIZACIÓN
    // ============================

    function init() {
        if (!Array.isArray(gpuData)) {
            console.error("gpuData no está definido o no es un array.");
            return;
        }

        // Por defecto, mostrar todas
        filteredGpus = [...gpuData];

        renderizarLista();

        configurarEventos();
    }

    // ============================
    //   EVENTOS
    // ============================

    function configurarEventos() {
        if (searchInput) {
            searchInput.addEventListener("input", () => {
                const term = searchInput.value.trim().toLowerCase();
                aplicarFiltro(term);
            });
        }

        if (clearSearchBtn) {
            clearSearchBtn.addEventListener("click", () => {
                if (searchInput) {
                    searchInput.value = "";
                }
                filteredGpus = [...gpuData];
                renderizarLista();
            });
        }
    }

    // ============================
    //   FILTRADO
    // ============================

    function aplicarFiltro(term) {
        if (!term) {
            filteredGpus = [...gpuData];
            renderizarLista();
            return;
        }

        filteredGpus = gpuData.filter(gpu => {
            const nombre = (gpu.name || "").toLowerCase();
            const vram = (gpu.vram || "").toLowerCase();
            const price = String(gpu.price || "").toLowerCase();

            return (
                nombre.includes(term) ||
                vram.includes(term) ||
                price.includes(term)
            );
        });

        renderizarLista();
    }

    // ============================
    //   RENDERIZADO DE TARJETAS
    // ============================

    function renderizarLista() {
        gpusListContainer.innerHTML = "";

        if (filteredGpus.length === 0) {
            const vacio = document.createElement("p");
            vacio.className = "text-muted-custom";
            vacio.textContent = "No se han encontrado GPUs con ese criterio de búsqueda.";
            gpusListContainer.appendChild(vacio);
            return;
        }

        filteredGpus.forEach(gpu => {
            const col = document.createElement("div");
            col.className = "col-md-4 col-lg-3";

            // Tarjeta completa
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

                    <p class="gpu-meta mb-1">
                        VRAM: ${gpu.vram}
                    </p>
                    <p class="gpu-meta mb-1">
                        Rendimiento: ${gpu.performanceScore}/100
                    </p>
                    <p class="gpu-meta mb-2">
                        Precio aprox.: ${gpu.price} €
                    </p>

                    <div class="mt-auto d-flex flex-wrap gap-2">
                        <button 
                            class="btn btn-primary btn-sm flex-fill" 
                            data-fav-id="${gpu.id}"
                        >
                            Favorito
                        </button>
                        <button 
                            class="btn btn-secondary btn-sm flex-fill" 
                            data-compare-id="${gpu.id}"
                        >
                            Comparar
                        </button>
                    </div>
                </div>
            `;

            gpusListContainer.appendChild(col);
        });

        // Activar eventos de las tarjetas después de inyectar el HTML
        activarEventosTarjetas();
    }

    // ============================
    //   EVENTOS EN TARJETAS
    // ============================

    function activarEventosTarjetas() {
        // Click en imagen o título -> ir a gpu.html?id=...
        const clickables = gpusListContainer.querySelectorAll("[data-gpu-id]");
        clickables.forEach(el => {
            el.addEventListener("click", () => {
                const id = el.getAttribute("data-gpu-id");
                if (id) {
                    window.location.href = `gpu.html?id=${encodeURIComponent(id)}`;
                }
            });
        });

        // Botones de favorito
        const favButtons = gpusListContainer.querySelectorAll("button[data-fav-id]");
        favButtons.forEach(btn => {
            btn.addEventListener("click", (event) => {
                event.stopPropagation(); // Evita que haga click en la tarjeta
                const id = btn.getAttribute("data-fav-id");
                if (id) {
                    añadirAFavoritos(id);
                }
            });
        });

        // Botones de comparar
        const compareButtons = gpusListContainer.querySelectorAll("button[data-compare-id]");
        compareButtons.forEach(btn => {
            btn.addEventListener("click", (event) => {
                event.stopPropagation();
                const id = btn.getAttribute("data-compare-id");
                if (id) {
                    añadirAComparador(id);
                }
            });
        });
    }

    // ============================
    //   FAVORITOS
    // ============================

    function añadirAFavoritos(id) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (!favorites.includes(id)) {
            favorites.push(id);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            mostrarMensajeFlotante("GPU añadida a favoritos.");
        } else {
            mostrarMensajeFlotante("Esta GPU ya está en tus favoritos.");
        }
    }

    // ============================
    //   COMPARADOR
    // ============================

    function añadirAComparador(id) {
        let compareList = JSON.parse(localStorage.getItem("compareList")) || [];

        if (!compareList.includes(id)) {
            compareList.push(id);
            localStorage.setItem("compareList", JSON.stringify(compareList));
            mostrarMensajeFlotante("GPU añadida al comparador.");
        } else {
            mostrarMensajeFlotante("Esta GPU ya está en el comparador.");
        }
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
        mensaje.style.minWidth = "220px";

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


