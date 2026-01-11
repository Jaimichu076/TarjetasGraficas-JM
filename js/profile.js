// js/profile.js — Perfil con avatar personalizable

import { auth, db, storage } from "./firebase.js";
import { onUserChange } from "./auth.js";
import {
    ref as dbRef,
    get,
    update
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import {
    ref as storageRef,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

document.addEventListener("DOMContentLoaded", () => {
    const usernameEl = document.getElementById("profileUsername");
    const emailEl = document.getElementById("profileEmail");
    const avatarImg = document.getElementById("profileAvatarImg");
    const avatarForm = document.getElementById("avatarForm");
    const avatarInput = document.getElementById("avatarInput");
    const avatarMessage = document.getElementById("avatarMessage");

    function showAvatarMessage(text, isError = true) {
        avatarMessage.textContent = text;
        avatarMessage.style.display = text ? "block" : "none";
        avatarMessage.className = isError ? "text-error mt-2" : "text-success-custom mt-2";
    }

    onUserChange(async (user) => {
        if (!user) {
            usernameEl.textContent = "Debes iniciar sesión para ver tu perfil.";
            setTimeout(() => window.location.href = "login.html", 1200);
            return;
        }

        emailEl.textContent = user.email;

        const snap = await get(dbRef(db, "usuarios/" + user.uid));
        const data = snap.val();

        usernameEl.textContent = data?.nombre || "(Sin nombre)";
        avatarImg.src = data?.avatar || "img/default-avatar.png";
    });

    avatarForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        showAvatarMessage("");

        const user = auth.currentUser;
        if (!user) {
            showAvatarMessage("Debes iniciar sesión.");
            return;
        }

        const file = avatarInput.files[0];
        if (!file) {
            showAvatarMessage("Selecciona una imagen.");
            return;
        }

        // Validación de tipo
        const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];
        if (!validTypes.includes(file.type)) {
            showAvatarMessage("Formato no válido. Usa PNG, JPG, WEBP o GIF.");
            return;
        }

        // Límite 10MB
        if (file.size > 10 * 1024 * 1024) {
            showAvatarMessage("La imagen supera los 10MB.");
            return;
        }

        try {
            const path = `usuarios/${user.uid}/avatar-${Date.now()}`;
            const fileRef = storageRef(storage, path);

            await uploadBytes(fileRef, file);
            const url = await getDownloadURL(fileRef);

            await update(dbRef(db, "usuarios/" + user.uid), { avatar: url });

            avatarImg.src = url;
            showAvatarMessage("Foto actualizada correctamente.", false);
        } catch (err) {
            console.error(err);
            showAvatarMessage("Error al subir la imagen.");
        }
    });
});



