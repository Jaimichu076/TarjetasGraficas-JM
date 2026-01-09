// gpus.js — Motor del catálogo de GPUs en gpus.html
// Renderiza tarjetas, integra buscador, favoritos y comparador.

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    //   REFERENCIAS
    // ============================

    const gpuList = document.getElementById("gpuList");

    // ============================
    //   UTILIDADES
    // ============================

    function getFavorites() {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    }

    function setFavorites(list) {
        localStorage.setItem("favorites", JSON.stringify(list));
    }

    function getCompareList() {
        return JSON.parse(localStorage.getItem("compareList")) || [];
    }

    function setCompareList(list) {
        localStorage.setItem("compareList", JSON.stringify(list));
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
    //   RENDERIZAR TARJETAS
    // ============================

    function renderGpus(list) {
        gpuList.innerHTML = "";

        if (!list || list.length === 0) {
            gpuList.innerHTML = `
                <div class="col-12">
                    <div class="card p-4 text-center">
                        <h2 class="mb-2">No se encontraron GPUs</h2>
                        <p class="text-muted-custom mb-0">
                            Prueba con otro término de búsqueda.
                        </p>
                    </div>
                </div>
            `;
            return;
        }

        list.forEach(gpu => {
            const col = document.createElement("div");
            col.className = "col-12 col-md-6 col-lg-4";

            col.innerHTML = `
                <div class="card p-3 h-100 d-flex flex-column justify-content-between">

                    <div class="gpu-image-wrapper mb-3">
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
                            class="btn btn-primary flex-fill"
                            data-fav-id="${gpu.id}"
                        >
                            Favorito
                        </button>

                        <button 
                            class="btn btn-secondary flex-fill"
                            data-compare-id="${gpu.id}"
                        >
                            Comparar
                        </button>
                    </div>
                </div>
            `;

            gpuList.appendChild(col);
        });

        activarEventos();
    }

    // ============================
    //   EVENTOS DE TARJETAS
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

        // Añadir a favoritos
        const favButtons = document.querySelectorAll("[data-fav-id]");
        favButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-fav-id");
                let favorites = getFavorites();

                if (!favorites.includes(id)) {
                    favorites.push(id);
                    setFavorites(favorites);
                    mostrarMensajeFlotante("GPU añadida a favoritos.");
                } else {
                    mostrarMensajeFlotante("Esta GPU ya está en favoritos.");
                }
            });
        });

        // Añadir al comparador
        const compareButtons = document.querySelectorAll("[data-compare-id]");
        compareButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-compare-id");
                let compareList = getCompareList();

                if (!compareList.includes(id)) {
                    compareList.push(id);
                    setCompareList(compareList);
                    mostrarMensajeFlotante("GPU añadida al comparador.");
                } else {
                    mostrarMensajeFlotante("Esta GPU ya está en el comparador.");
                }
            });
        });
    }

    // ============================
    //   ESCUCHAR RESULTADOS DEL BUSCADOR
    // ============================

    document.addEventListener("gpuSearchResults", (e) => {
        const resultados = e.detail.resultados;
        renderGpus(resultados);
    });

    // ============================
    //   INICIO
    // ============================

    renderGpus(gpuData);
});



