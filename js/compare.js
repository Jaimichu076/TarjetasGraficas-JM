// compare.js — Comparador de GPUs para GPU Hub
// Rellena el selector, gestiona la lista de comparación y construye
// tanto las tarjetas como la tabla comparativa.

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    //   REFERENCIAS A ELEMENTOS
    // ============================

    const gpuSelect = document.getElementById("gpuSelect");
    const addGpuBtn = document.getElementById("addGpuBtn");
    const clearBtn = document.getElementById("clearBtn");
    const selectedGpusContainer = document.getElementById("selectedGpus");
    const compareTable = document.getElementById("compareTable");

    // Lista de IDs de GPUs seleccionadas para comparar
    let compareList = [];

    // ============================
    //   INICIALIZACIÓN
    // ============================

    function init() {
        cargarCompareListDesdeLocalStorage();
        rellenarSelector();
        renderizarSeleccionadas();
        renderizarTabla();
        configurarEventos();
    }

    // Lee compareList desde localStorage, si existe
    function cargarCompareListDesdeLocalStorage() {
        const stored = localStorage.getItem("compareList");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    compareList = parsed;
                }
            } catch (e) {
                console.error("Error leyendo compareList desde localStorage:", e);
                compareList = [];
            }
        }
    }

    // Guarda compareList en localStorage
    function guardarCompareListEnLocalStorage() {
        localStorage.setItem("compareList", JSON.stringify(compareList));
    }

    // Rellena el <select> con todas las GPUs
    function rellenarSelector() {
        if (!Array.isArray(gpuData)) return;

        // Limpiar primero por si acaso
        gpuSelect.innerHTML = "";

        gpuData.forEach(gpu => {
            const option = document.createElement("option");
            option.value = gpu.id;
            option.textContent = gpu.name;
            gpuSelect.appendChild(option);
        });
    }

    // ============================
    //   EVENTOS PRINCIPALES
    // ============================

    function configurarEventos() {
        // Añadir GPU seleccionada al comparador
        addGpuBtn.addEventListener("click", () => {
            const gpuId = gpuSelect.value;
            if (!gpuId) return;

            if (!compareList.includes(gpuId)) {
                compareList.push(gpuId);
                guardarCompareListEnLocalStorage();
                renderizarSeleccionadas();
                renderizarTabla();
            } else {
                mostrarMensajeTemporal("Esta GPU ya está en la comparación.");
            }
        });

        // Limpiar toda la comparación
        clearBtn.addEventListener("click", () => {
            compareList = [];
            guardarCompareListEnLocalStorage();
            renderizarSeleccionadas();
            renderizarTabla();
        });
    }

    // ============================
    //   RENDERIZAR TARJETAS
    // ============================

    function renderizarSeleccionadas() {
        selectedGpusContainer.innerHTML = "";

        if (compareList.length === 0) {
            const vacio = document.createElement("p");
            vacio.className = "text-muted-custom";
            vacio.textContent = "No hay GPUs seleccionadas para comparar.";
            selectedGpusContainer.appendChild(vacio);
            return;
        }

        compareList.forEach(id => {
            const gpu = getGpuById(id);
            if (!gpu) return;

            const col = document.createElement("div");
            col.className = "col-md-4";

            col.innerHTML = `
                <div class="card p-3 text-center h-100">
                    <img 
                        src="${gpu.image}" 
                        alt="${gpu.name}" 
                        class="img-fluid gpu-image mb-2"
                    />
                    <h3 class="gpu-card-title mb-1">${gpu.name}</h3>
                    <p class="gpu-meta mb-1">VRAM: ${gpu.vram}</p>
                    <p class="gpu-meta mb-1">Rendimiento: ${gpu.performanceScore}/100</p>
                    <p class="gpu-meta mb-2">Consumo: ${gpu.powerWatts} W</p>
                    <button 
                        class="btn btn-danger btn-sm mt-auto"
                        data-remove-id="${gpu.id}"
                    >
                        Quitar de la comparación
                    </button>
                </div>
            `;

            selectedGpusContainer.appendChild(col);
        });

        // Añadir eventos a los botones de eliminar
        const removeButtons = selectedGpusContainer.querySelectorAll("button[data-remove-id]");
        removeButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-remove-id");
                eliminarGpuDeComparacion(id);
            });
        });
    }

    function eliminarGpuDeComparacion(id) {
        compareList = compareList.filter(gpuId => gpuId !== id);
        guardarCompareListEnLocalStorage();
        renderizarSeleccionadas();
        renderizarTabla();
    }

    // ============================
    //   RENDERIZAR TABLA
    // ============================

    function renderizarTabla() {
        if (compareList.length === 0) {
            compareTable.innerHTML = `
                <tbody>
                    <tr>
                        <td class="text-muted-custom">
                            No hay GPUs seleccionadas. Añade alguna usando el selector superior.
                        </td>
                    </tr>
                </tbody>
            `;
            return;
        }

        const headers = [
            "Nombre",
            "VRAM",
            "Rendimiento (0-100)",
            "Precio (€)",
            "Consumo (W)",
            "PSU recomendada (W)"
        ];

        let html = "<thead><tr>";
        headers.forEach(titulo => {
            html += `<th>${titulo}</th>`;
        });
        html += "</tr></thead><tbody>";

        compareList.forEach(id => {
            const gpu = getGpuById(id);
            if (!gpu) return;

            html += `
                <tr>
                    <td>${gpu.name}</td>
                    <td>${gpu.vram}</td>
                    <td>${gpu.performanceScore}</td>
                    <td>${gpu.price}</td>
                    <td>${gpu.powerWatts}</td>
                    <td>${gpu.recommendedPsu}</td>
                </tr>
            `;
        });

        html += "</tbody>";

        compareTable.innerHTML = html;
    }

    // ============================
    //   MENSAJE TEMPORAL
    // ============================

    function mostrarMensajeTemporal(texto) {
        // Pequeño mensaje arriba de la tabla
        const mensaje = document.createElement("div");
        mensaje.className = "alert alert-warning mt-3 fade-in";
        mensaje.textContent = texto;

        // Insertar justo debajo de los controles (debajo del select y botones)
        const main = document.querySelector("main .container, main") || document.querySelector("main");
        const referencia = document.querySelector(".row.g-4.mb-5");
        if (referencia && referencia.parentNode) {
            referencia.parentNode.insertBefore(mensaje, referencia.nextSibling);
        } else if (main) {
            main.appendChild(mensaje);
        } else {
            document.body.appendChild(mensaje);
        }

        setTimeout(() => {
            mensaje.remove();
        }, 3000);
    }

    // ============================
    //   INICIAR
    // ============================

    init();
});



