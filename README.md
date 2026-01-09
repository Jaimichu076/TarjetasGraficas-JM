GPU Hub
GPU Hub es una aplicación web front‑end que permite explorar, comparar y gestionar información sobre tarjetas gráficas. Incluye catálogo, buscador avanzado, comparador, sistema de favoritos, foro local y un pequeño sistema de usuarios. Todo funciona sin backend, utilizando únicamente localStorage.

El proyecto está construido con HTML, CSS, JavaScript y Bootstrap, y utiliza un estilo visual inspirado en un tema “Matrix claro”.

✨ Características principales
Catálogo de GPUs con muchos modelos reales.

Buscador dinámico por nombre, VRAM, consumo, precio, etc.

Ficha individual de cada GPU.

Sistema de favoritos (añadir, quitar, ver detalles).

Comparador de GPUs con tabla detallada.

Foro local con hilos y respuestas.

Sistema de usuarios (registro, login, perfil).

Persistencia local mediante localStorage.

Interfaz responsive con Bootstrap.

Fondo animado estilo Matrix.

🗂️ Estructura del proyecto
Código
/css
   styles.css

/js
   data.js
   gpus.js
   gpu.js
   compare.js
   favorites.js
   search.js
   forum.js
   auth.js
   login.js
   register.js
   profile.js
   matrix.js

/img
   /gpus
      (imágenes de las GPUs)

index.html
gpus.html
gpu.html
compare.html
favorites.html
forum.html
profile.html
login.html
register.html
📦 Tecnologías utilizadas
HTML5

CSS3 + Bootstrap 5

JavaScript (ES6)

localStorage

Sin frameworks ni backend

🔧 Funcionamiento general
Datos
Toda la información de las GPUs está en data.js, organizada en un array de objetos.

Catálogo
gpus.js se encarga de renderizar las tarjetas y escuchar los eventos del buscador (search.js).

Ficha individual
gpu.js carga los datos según el parámetro id en la URL.

Favoritos
favorites.js gestiona la lista guardada en localStorage.

Comparador
compare.js muestra una tabla comparativa con las GPUs seleccionadas.

Foro
forum.js permite crear hilos y respuestas, también guardados en localStorage.

Usuarios
auth.js, login.js, register.js y profile.js manejan el registro, login y perfil del usuario.

Estilo
styles.css define el tema Matrix claro y personaliza Bootstrap.

Fondo animado
matrix.js genera el efecto visual del fondo.

🚀 Cómo usarlo
Descarga o clona el repositorio.

Abre index.html en tu navegador.

Navega por el catálogo, añade GPUs a favoritos o al comparador.

Regístrate para acceder al perfil y al foro.

Todo se guarda automáticamente en tu navegador.

No requiere instalación ni servidor.

📌 Objetivo del proyecto
El propósito de GPU Hub es demostrar cómo se puede construir una aplicación web completa utilizando únicamente tecnologías front‑end, sin frameworks ni backend. Es ideal para aprender:

Organización modular de JavaScript

Uso de localStorage

Renderizado dinámico de contenido

Manejo de eventos

Diseño responsive

Estructuración de un proyecto web real

📄 Licencia
Este proyecto está distribuido bajo la Licencia MIT.
Puedes consultar el texto completo aquí:

👉 

