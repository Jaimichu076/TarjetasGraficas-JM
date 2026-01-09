// gpu.js — Página de detalle de una GPU concreta en gpu.html
// Lee el parámetro ?id=..., busca la GPU en gpuData y rellena la ficha.
// Integra: favoritos, comparador y navegación básica.

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    //   REFERENCIAS A ELEMENTOS
    // ============================

    const gpuTitle       = document.getElementById("gpuTitle");
    const gpuImage       = document.getElementById("gpuImage");
    const gpuName        = document.getElementById("gpuName");
    const gpuVram        = document.getElementById("gpuVram");
    const gpuPerf        = document.getElementById("gpuPerformance");
    const gpuPrice       = document.getElementById("gpuPrice");
    const gpuPower       = document.getElementById("gpuPower");
    const gpuPsu         = document.getElementById("gpuPsu");
    const gpuExtraSpecs  = document.getElementById("gpuExtraSpecs");

    const addFavBtn      = document.getElementById("addToFavoritesBtn");
    const addCompareBtn  = document.getElementById("addToCompareBtn");
    const backToListBtn  = document.getElementById("backToListBtn");

    // ============================
    //   UTILIDADES
    // ============================

    function getQueryParam(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
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

        setTimeout(() => {
            mensaje.remove();
        }, 2500);
    }

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

    // ============================
    //   INICIALIZACIÓN
    // ============================

    function init() {
        if (!Array.isArray(gpuData)) {
            console.error("gpuData no está definido o no es un array.");
            return;
        }

        const id = getQueryParam("id");
        if (!id) {
            mostrarError("No se ha especificado ninguna GPU.");
            return;
        }

        const gpu = getGpuById(id);
        if (!gpu) {
            mostrarError("No se ha encontrado la GPU solicitada.");
            return;
        }

        rellenarFicha(gpu);
        configurarEventos(gpu);
    }

    // ============================
    //   RELLENAR FICHA
    // ============================

    function rellenarFicha(gpu) {
        if (gpuTitle)  gpuTitle.textContent  = gpu.name;
        if (gpuName)   gpuName.textContent   = gpu.name;
        if (gpuVram)   gpuVram.textContent   = gpu.vram;
        if (gpuPerf)   gpuPerf.textContent   = gpu.performanceScore + "/100";
        if (gpuPrice)  gpuPrice.textContent  = gpu.price + " €";
        if (gpuPower)  gpuPower.textContent  = gpu.powerWatts + " W";
        if (gpuPsu)    gpuPsu.textContent    = gpu.recommendedPsu + " W o más";

        if (gpuImage) {
            gpuImage.src = gpu.image;
            gpuImage.alt = gpu.name;
        }

        // Si quieres añadir specs extra, podrías usar un objeto gpu.specs y renderizarlo aquí
        if (gpuExtraSpecs) {
            gpuExtraSpecs.innerHTML = `
                <p class="gpu-meta mb-1">ID interno: ${gpu.id}</p>
                <p class="gpu-meta mb-1">VRAM: ${gpu.vram}</p>
                <p class="gpu-meta mb-1">Consumo estimado: ${gpu.powerWatts} W</p>
                <p class="gpu-meta mb-1">PSU recomendada: ${gpu.recommendedPsu} W</p>
                <p class="text-muted-custom mb-0">
                    Puedes usar esta ficha como base y ampliarla con más campos cuando quieras.
                </p>
            `;
        }
    }

    // ============================
    //   CONFIGURAR EVENTOS
    // ============================

    function configurarEventos(gpu) {
        if (addFavBtn) {
            addFavBtn.addEventListener("click", () => {
                let favorites = getFavorites();
                if (!favorites.includes(gpu.id)) {
                    favorites.push(gpu.id);
                    setFavorites(favorites);
                    mostrarMensajeFlotante("GPU añadida a favoritos.");
                } else {
                    mostrarMensajeFlotante("Esta GPU ya está en tus favoritos.");
                }
            });
        }

        if (addCompareBtn) {
            addCompareBtn.addEventListener("click", () => {
                let compareList = getCompareList();
                if (!compareList.includes(gpu.id)) {
                    compareList.push(gpu.id);
                    setCompareList(compareList);
                    mostrarMensajeFlotante("GPU añadida al comparador.");
                } else {
                    mostrarMensajeFlotante("Esta GPU ya está en el comparador.");
                }
            });
        }

        if (backToListBtn) {
            backToListBtn.addEventListener("click", () => {
                window.location.href = "gpus.html";
            });
        }
    }

    // ============================
    //   ERRORES
    // ============================

    function mostrarError(msg) {
        if (gpuTitle) gpuTitle.textContent = "Error";
        if (gpuName)  gpuName.textContent  = msg;

        mostrarMensajeFlotante(msg, "danger");
    }

    // ============================
    //   INICIO
    // ============================

    init();
});



