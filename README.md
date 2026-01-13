TarjetasGraficas-JM
Este proyecto es una página web que sirve para aprender y ver información sobre tarjetas gráficas. Puedes buscar modelos, compararlos, ver cuáles son mejores, guardar tus favoritos y hasta escribir en un pequeño foro.
Todo funciona con archivos HTML, CSS y JavaScript, que son los lenguajes básicos de las páginas web.

Estructura del proyecto
A continuación se explica para qué sirve cada carpeta y archivo importante.
La carpeta X no se incluye.

Carpeta css/
Aquí están los archivos que dicen cómo se ve la página.
Los HTML son como el esqueleto, y los CSS son como la ropa y los colores.

Dentro de esta carpeta se decide:

qué tamaño tienen los textos

qué colores usa la web

cómo se colocan las cosas en la pantalla

cómo se ve cada página (por ejemplo, el ranking o el comparador)

Sin estos archivos, la web se vería en blanco y negro y muy desordenada.

Carpeta img/
Aquí se guardan todas las imágenes que usa la web.
Por ejemplo:

fotos de tarjetas gráficas

iconos

fondos

logotipos

Los archivos HTML y JavaScript buscan estas imágenes aquí para mostrarlas en pantalla.

Carpeta js/
Esta es la carpeta más importante.
Aquí están los archivos que hacen que la web funcione de verdad.
Los HTML muestran cosas, pero los JavaScript deciden qué pasa cuando haces clic, buscas algo o entras en una página.

A continuación se explica cada archivo de forma sencilla:

auth.js
Controla el inicio de sesión.
Comprueba si el usuario existe, si la contraseña es correcta y si debe entrar o salir de su cuenta.

compare.js
Permite comparar dos tarjetas gráficas.
Busca los datos de cada una y los coloca juntos para ver cuál es mejor.

data.js
Guarda o carga la información de todas las tarjetas gráficas.
Es como una “base de datos” simple dentro del proyecto.

favorites.js
Guarda las tarjetas que el usuario marca como favoritas.
Usa el almacenamiento del navegador para recordar tus elecciones aunque cierres la página.

firebase.js
Contiene la configuración necesaria para conectar la web con Firebase si se usa.
Sirve para cosas como guardar datos o manejar usuarios.

forum.js
Hace que el foro funcione.
Permite crear mensajes, leerlos y mostrarlos en pantalla.

gpu.js
Muestra la información de una tarjeta gráfica concreta.
Cuando entras en una GPU, este archivo decide qué datos enseñar.

gpus.js
Crea la lista de todas las tarjetas gráficas.
También puede ordenar o filtrar si es necesario.

matrix.js
Genera el efecto visual del fondo con letras cayendo, parecido a la película Matrix.
Dibuja caracteres en movimiento usando un lienzo.

profile.js
Muestra la información del usuario en su perfil.
También permite cambiar algunos datos.

ranking.js
Ordena las tarjetas gráficas según su potencia.
Crea una lista desde la mejor hasta la peor.

search.js
Hace que la barra de búsqueda funcione.
Filtra las tarjetas según lo que escribas.

Archivos HTML principales
Los archivos HTML son las páginas que ves cuando navegas por la web.
Cada uno muestra una parte distinta del proyecto.

index.html: página principal.

gpus.html: lista de todas las tarjetas gráficas.

gpu.html: ficha de una tarjeta concreta.

compare.html: comparador de dos tarjetas.

favorites.html: tarjetas guardadas por el usuario.

ranking.html: ranking de rendimiento.

forum.html: foro de mensajes.

login.html: página para iniciar sesión.

register.html: página para registrarse.

profile.html: perfil del usuario.

Otros archivos
firebase.json: archivo que le dice a Firebase cómo debe mostrar la web.

LICENSE: licencia del proyecto.

README.md: este documento.

Objetivo del proyecto
El objetivo es crear una web clara y fácil de usar donde cualquier persona pueda:

ver información de tarjetas gráficas

compararlas

guardarlas como favoritas

consultar un ranking

escribir en un foro

tener un perfil

Todo está organizado para que sea sencillo de entender y fácil de ampliar en el futuro.