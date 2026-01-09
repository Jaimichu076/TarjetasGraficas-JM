// search.js — Motor de búsqueda avanzado para GPU Hub
// Este archivo permite filtrar GPUs por múltiples criterios de forma flexible.
// Está diseñado para integrarse con gpus.js, pero puede usarse en cualquier página.

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    //   CONFIGURACIÓN BÁSICA
    // ============================

    // Si la página no tiene un input de búsqueda, no hacemos nada
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    // Si no existe gpuData, no podemos buscar
    if (!Array.isArray(gpuData)) {
        console.error("gpuData no está definido o no es un array.");
        return;
    }

    // ============================
    //   EVENTO PRINCIPAL
    // ============================

    searchInput.addEventListener("input", () => {
        const term = searchInput.value.trim().toLowerCase();
        const resultados = buscarGpus(term);

        // Disparamos un evento personalizado para que gpus.js reciba los resultados
        const event = new CustomEvent("gpuSearchResults", {
            detail: { resultados }
        });

        document.dispatchEvent(event);
    });

    // ============================
    //   FUNCIÓN DE BÚSQUEDA
    // ============================

    function buscarGpus(term) {
        if (!term) return [...gpuData];

        // Dividir en tokens para búsquedas más inteligentes
        const tokens = term.split(" ").filter(t => t.length > 0);

        return gpuData.filter(gpu => {
            const texto = `
                ${gpu.name}
                ${gpu.vram}
                ${gpu.price}
                ${gpu.performanceScore}
                ${gpu.powerWatts}
            `.toLowerCase();

            // Cada token debe aparecer en el texto
            return tokens.every(t => texto.includes(t));
        });
    }

});
