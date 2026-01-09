GPU Hub

GPU Hub es una aplicación web front‑end que permite explorar, comparar y gestionar información sobre tarjetas gráficas. Incluye catálogo, buscador avanzado, comparador, sistema de favoritos, foro local y un pequeño sistema de usuarios. Todo funciona únicamente con tecnologías del lado del cliente y utiliza localStorage para almacenar datos.

El proyecto está construido con HTML, CSS, JavaScript y Bootstrap, y utiliza un estilo visual inspirado en un tema “Matrix claro”.

✨ Características principales
Catálogo de GPUs con más de 40 modelos reales.

Buscador dinámico por nombre, VRAM, consumo, precio y más.

Ficha individual con detalles completos de cada GPU.

Sistema de favoritos con persistencia local.

Comparador de GPUs con tabla detallada.

Foro local con hilos y respuestas almacenados en localStorage.

Sistema de usuarios (registro, inicio de sesión y perfil).

Interfaz responsive basada en Bootstrap.

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
🧩 Descripción de los módulos
data.js
Contiene la base de datos local con todas las GPUs y sus especificaciones.

gpus.js
Renderiza el catálogo, gestiona el buscador y permite añadir GPUs a favoritos o al comparador.

gpu.js
Controla la ficha individual de cada GPU según el parámetro id de la URL.

compare.js
Genera la tabla comparativa y permite eliminar GPUs o limpiar la lista.

favorites.js
Gestiona la lista de GPUs favoritas almacenadas en localStorage.

search.js
Filtra dinámicamente las GPUs según el texto introducido en el buscador.

forum.js
Implementa un foro básico con hilos y respuestas guardados localmente.

auth.js
Sistema de autenticación local: registro, inicio de sesión y cierre de sesión.

login.js / register.js / profile.js
Controlan las páginas de login, registro y perfil del usuario.

matrix.js
Genera el fondo animado estilo Matrix.

styles.css
Define el estilo general del proyecto, incluyendo el tema Matrix claro.

🚀 Cómo ejecutar el proyecto
Descarga o clona el repositorio.

Abre index.html en tu navegador.

Navega por las distintas secciones:

Catálogo de GPUs

Comparador

Favoritos

Foro

Perfil de usuario

Todos los datos se guardan automáticamente en localStorage.

No requiere instalación ni servidor.

🎯 Objetivo del proyecto
El propósito de GPU Hub es demostrar cómo se puede construir una aplicación web completa utilizando únicamente tecnologías front‑end, sin frameworks ni backend. Es útil para aprender:

Organización modular de JavaScript

Uso de localStorage como persistencia

Renderizado dinámico de contenido

Manejo de eventos

Diseño responsive con Bootstrap

Estructuración de un proyecto web real

📄 Licencia
Este proyecto está distribuido bajo la Licencia MIT.
