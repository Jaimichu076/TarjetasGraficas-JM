// forum.js — Foro técnico local para GPU Hub
// Gestiona hilos, respuestas y usuarios usando localStorage.
// No hay backend: todo es 100% local en el navegador.
import { auth, db } from "./firebase.js";
import {
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    //   UTILIDADES GENERALES
    // ============================

    
    function getSessionUser() {
        return localStorage.getItem("sessionUser");
    }

    function getThreads() {
        const stored = localStorage.getItem("threads");
        if (!stored) return [];
        try {
            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    function saveThreads(threads) {
        localStorage.setItem("threads", JSON.stringify(threads));
    }

    function formatDate(dateString) {
        const d = new Date(dateString);
        return d.toLocaleString("es-ES", {
            dateStyle: "short",
            timeStyle: "short"
        });
    }

    // ============================
    //   ELEMENTOS DEL DOM
    // ============================

    const newThreadForm = document.getElementById("newThreadForm");
    const threadsList = document.getElementById("threadsList");
    const threadMessage = document.getElementById("threadMessage");

    // ============================
    //   INICIALIZACIÓN
    // ============================

    function init() {
        renderThreads();
        configurarEventos();
    }

    // ============================
    //   EVENTOS
    // ============================

    function configurarEventos() {
        if (newThreadForm) {
            newThreadForm.addEventListener("submit", (e) => {
                e.preventDefault();
                crearNuevoHilo();
            });
        }
    }

    // ============================
    //   CREAR NUEVO HILO
    // ============================

    function crearNuevoHilo() {
        const user = getSessionUser();

        if (!user) {
            mostrarError("Debes iniciar sesión para publicar un hilo.");
            return;
        }

        const title = document.getElementById("threadTitle").value.trim();
        const content = document.getElementById("threadContent").value.trim();

        if (!title || !content) {
            mostrarError("Debes completar todos los campos.");
            return;
        }

        const threads = getThreads();

        const newThread = {
            id: crypto.randomUUID(),
            title,
            content,
            author: user,
            createdAt: new Date().toISOString(),
            replies: []
        };

        threads.unshift(newThread);
        saveThreads(threads);

        newThreadForm.reset();
        threadMessage.style.display = "none";

        renderThreads();
    }

    // ============================
    //   MOSTRAR HILOS
    // ============================

    function renderThreads() {
        threadsList.innerHTML = "";

        const threads = getThreads();

        if (threads.length === 0) {
            const empty = document.createElement("div");
            empty.className = "card p-4 text-center";
            empty.innerHTML = `
                <h2 class="mb-2">No hay hilos aún</h2>
                <p class="text-muted-custom mb-0">
                    Sé el primero en crear un hilo usando el formulario superior.
                </p>
            `;
            threadsList.appendChild(empty);
            return;
        }

        threads.forEach(thread => {
            const div = document.createElement("div");
            div.className = "card p-4";

            div.innerHTML = `
                <h3 class="mb-2">${thread.title}</h3>
                <p class="gpu-meta mb-3">${thread.content}</p>

                <p class="text-muted-custom mb-2" style="font-size: 0.85rem;">
                    Publicado por <strong>${thread.author}</strong> · ${formatDate(thread.createdAt)}
                </p>

                <hr />

                <h4 class="mb-2">Respuestas</h4>
                <div class="d-flex flex-column gap-2 mb-3" id="replies-${thread.id}">
                    ${renderRespuestas(thread.replies)}
                </div>

                <form class="replyForm" data-thread-id="${thread.id}">
                    <textarea 
                        class="form-control mb-2" 
                        rows="2" 
                        placeholder="Escribe una respuesta..."
                        required
                    ></textarea>
                    <button class="btn btn-secondary btn-sm">Responder</button>
                </form>
            `;

            threadsList.appendChild(div);
        });

        activarFormulariosRespuesta();
    }

    // ============================
    //   RENDERIZAR RESPUESTAS
    // ============================

    function renderRespuestas(replies) {
        if (!replies || replies.length === 0) {
            return `<p class="text-muted-custom mb-0">No hay respuestas aún.</p>`;
        }

        return replies.map(r => `
            <div class="card p-2">
                <p class="mb-1">${r.content}</p>
                <p class="text-muted-custom mb-0" style="font-size: 0.75rem;">
                    ${r.author} · ${formatDate(r.createdAt)}
                </p>
            </div>
        `).join("");
    }

    // ============================
    //   FORMULARIOS DE RESPUESTA
    // ============================

    function activarFormulariosRespuesta() {
        const forms = document.querySelectorAll(".replyForm");

        forms.forEach(form => {
            form.addEventListener("submit", (e) => {
                e.preventDefault();

                const user = getSessionUser();
                if (!user) {
                    alert("Debes iniciar sesión para responder.");
                    return;
                }

                const threadId = form.getAttribute("data-thread-id");
                const textarea = form.querySelector("textarea");
                const content = textarea.value.trim();

                if (!content) return;

                const threads = getThreads();
                const thread = threads.find(t => t.id === threadId);
                if (!thread) return;

                const reply = {
                    content,
                    author: user,
                    createdAt: new Date().toISOString()
                };

                thread.replies.push(reply);
                saveThreads(threads);

                textarea.value = "";

                renderThreads();
            });
        });
    }

    // ============================
    //   MENSAJES DE ERROR
    // ============================

    function mostrarError(texto) {
        threadMessage.textContent = texto;
        threadMessage.style.display = "block";
    }

    // ============================
    //   INICIO
    // ============================

    init();
});

