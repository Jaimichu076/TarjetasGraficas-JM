// search.js — Buscador inteligente global

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("searchInput");
    const resultsContainer = document.getElementById("searchResults");

    if (!input || !resultsContainer) return;

    input.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();
        if (query.length === 0) {
            resultsContainer.innerHTML = "";
            return;
        }

        const results = gpuData.filter(gpu => {
            return (
                gpu.name.toLowerCase().includes(query) ||
                gpu.brand.toLowerCase().includes(query) ||
                gpu.series.toLowerCase().includes(query) ||
                gpu.vram.toLowerCase().includes(query) ||
                gpu.tags.some(tag => tag.toLowerCase().includes(query)) ||
                gpu.performanceScore.toString().includes(query) ||
                gpu.price.toString().includes(query)
            );
        });

        renderSearchResults(results);
    });

    function renderSearchResults(list) {
        resultsContainer.innerHTML = "";

        if (list.length === 0) {
            resultsContainer.innerHTML = `
                <p class="text-center mt-3">No se encontraron GPUs.</p>
            `;
            return;
        }

        list.forEach(gpu => {
            const col = document.createElement("div");
            col.className = "col-md-4";

            col.innerHTML = `
                <a href="gpu.html?id=${gpu.id}" class="text-decoration-none">
                    <div class="card p-3 h-100">
                        <img src="${gpu.image}" class="img-fluid mb-2" alt="${gpu.name}">
                        <h5>${gpu.name}</h5>
                        <p class="mb-1"><strong>VRAM:</strong> ${gpu.vram}</p>
                        <p class="mb-1"><strong>Rendimiento:</strong> ${gpu.performanceScore}/100</p>
                        <p class="mb-1"><strong>Precio:</strong> ${gpu.price}€</p>
                    </div>
                </a>
            `;

            resultsContainer.appendChild(col);
        });
    }
});
