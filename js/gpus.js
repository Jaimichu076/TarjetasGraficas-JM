// gpus.js
// Este archivo se encarga de mostrar todas las GPUs en gpus.html

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("gpu-list");

    if (!container) return;

    // Recorremos la base de datos y creamos una tarjeta por GPU
    gpuData.forEach(gpu => {
        const card = document.createElement("div");
        card.className = "col-md-4";

        card.innerHTML = `
            <div class="card shadow-sm h-100">
                <img src="${gpu.image}" class="card-img-top" alt="${gpu.name}">
                <div class="card-body">
                    <h5 class="fw-bold">${gpu.name}</h5>
                    <p class="text-muted small mb-2">${gpu.vram}</p>
                    <p class="text-muted small mb-3">Precio aprox: ${gpu.price}€</p>
                    <a href="gpu.html?id=${gpu.id}" class="btn btn-outline-primary w-100">
                        Ver detalles
                    </a>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
});
