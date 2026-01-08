// compare.js
// Lógica del comparador de GPUs

document.addEventListener("DOMContentLoaded", () => {
    const select1 = document.getElementById("gpu1");
    const select2 = document.getElementById("gpu2");
    const result = document.getElementById("compare-result");
    const btn = document.getElementById("compare-btn");

    // Rellenar los selectores con todas las GPUs
    gpuData.forEach(gpu => {
        const option1 = document.createElement("option");
        option1.value = gpu.id;
        option1.textContent = gpu.name;

        const option2 = option1.cloneNode(true);

        select1.appendChild(option1);
        select2.appendChild(option2);
    });

    // Función para comparar dos GPUs
    btn.addEventListener("click", () => {
        const id1 = Number(select1.value);
        const id2 = Number(select2.value);

        if (!id1 || !id2) {
            result.innerHTML = `
                <div class="alert alert-warning text-center">
                    Debes seleccionar dos GPUs para comparar.
                </div>
            `;
            return;
        }

        if (id1 === id2) {
            result.innerHTML = `
                <div class="alert alert-info text-center">
                    Selecciona dos GPUs diferentes.
                </div>
            `;
            return;
        }

        const gpu1 = getGpuById(id1);
        const gpu2 = getGpuById(id2);

        // Tabla comparativa
        result.innerHTML = `
            <div class="card shadow-sm p-4">

                <h4 class="fw-bold text-center mb-4">Comparación</h4>

                <div class="row text-center mb-4">
                    <div class="col-md-6">
                        <img src="${gpu1.image}" class="img-fluid rounded mb-2" style="max-height: 180px;">
                        <h5 class="fw-bold">${gpu1.name}</h5>
                    </div>

                    <div class="col-md-6">
                        <img src="${gpu2.image}" class="img-fluid rounded mb-2" style="max-height: 180px;">
                        <h5 class="fw-bold">${gpu2.name}</h5>
                    </div>
                </div>

                <table class="table table-dark table-striped text-center">
                    <thead>
                        <tr>
                            <th>Característica</th>
                            <th>${gpu1.name}</th>
                            <th>${gpu2.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>VRAM</td>
                            <td>${gpu1.vram}</td>
                            <td>${gpu2.vram}</td>
                        </tr>
                        <tr>
                            <td>TDP</td>
                            <td>${gpu1.tdp}W</td>
                            <td>${gpu2.tdp}W</td>
                        </tr>
                        <tr>
                            <td>Precio</td>
                            <td>${gpu1.price}€</td>
                            <td>${gpu2.price}€</td>
                        </tr>
                        <tr>
                            <td>Rendimiento</td>
                            <td>${gpu1.performance}</td>
                            <td>${gpu2.performance}</td>
                        </tr>
                        <tr>
                            <td>FPS 1080p</td>
                            <td>${gpu1.fps["1080p"]}</td>
                            <td>${gpu2.fps["1080p"]}</td>
                        </tr>
                        <tr>
                            <td>FPS 1440p</td>
                            <td>${gpu1.fps["1440p"]}</td>
                            <td>${gpu2.fps["1440p"]}</td>
                        </tr>
                        <tr>
                            <td>FPS 4K</td>
                            <td>${gpu1.fps["4K"]}</td>
                            <td>${gpu2.fps["4K"]}</td>
                        </tr>
                    </tbody>
                </table>

                <h4 class="fw-bold mt-4">Conclusión</h4>
                <p class="mt-2" id="compare-conclusion"></p>

            </div>
        `;

        // Generar conclusión automática
        const conclusion = document.getElementById("compare-conclusion");

        if (gpu1.performance > gpu2.performance) {
            conclusion.textContent = `${gpu1.name} ofrece un rendimiento superior en general.`;
        } else if (gpu2.performance > gpu1.performance) {
            conclusion.textContent = `${gpu2.name} ofrece un rendimiento superior en general.`;
        } else {
            conclusion.textContent = "Ambas GPUs tienen un rendimiento muy similar.";
        }
    });
});
