// compare.js — Comparación de múltiples GPUs

document.addEventListener("DOMContentLoaded", () => {
    const selector = document.getElementById("gpuSelector");
    const addBtn = document.getElementById("addGpuBtn");
    const clearBtn = document.getElementById("clearCompareBtn");
    const selectedContainer = document.getElementById("selectedGpus");
    const tableContainer = document.getElementById("compareTableContainer");

    let selectedGpus = [];

    // Rellenar selector con todas las GPUs
    gpuData.forEach(gpu => {
        const option = document.createElement("option");
        option.value = gpu.id;
        option.textContent = gpu.name;
        selector.appendChild(option);
    });

    // Añadir GPU a la comparación
    addBtn.addEventListener("click", () => {
        const id = selector.value;

        if (!id) {
            alert("Selecciona una GPU primero");
            return;
        }

        if (selectedGpus.includes(id)) {
            alert("Esta GPU ya está en la comparación");
            return;
        }

        selectedGpus.push(id);
        renderSelectedGpus();
        renderCompareTable();
    });

    // Limpiar comparación
    clearBtn.addEventListener("click", () => {
        selectedGpus = [];
        renderSelectedGpus();
        renderCompareTable();
    });

    // Renderizar tarjetas de GPUs seleccionadas
    function renderSelectedGpus() {
        selectedContainer.innerHTML = "";

        selectedGpus.forEach(id => {
            const gpu = getGpuById(id);

            const card = document.createElement("div");
            card.className = "card p-2 text-center";
            card.style.width = "180px";

            card.innerHTML = `
                <h6 class="mb-2">${gpu.name}</h6>
                <button class="btn btn-danger btn-sm" onclick="removeGpu('${id}')">Quitar</button>
            `;

            selectedContainer.appendChild(card);
        });
    }

    // Quitar GPU de la comparación
    window.removeGpu = function(id) {
        selectedGpus = selectedGpus.filter(g => g !== id);
        renderSelectedGpus();
        renderCompareTable();
    };

    // Renderizar tabla comparativa
    function renderCompareTable() {
        if (selectedGpus.length === 0) {
            tableContainer.innerHTML = `<p class="text-center mt-3">No hay GPUs seleccionadas.</p>`;
            return;
        }

        let html = `
            <table class="table table-dark table-striped text-center align-middle">
                <thead>
                    <tr>
                        <th>Característica</th>
        `;

        // Encabezados con nombres de GPUs
        selectedGpus.forEach(id => {
            const gpu = getGpuById(id);
            html += `<th>${gpu.name}</th>`;
        });

        html += `
                </tr>
                </thead>
                <tbody>
        `;

        // Imagen
        html += `<tr><td><strong>Imagen</strong></td>`;
        selectedGpus.forEach(id => {
            const gpu = getGpuById(id);
            html += `<td><img src="${gpu.image}" style="width:120px;"></td>`;
        });
        html += `</tr>`;

        // VRAM
        html += `<tr><td><strong>VRAM</strong></td>`;
        selectedGpus.forEach(id => {
            html += `<td>${getGpuById(id).vram}</td>`;
        });
        html += `</tr>`;

        // Rendimiento
        html += `<tr><td><strong>Rendimiento</strong></td>`;
        selectedGpus.forEach(id => {
            html += `<td>${getGpuById(id).performanceScore}/100</td>`;
        });
        html += `</tr>`;

        // Precio
        html += `<tr><td><strong>Precio</strong></td>`;
        selectedGpus.forEach(id => {
            html += `<td>${getGpuById(id).price}€</td>`;
        });
        html += `</tr>`;

        // Consumo
        html += `<tr><td><strong>Consumo</strong></td>`;
        selectedGpus.forEach(id => {
            html += `<td>${getGpuById(id).powerWatts}W</td>`;
        });
        html += `</tr>`;

        // PSU recomendada
        html += `<tr><td><strong>PSU recomendada</strong></td>`;
        selectedGpus.forEach(id => {
            html += `<td>${getGpuById(id).recommendedPsu}W</td>`;
        });
        html += `</tr>`;

        // FPS por juego
        html += `
            <tr>
                <td colspan="${selectedGpus.length + 1}" class="table-secondary text-dark">
                    <strong>FPS por juego</strong>
                </td>
            </tr>
        `;

        games.forEach(game => {
            html += `<tr><td><strong>${game.name}</strong></td>`;

            selectedGpus.forEach(id => {
                const gpu = getGpuById(id);
                const fps = gpu.gamesFps[game.id];

                if (fps) {
                    html += `
                        <td>
                            1080p: ${fps["1080p"]} FPS<br>
                            1440p: ${fps["1440p"]} FPS<br>
                            4K: ${fps["4K"]} FPS
                        </td>
                    `;
                } else {
                    html += `<td>No disponible</td>`;
                }
            });

            html += `</tr>`;
        });

        html += `
                </tbody>
            </table>
        `;

        tableContainer.innerHTML = html;
    }
});

