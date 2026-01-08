// favorites.js
// Maneja los favoritos del usuario usando localStorage

// Obtener favoritos del usuario actual
function getUserFavorites(email) {
    const allFavs = JSON.parse(localStorage.getItem("favorites")) || {};
    return allFavs[email] || [];
}

// Guardar favoritos del usuario actual
function saveUserFavorites(email, favs) {
    const allFavs = JSON.parse(localStorage.getItem("favorites")) || {};
    allFavs[email] = favs;
    localStorage.setItem("favorites", JSON.stringify(allFavs));
}

document.addEventListener("DOMContentLoaded", () => {
    const user = getCurrentUser();
    const msg = document.getElementById("fav-msg");
    const list = document.getElementById("fav-list");

    // Si no hay sesión
    if (!user) {
        msg.innerHTML = `
            <div class="alert alert-warning text-center">
                Debes iniciar sesión para ver tus favoritos.
                <br>
                <a href="login.html" class="btn btn-primary mt-3">Iniciar sesión</a>
            </div>
        `;
        return;
    }

    // Cargar favoritos del usuario
    const favIds = getUserFavorites(user);

    if (favIds.length === 0) {
        msg.innerHTML = `
            <div class="alert alert-info text-center">
                Aún no tienes GPUs en favoritos.
                <br>
                <a href="gpus.html" class="btn btn-secondary mt-3">Ver catálogo</a>
            </div>
        `;
        return;
    }

    // Mostrar cada GPU favorita
    favIds.forEach(id => {
        const gpu = getGpuById(id);
        if (!gpu) return;

        const card = document.createElement("div");
        card.className = "col-md-4";

        card.innerHTML = `
            <div class="card shadow-sm h-100">
                <img src="${gpu.image}" class="card-img-top" alt="${gpu.name}">
                <div class="card-body">
                    <h5 class="fw-bold">${gpu.name}</h5>
                    <p class="text-muted small mb-2">${gpu.vram}</p>
                    <p class="text-muted small mb-3">Precio aprox: ${gpu.price}€</p>

                    <a href="gpu.html?id=${gpu.id}" class="btn btn-outline-primary w-100 mb-2">
                        Ver detalles
                    </a>

                    <button class="btn btn-danger w-100 remove-fav" data-id="${gpu.id}">
                        Quitar de favoritos
                    </button>
                </div>
            </div>
        `;

        list.appendChild(card);
    });

    // Manejar eliminación de favoritos
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-fav")) {
            const id = Number(e.target.dataset.id);

            let favs = getUserFavorites(user);
            favs = favs.filter(f => f !== id);

            saveUserFavorites(user, favs);

            // Recargar la página para actualizar la lista
            location.reload();
        }
    });
});
