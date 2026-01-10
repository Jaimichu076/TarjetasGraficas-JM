GPU Hub — TarjetasGraficas-JM

🧠 Descripción general

Este proyecto es un panel técnico para explorar, comparar y gestionar información sobre tarjetas gráficas (GPUs). Está pensado para gente que disfruta el hardware, gamers que buscan lo mejor y creadores que quieren tener todo bajo control sin depender de servidores externos.

Al principio todo funcionaba solo en el navegador, pero ahora usamos Firebase para que todo sea en tiempo real, con usuarios que pueden registrarse, tener perfiles y un foro para charlar.

⚙️ Tecnologías usadas

HTML, CSS, JS — la base del proyecto

Bootstrap 5.3 — para que se vea bien en cualquier pantalla

Firebase Realtime Database — guarda usuarios, hilos y respuestas

Firebase Authentication — para registro, login y mantener la sesión

LocalStorage — guarda favoritos y datos locales

Matrix.js — fondo animado estilo hacker

🧩 Cómo está organizado el proyecto

📁 css/
    styles.css
📁 img/
    gpus/
📁 js/
    auth.js
    compare.js
    data.js
    favourites.js
    firebase.js
    forum.js
    gpu.js
    gpus.js
    matrix.js
    profile.js
    ranking.js
    search.js
📄 index.html
📄 login.html
📄 register.html
📄 profile.html
📄 forum.html
📄 gpus.html
📄 compare.html
📄 favorites.html
📄 ranking.html
📄 gpu.html
📄 README.md

🔐 Sistema de usuarios

Los usuarios pueden registrarse y entrar con Firebase Authentication

Al registrarse, se guarda su nombre, email y fecha en usuarios/{uid}

En el perfil se ven los datos del usuario y se puede cerrar sesión

La sesión se mantiene aunque cambies de página

Archivos importantes:

auth.js — registro, login, logout y control de sesión

profile.js — muestra nombre y email del usuario

💬 Foro técnico

Los temas se guardan en hilos/ con título, contenido, autor y fecha

Las respuestas se guardan en hilos/{id}/replies

Todo se actualiza en tiempo real con onValue()

Solo los usuarios registrados pueden publicar o responder

Archivos importantes:

forum.js — toda la lógica del foro con Firebase

forum.html — formulario, lista de temas y respuestas

📊 Catálogo de GPUs

Los datos están en data.js (local)

Puedes explorar, comparar y marcar favoritos

Los favoritos se guardan en localStorage

Archivos importantes:

gpus.js, gpu.js, compare.js, favourites.js

gpus.html, gpu.html, compare.html, favorites.html

🎨 Estilo y experiencia

Fondo animado tipo Matrix (matrix.js) con velocidad ajustable

Diseño oscuro y técnico, con letra monoespaciada

Animaciones suaves y estructura modular

🔒 Reglas de seguridad en Firebase

{
  "rules": {
    ".read": true,
    "hilos": {
      ".write": "auth != null"
    },
    "usuarios": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    }
  }
}

🧪 Pruebas hechas

Registro y login funcionan sin problemas

Crear y leer temas en tiempo real

Respuestas sincronizadas entre usuarios

Ver perfil con datos reales

Mantener sesión entre páginas

Catálogo y favoritos funcionan localmente

🧑‍💻 Cómo se hizo

Todo el código está escrito a mano, con ayuda de documentación oficial y pruebas locales. La IA solo se usó para revisar y mejorar un poco. El diseño, la lógica y la integración con Firebase los hice yo.

📌 Créditos y licencia

Este proyecto es para aprender y uso personal. Los datos de GPUs son ficticios o hechos a mano. El código tiene licencia MIT.
