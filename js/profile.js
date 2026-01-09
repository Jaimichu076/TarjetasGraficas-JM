// js/profile.js - Perfil de usuario con Firebase

import { auth, db } from "./firebase.js";
import { onUserChange } from "./auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

document.addEventListener("DOMContentLoaded", () => {
  const usernameEl = document.getElementById("profileUsername");
  const emailEl = document.getElementById("profileEmail");

  onUserChange(async (user) => {
    if (!user) {
      if (usernameEl)
        usernameEl.textContent = "Debes iniciar sesión para ver tu perfil.";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1200);
      return;
    }

    // Email directo del auth
    if (emailEl) emailEl.textContent = user.email || "(Sin email)";

    try {
      const snap = await get(ref(db, "usuarios/" + user.uid));
      const data = snap.val();

      if (data && usernameEl) {
        usernameEl.textContent = data.nombre || "(Sin nombre)";
      } else if (usernameEl) {
        usernameEl.textContent = "(Sin datos de perfil)";
      }
    } catch (err) {
      console.error(err);
      if (usernameEl) usernameEl.textContent = "Error cargando perfil";
    }
  });
});

