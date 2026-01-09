// compare.js — Comparador de GPUs

document.addEventListener("DOMContentLoaded", () => {
  const gpuSelect = document.getElementById("gpuSelect");
  const addGpuBtn = document.getElementById("addGpuBtn");
  const clearBtn = document.getElementById("clearBtn");
  const selectedGpus = document.getElementById("selectedGpus");
  const compareTable = document.getElementById("compareTable");

  let selected = [];

  // Rellenar selector
  gpuData.forEach(gpu => {
    const option = document.createElement("option");
    option.value = gpu.id;
    option.textContent = gpu.name;
    gpuSelect.appendChild(option);
  });

  // Añadir GPU
  addGpuBtn.addEventListener("click", () => {
    const id = gpuSelect.value;
    if (!id || selected.includes(id)) return;

    selected.push(id);
    renderSelected();
    renderTable();
  });

  // Limpiar comparación
  clearBtn.addEventListener("click", () => {
    selected = [];
    renderSelected();
    renderTable();
  });

  // Renderizar tarjetas
  function renderSelected() {
    selectedGpus.innerHTML = "";

    selected.forEach(id => {
      const gpu = getGpuById(id);
      if (!gpu) return;

      const col = document.createElement("div");
      col.className = "col-md-4";

      col.innerHTML = `
        <div class="card p-3 text-center">
          <img src="${gpu.image}" class="img-fluid gpu-image mb-2" alt="${gpu.name}">
          <h5 class="gpu-card-title">${gpu.name}</h5>
          <p class="gpu-meta">VRAM: ${gpu.vram}</p>
          <p class="gpu-meta">Rendimiento: ${gpu.performanceScore}/100</p>
          <button class="btn btn-danger mt-2" onclick="removeGpu('${gpu.id}')">Eliminar</button>
        </div>
      `;

      selectedGpus.appendChild(col);
    });
  }

  // Eliminar GPU
  window.removeGpu = function(id) {
    selected = selected.filter(g => g !== id);
    renderSelected();
    renderTable();
  };

  // Renderizar tabla comparativa
  function renderTable() {
    if (selected.length === 0) {
      compareTable.innerHTML = "<tr><td class='text-muted'>No hay GPUs seleccionadas.</td></tr>";
      return;
    }

    const headers = ["Nombre", "VRAM", "Rendimiento", "Precio", "Consumo", "PSU recomendada"];
    let html = "<thead><tr>";
    headers.forEach(h => html += `<th>${h}</th>`);
    html += "</tr></thead><tbody>";

    selected.forEach(id => {
      const gpu = getGpuById(id);
      html += `
        <tr>
          <td>${gpu.name}</td>
          <td>${gpu.vram}</td>
          <td>${gpu.performanceScore}</td>
          <td>${gpu.price}€</td>
          <td>${gpu.powerWatts}W</td>
          <td>${gpu.recommendedPsu}W</td>
        </tr>
      `;
    });

    html += "</tbody>";
    compareTable.innerHTML = html;
  }
});


