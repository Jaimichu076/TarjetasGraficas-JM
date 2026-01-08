// auth.js
// Sistema de registro, login y sesión usando localStorage

// Guardar usuario
function saveUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Comprobar si ya existe
    if (users.find(u => u.email === email)) {
        return false;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
}

// Iniciar sesión
function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return false;
    }

    // Guardar sesión
    localStorage.setItem("session", email);
    return true;
}

// Cerrar sesión
function logoutUser() {
    localStorage.removeItem("session");
}

// Obtener usuario actual
function getCurrentUser() {
    return localStorage.getItem("session");
}

// ---------------------------
// MANEJO DEL FORMULARIO LOGIN
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {

    // LOGIN
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value.trim();
            const msg = document.getElementById("login-msg");

            if (loginUser(email, password)) {
                msg.innerHTML = `
                    <div class="alert alert-success">Inicio de sesión correcto</div>
                `;
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1000);
            } else {
                msg.innerHTML = `
                    <div class="alert alert-danger">Correo o contraseña incorrectos</div>
                `;
            }
        });
    }

    // REGISTRO
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("reg-email").value.trim();
            const pass1 = document.getElementById("reg-password").value.trim();
            const pass2 = document.getElementById("reg-password2").value.trim();
            const msg = document.getElementById("register-msg");

            if (pass1 !== pass2) {
                msg.innerHTML = `
                    <div class="alert alert-danger">Las contraseñas no coinciden</div>
                `;
                return;
            }

            if (saveUser(email, pass1)) {
                msg.innerHTML = `
                    <div class="alert alert-success">Cuenta creada correctamente</div>
                `;
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1000);
            } else {
                msg.innerHTML = `
                    <div class="alert alert-danger">Este correo ya está registrado</div>
                `;
            }
        });
    }

});
