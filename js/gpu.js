// gpu.js — Lógica para mostrar una GPU individual en gpu.html
// Estilo claro, limpio y totalmente integrado con el proyecto GPU Hub.

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    //   OBTENER ID DE LA URL
    // ============================

    const params = new URLSearchParams(window.location.search);
    const gpuId = params.get("id");

    if (!gpuId) {
        mostrarError("No se ha especificado ninguna GPU.");
        return;
    }

    // ============================
    //   BUSCAR GPU EN data.js
    // ============================

    const gpu = getGpuById(gpuId);

    if (!gpu) {
        mostrarError("La GPU solicitada no existe en la base de datos.");
        return;
    }

    // ============================
    //   RELLENAR DATOS EN LA PÁGINA
    // ============================

    document.getElementById("gpuName").textContent = gpu.name;
    document.getElementById("gpuImage").src = gpu.image;
    document.getElementById("gpuImage").alt = gpu.name;

    document.getElementById("gpuVram").textContent = gpu.vram;
    document.getElementById("gpuScore").textContent = gpu.performanceScore;
    document.getElementById("gpuWatts").textContent = gpu.powerWatts;
    document.getElementById("gpuPsu").textContent = gpu.recommendedPsu;

    // Tabla de especificaciones
    document.getElementById("specName").textContent = gpu.name;
    document.getElementById("specVram").textContent = gpu.vram;
    document.getElementById("specScore").textContent = gpu.performanceScore + "/100";
    document.getElementById("specPrice").textContent = gpu.price + " €";
    document.getElementById("specWatts").textContent = gpu.powerWatts + " W";
    document.getElementById("specPsu").textContent = gpu.recommendedPsu + " W";

    // ============================
    //   BOTÓN: AÑADIR A FAVORITOS
    // ============================

    const favBtn = document.getElementById("addToFavoritesBtn");

    favBtn.addEventListener("click", () => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (!favorites.includes(gpu.id)) {
            favorites.push(gpu.id);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            mostrarMensaje("GPU añadida a favoritos.");
        } else {
            mostrarMensaje("Esta GPU ya está en favoritos.");
        }
    });

    // ============================
    //   BOTÓN: AÑADIR AL COMPARADOR
    // ============================

    const compareBtn = document.getElementById("addToCompareBtn");

    compareBtn.addEventListener("click", () => {
        let compareList = JSON.parse(localStorage.getItem("compareList")) || [];

        if (!compareList.includes(gpu.id)) {
            compareList.push(gpu.id);
            localStorage.setItem("compareList", JSON.stringify(compareList));
            mostrarMensaje("GPU añadida al comparador.");
        } else {
            mostrarMensaje("Esta GPU ya está en el comparador.");
        }
    });

    // ============================
    //   FUNCIONES AUXILIARES
    // ============================

    function mostrarError(texto) {
        document.body.innerHTML = `
            <main class="container py-5 fade-in">
                <div class="card p-4 text-center">
                    <h2 class="mb-3">Error</h2>
                    <p class="text-muted-custom mb-4">${texto}</p>
                    <a href="gpus.html" class="btn btn-primary">Volver al catálogo</a>
                </div>
            </main>
        `;
    }

    function mostrarMensaje(texto) {
        const div = document.createElement("div");
        div.className = "alert alert-success mt-3 fade-in";
        div.textContent = texto;

        // Insertar debajo de los botones
        const card = document.querySelector(".card.p-4");
        card.appendChild(div);

        // Desaparecer después de 3 segundos
        setTimeout(() => {
            div.remove();
        }, 3000);
    }
});


