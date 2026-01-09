// js/auth.js

import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {
  ref,
  set
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

/**
 * REGISTRO
 * Formulario: register.html
 * IDs:
 *  - regUsername
 *  - regEmail
 *  - regPassword
 *  - registerMessage (opcional para mostrar errores)
 */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById("regUsername");
    const emailInput = document.getElementById("regEmail");
    const passwordInput = document.getElementById("regPassword");
    const messageBox = document.getElementById("registerMessage");

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (messageBox) {
      messageBox.style.display = "none";
      messageBox.textContent = "";
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      // Guardar datos extra del usuario en Realtime Database
      await set(ref(db, "usuarios/" + user.uid), {
        nombre: username,
        email: user.email,
        avatar: "img/default-avatar.png",
        fechaRegistro: Date.now()
      });

      alert("Cuenta creada correctamente");
      window.location.href = "login.html";
    } catch (err) {
      console.error(err);
      if (messageBox) {
        messageBox.textContent = err.message;
        messageBox.style.display = "block";
      } else {
        alert("Error: " + err.message);
      }
    }
  });
}

/**
 * LOGIN
 * Formulario: login.html
 * IDs:
 *  - loginForm
 *  - loginEmail
 *  - loginPassword
 *  - loginMessage (opcional)
 */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const messageBox = document.getElementById("loginMessage");

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (messageBox) {
      messageBox.style.display = "none";
      messageBox.textContent = "";
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Sesión iniciada");
      window.location.href = "forum.html";
    } catch (err) {
      console.error(err);
      if (messageBox) {
        messageBox.textContent = err.message;
        messageBox.style.display = "block";
      } else {
        alert("Error: " + err.message);
      }
    }
  });
}

/**
 * LOGOUT
 * Cualquier página con un botón:
 *   <button id="logoutBtn">Cerrar sesión</button>
 */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
  });
}

/**
 * Observador de cambios de usuario, reutilizable en otros módulos
 */

export function onUserChange(callback) {
  onAuthStateChanged(auth, callback);
}

