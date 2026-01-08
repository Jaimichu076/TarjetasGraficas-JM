// auth.js — Sistema de autenticación simple con localStorage

// Obtener usuarios guardados
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Guardar usuarios
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Guardar usuario actual
function setCurrentUser(email) {
    localStorage.setItem("currentUser", email);
}

// Obtener usuario actual
function getCurrentUser() {
    return localStorage.getItem("currentUser");
}

// Cerrar sesión
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// REGISTRO
function registerUser(name, email, password) {
    let users = getUsers();

    // Comprobar si ya existe
    if (users.some(u => u.email === email)) {
        return { success: false, message: "Este email ya está registrado" };
    }

    // Crear usuario
    const newUser = {
        name,
        email,
        password, // En un proyecto real se encriptaría
        theme: "dark" // Tema por defecto
    };

    users.push(newUser);
    saveUsers(users);

    return { success: true, message: "Usuario registrado correctamente" };
}

// LOGIN
function loginUser(email, password) {
    const users = getUsers();

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return { success: false, message: "Email o contraseña incorrectos" };
    }

    setCurrentUser(email);
    return { success: true, message: "Inicio de sesión correcto" };
}

// Obtener datos del usuario actual
function getCurrentUserData() {
    const email = getCurrentUser();
    if (!email) return null;

    const users = getUsers();
    return users.find(u => u.email === email) || null;
}

// Actualizar datos del usuario actual
function updateCurrentUserData(newData) {
    const email = getCurrentUser();
    if (!email) return;

    let users = getUsers();
    let user = users.find(u => u.email === email);

    if (!user) return;

    // Actualizar campos
    Object.assign(user, newData);

    saveUsers(users);
}

