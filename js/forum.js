// js/forum.js — Foro con imágenes y avatares

import { auth, db, storage } from "./firebase.js";
import { onUserChange } from "./auth.js";
import {
    ref,
    push,
    set,
    onValue,
    get
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
import {
    ref as storageRef,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

document.addEventListener("DOMContentLoaded", () => {
    const newThreadForm = document.getElementById("newThreadForm");
    const threadsList = document.getElementById("threadsList");
    const threadMessage = document.getElementById("threadMessage");

    let currentUser = null;

    onUserChange((user) => currentUser = user);

    function mostrarError(text) {
        threadMessage.textContent = text;
        threadMessage.style.display = "block";
    }

    function limpiarError() {
        threadMessage.style.display = "none";
        threadMessage.textContent = "";
    }

    function formatDate(ts) {
        return new Date(ts).toLocaleString("es-ES", {
            dateStyle: "short",
            timeStyle: "short"
        });
    }

    // Crear hilo
    newThreadForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        limpiarError();

        if (!currentUser) {
            mostrarError("Debes iniciar sesión.");
            return;
        }

        const title = document.getElementById("threadTitle").value.trim();
        const content = document.getElementById("threadContent").value.trim();
        const file = document.getElementById("threadImage").files[0];

        if (!title || !content) {
            mostrarError("Completa todos los campos.");
            return;
        }

        // Validación de imagen
        let imageUrl = null;

        if (file) {
            const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];
            if (!validTypes.includes(file.type)) {
                mostrarError("Formato no válido. Usa PNG, JPG, WEBP o GIF.");
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                mostrarError("La imagen supera los 10MB.");
                return;
            }
        }

        try {
            const userSnap = await get(ref(db, "usuarios/" + currentUser.uid));
            const userData = userSnap.val() || {};

            const newRef = push(ref(db, "hilos"));
            const newKey = newRef.key;

            if (file) {
                const path = `foro/hilos/${newKey}-${file.name}`;
                const fileRef = storageRef(storage, path);
                await uploadBytes(fileRef, file);
                imageUrl = await getDownloadURL(fileRef);
            }

            await set(newRef, {
                title,
                content,
                imageUrl,
                authorUid: currentUser.uid,
                authorEmail: currentUser.email,
                authorName: userData.nombre || null,
                authorAvatar: userData.avatar || "img/default-avatar.png",
                createdAt: Date.now()
            });

            newThreadForm.reset();
        } catch (err) {
            console.error(err);
            mostrarError("Error al publicar el hilo.");
        }
    });

    // Mostrar hilos
    onValue(ref(db, "hilos"), (snap) => {
        const data = snap.val();
        renderThreads(data);
    });

    function renderThreads(hilos) {
        threadsList.innerHTML = "";

        if (!hilos) {
            threadsList.innerHTML = `
                <div class="card p-4 text-center">
                    <h2>No hay hilos aún</h2>
                </div>`;
            return;
        }

        const entries = Object.entries(hilos).sort((a, b) => b[1].createdAt - a[1].createdAt);

        entries.forEach(([id, thread]) => {
            const div = document.createElement("div");
            div.className = "card p-4";

            div.innerHTML = `
                <h3>${thread.title}</h3>
                <p class="gpu-meta">${thread.content}</p>

                ${thread.imageUrl ? `
                    <img src="${thread.imageUrl}" class="forum-thread-image" />
                ` : ""}

                <div class="forum-author mt-3">
                    <img src="${thread.authorAvatar}" class="forum-avatar" />
                    <div>
                        <strong>${thread.authorName || thread.authorEmail}</strong><br>
                        <span class="text-muted-custom">${formatDate(thread.createdAt)}</span>
                    </div>
                </div>

                <hr>

                <h4>Respuestas</h4>
                <div id="replies-${id}" class="d-flex flex-column gap-2 mb-3"></div>

                <form class="replyForm" data-thread-id="${id}">
                    <textarea class="form-control mb-2" rows="2" required></textarea>
                    <button class="btn btn-secondary btn-sm">Responder</button>
                </form>
            `;

            threadsList.appendChild(div);
            listenToReplies(id);
        });

        activarFormulariosRespuesta();
    }

    function listenToReplies(threadId) {
        const container = document.getElementById(`replies-${threadId}`);

        onValue(ref(db, `hilos/${threadId}/replies`), (snap) => {
            const replies = snap.val();
            container.innerHTML = "";

            if (!replies) {
                container.innerHTML = `<p class="text-muted-custom">No hay respuestas.</p>`;
                return;
            }

            Object.values(replies).forEach((r) => {
                const div = document.createElement("div");
                div.className = "card p-2";
                div.innerHTML = `
                    <p>${r.content}</p>
                    <p class="text-muted-custom" style="font-size: 0.75rem;">
                        ${r.authorEmail} · ${formatDate(r.createdAt)}
                    </p>
                `;
                container.appendChild(div);
            });
        });
    }

    function activarFormulariosRespuesta() {
        document.querySelectorAll(".replyForm").forEach((form) => {
            form.addEventListener("submit", async (e) => {
                e.preventDefault();

                if (!currentUser) {
                    alert("Debes iniciar sesión.");
                    return;
                }

                const threadId = form.dataset.threadId;
                const content = form.querySelector("textarea").value.trim();

                if (!content) return;

                await push(ref(db, `hilos/${threadId}/replies`), {
                    content,
                    authorUid: currentUser.uid,
                    authorEmail: currentUser.email,
                    createdAt: Date.now()
                });

                form.querySelector("textarea").value = "";
            });
        });
    }
});




