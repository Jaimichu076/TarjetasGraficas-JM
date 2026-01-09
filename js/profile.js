// profile.js — Gestión del perfil del usuario

document.addEventListener("DOMContentLoaded", () => {
    const user = getCurrentUserData();
    const msg = document.getElementById("profileMessage");

    // Si no hay usuario logueado → redirigir
    if (!user) {
        msg.innerHTML = `<span class="text-danger">Debes iniciar sesión para ver tu perfil.</span>`;
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1200);
        return;
    }

    // Rellenar campos con los datos actuales
    document.getElementById("profileName").value = user.name;
    document.getElementById("profileEmail").value = user.email;
    document.getElementById("profileTheme").value = user.theme || "dark";

    // GUARDAR CAMBIOS
    document.getElementById("saveProfileBtn").addEventListener("click", () => {
        const newName = document.getElementById("profileName").value.trim();
        const newEmail = document.getElementById("profileEmail").value.trim();
        const newPassword = document.getElementById("profilePassword").value.trim();
        const newTheme = document.getElementById("profileTheme").value;

        if (!newName || !newEmail) {
            msg.innerHTML = `<span class="text-danger">El nombre y el email no pueden estar vacíos.</span>`;
            return;
        }

        // Actualizar datos
        const updatedData = {
            name: newName,
            email: newEmail,
            theme: newTheme
        };

        // Si el usuario ha escrito una nueva contraseña
        if (newPassword.length > 0) {
            updatedData.password = newPassword;
        }

        updateCurrentUserData(updatedData);

        msg.innerHTML = `<span class="text-success">Cambios guardados correctamente.</span>`;

        // Si cambia el email, actualizar sesión
        if (newEmail !== user.email) {
            setCurrentUser(newEmail);
        }

        // Limpiar campo contraseña
        document.getElementById("profilePassword").value = "";
    });

    // CERRAR SESIÓN
    document.getElementById("logoutBtn").addEventListener("click", () => {
        logout();
    });
});
