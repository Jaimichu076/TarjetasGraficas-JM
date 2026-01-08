// gpus.js — Render del catálogo + filtros avanzados

document.addEventListener("DOMContentLoaded", () => {
    const gpuList = document.getElementById("gpuList");

    // Filtros
    const filterBrand = document.getElementById("filterBrand");
    const filterVram = document.getElementById("filterVram");
    const filterPerformance = document.getElementById("filterPerformance");
    const sortBy = document.getElementById("sortBy");

    // Buscador inteligente (reutiliza el input de search.js)
    const searchInput = document.getElementById("searchInput");

    // Render inicial
    renderGpuList(gpuData);

    // EVENTOS
    filterBrand.addEventListener("change", applyFilters);
    filterVram.addEventListener("change", applyFilters);
    filterPerformance.addEventListener("change", applyFilters);
    sortBy.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);

    // APLICAR FILTROS
    function applyFilters() {
        let list = [...gpuData];

        const query = searchInput.value.trim().toLowerCase();
        const brand = filterBrand.value;
        const vram = filterVram.value;
        const perf = filterPerformance.value;
        const sort = sortBy.value;

        // FILTRO: Buscador inteligente
        if (query.length > 0) {
            list = list.filter(gpu =>
                gpu.name.toLowerCase().includes(query) ||
                gpu.brand.toLowerCase().includes(query) ||
                gpu.series.toLowerCase().includes(query) ||
                gpu.vram.toLowerCase().includes(query) ||
                gpu.tags.some(tag => tag.toLowerCase().includes(query)) ||
                gpu.performanceScore.toString().includes(query) ||
                gpu.price.toString().includes(query)
            );
        }

        // FILTRO: Marca
        if (brand !== "") {
            list = list.filter(gpu => gpu.brand === brand);
        }

        // FILTRO: VRAM mínima
        if (vram !== "") {
            list = list.filter(gpu => gpu.vramSize >= parseInt(vram));
        }

        // FILTRO: Rendimiento mínimo
        if (perf !== "") {
            list = list.filter(gpu => gpu.performanceScore >= parseInt(perf));
        }

        // ORDENAR
        switch (sort) {
            case "priceAsc":
                list.sort((a, b) => a.price - b.price);
                break;
            case "priceDesc":
                list.sort((a, b) => b.price - a.price);
                break;
            case "perfAsc":
                list.sort((a, b) => a.performanceScore - b.performanceScore);
                break;
            case "perfDesc":
                list.sort((a, b) => b.performanceScore - a.performanceScore);
                break;
        }

        renderGpuList(list);
    }

    // RENDERIZAR LISTA DE GPUS
    function renderGpuList(list) {
        gpuList.innerHTML = "";

        if (list.length === 0) {
            gpuList.innerHTML = `
                <p class="text-center mt-3">No se encontraron GPUs con esos filtros.</p>
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
                        <h4>${gpu.name}</h4>
                        <p class="mb-1"><strong>VRAM:</strong> ${gpu.vram}</p>
                        <p class="mb-1"><strong>Rendimiento:</strong> ${gpu.performanceScore}/100</p>
                        <p class="mb-1"><strong>Precio:</strong> ${gpu.price}€</p>
                    </div>
                </a>
            `;

            gpuList.appendChild(col);
        });
    }
});

