// auth.js — Sistema de autenticación local para GPU Hub
// Gestiona registro, login, logout y sesión usando localStorage.
// No hay backend: todo es 100% local y privado en el navegador.

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    //   UTILIDADES GENERALES
    // ============================

    function getUsers() {
        const stored = localStorage.getItem("users");
        if (!stored) return [];
        try {
            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    function saveUsers(users) {
        localStorage.setItem("users", JSON.stringify(users));
    }

    function setSession(username) {
        localStorage.setItem("sessionUser", username);
    }

    function clearSession() {
        localStorage.removeItem("sessionUser");
    }

    function getSessionUser() {
        return localStorage.getItem("sessionUser");
    }

    // ============================
    //   LOGIN
    // ============================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const message = document.getElementById("loginMessage");

            const users = getUsers();
            const user = users.find(u => u.username === username);

            if (!user) {
                message.textContent = "El usuario no existe.";
                message.style.display = "block";
                return;
            }

            if (user.password !== password) {
                message.textContent = "Contraseña incorrecta.";
                message.style.display = "block";
                return;
            }

            // Login correcto
            setSession(username);
            window.location.href = "profile.html";
        });
    }

    // ============================
    //   REGISTRO
    // ============================

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("regUsername").value.trim();
            const email = document.getElementById("regEmail").value.trim();
            const password = document.getElementById("regPassword").value.trim();
            const message = document.getElementById("registerMessage");

            const users = getUsers();

            if (users.some(u => u.username === username)) {
                message.textContent = "Ese nombre de usuario ya está registrado.";
                message.style.display = "block";
                return;
            }

            if (users.some(u => u.email === email)) {
                message.textContent = "Ese correo ya está registrado.";
                message.style.display = "block";
                return;
            }

            const newUser = {
                username,
                email,
                password,
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            saveUsers(users);

            setSession(username);

            window.location.href = "profile.html";
        });
    }

    // ============================
    //   PERFIL (CARGAR DATOS)
    // ============================

    const profileUsername = document.getElementById("profileUsername");
    const profileEmail = document.getElementById("profileEmail");
    const logoutBtn = document.getElementById("logoutBtn");

    if (profileUsername && profileEmail) {
        const sessionUser = getSessionUser();

        if (!sessionUser) {
            window.location.href = "login.html";
            return;
        }

        const users = getUsers();
        const user = users.find(u => u.username === sessionUser);

        if (!user) {
            clearSession();
            window.location.href = "login.html";
            return;
        }

        profileUsername.textContent = user.username;
        profileEmail.textContent = user.email;
    }

    // ============================
    //   LOGOUT
    // ============================

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            clearSession();
            window.location.href = "login.html";
        });
    }

});

