// forum.js — Sistema de foro simple con localStorage

document.addEventListener("DOMContentLoaded", () => {

    const forumMessage = document.getElementById("forumMessage");
    const threadsList = document.getElementById("threadsList");
    const threadDetail = document.getElementById("threadDetail");
    const threadEmptyMessage = document.getElementById("threadEmptyMessage");
    const threadDetailTitle = document.getElementById("threadDetailTitle");
    const threadDetailMeta = document.getElementById("threadDetailMeta");
    const threadDetailContent = document.getElementById("threadDetailContent");
    const threadReplies = document.getElementById("threadReplies");

    const createThreadBtn = document.getElementById("createThreadBtn");
    const addReplyBtn = document.getElementById("addReplyBtn");

    let selectedThreadId = null;

    // ============================
    //   LOCALSTORAGE HELPERS
    // ============================

    function getThreads() {
        return JSON.parse(localStorage.getItem("forumThreads")) || [];
    }

    function saveThreads(threads) {
        localStorage.setItem("forumThreads", JSON.stringify(threads));
    }

    // ============================
    //   CREAR NUEVO HILO
    // ============================

    createThreadBtn.addEventListener("click", () => {
        const title = document.getElementById("threadTitle").value.trim();
        const content = document.getElementById("threadContent").value.trim();

        if (!title || !content) {
            forumMessage.innerHTML = `<span class="text-danger">Rellena todos los campos para crear un hilo.</span>`;
            return;
        }

        const user = getCurrentUserData();
        const author = user ? user.name : "Anónimo";

        const newThread = {
            id: Date.now().toString(),
            title,
            content,
            author,
            date: new Date().toLocaleString(),
            replies: []
        };

        const threads = getThreads();
        threads.unshift(newThread); // Añadir arriba
        saveThreads(threads);

        forumMessage.innerHTML = `<span class="text-success">Hilo creado correctamente.</span>`;

        // Limpiar campos
        document.getElementById("threadTitle").value = "";
        document.getElementById("threadContent").value = "";

        renderThreadsList();
    });

    // ============================
    //   LISTA DE HILOS
    // ============================

    function renderThreadsList() {
        const threads = getThreads();

        if (threads.length === 0) {
            threadsList.innerHTML = `<p class="text-muted">No hay hilos todavía. ¡Crea el primero!</p>`;
            return;
        }

        let html = `<ul class="list-group">`;

        threads.forEach(thread => {
            html += `
                <li 
                    class="list-group-item list-group-item-action"
                    style="cursor:pointer;"
                    onclick="selectThread('${thread.id}')"
                >
                    <strong>${thread.title}</strong><br>
                    <small class="text-muted">por ${thread.author} — ${thread.date}</small>
                </li>
            `;
        });

        html += `</ul>`;

        threadsList.innerHTML = html;
    }

    // Hacer accesible desde HTML
    window.selectThread = function(id) {
        selectedThreadId = id;
        renderThreadDetail();
    };

    // ============================
    //   DETALLE DEL HILO
    // ============================

    function renderThreadDetail() {
        const threads = getThreads();
        const thread = threads.find(t => t.id === selectedThreadId);

        if (!thread) return;

        threadEmptyMessage.classList.add("d-none");
        threadDetail.classList.remove("d-none");

        threadDetailTitle.textContent = thread.title;
        threadDetailMeta.textContent = `por ${thread.author} — ${thread.date}`;
        threadDetailContent.textContent = thread.content;

        renderReplies(thread);
    }

    // ============================
    //   RESPUESTAS
    // ============================

    function renderReplies(thread) {
        if (thread.replies.length === 0) {
            threadReplies.innerHTML = `<p class="text-muted">No hay respuestas todavía.</p>`;
            return;
        }

        let html = "";

        thread.replies.forEach(reply => {
            html += `
                <div class="border rounded p-2 mb-2">
                    <p class="mb-1">${reply.content}</p>
                    <small class="text-muted">por ${reply.author} — ${reply.date}</small>
                </div>
            `;
        });

        threadReplies.innerHTML = html;
    }

    // Añadir respuesta
    addReplyBtn.addEventListener("click", () => {
        if (!selectedThreadId) return;

        const replyContent = document.getElementById("replyContent").value.trim();
        if (!replyContent) return;

        const user = getCurrentUserData();
        const author = user ? user.name : "Anónimo";

        const threads = getThreads();
        const thread = threads.find(t => t.id === selectedThreadId);

        thread.replies.push({
            content: replyContent,
            author,
            date: new Date().toLocaleString()
        });

        saveThreads(threads);

        document.getElementById("replyContent").value = "";

        renderThreadDetail();
    });

    // ============================
    //   INICIALIZAR
    // ============================

    renderThreadsList();
});
