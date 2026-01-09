// js/auth.js

import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {
  ref,
  set
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

// REGISTRO
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("regUsername").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const messageBox = document.getElementById("registerMessage");

    messageBox.style.display = "none";
    messageBox.textContent = "";

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      await set(ref(db, "usuarios/" + user.uid), {
        nombre: username,
        email: user.email,
        avatar: "img/default-avatar.png",
        fechaRegistro: Date.now()
      });

      alert("Cuenta creada correctamente");
      window.location.href = "login.html";

    } catch (err) {
      messageBox.textContent = err.message;
      messageBox.style.display = "block";
    }
  });
}
