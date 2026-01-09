// js/forum.js - Foro técnico con Firebase

import { auth, db } from "./firebase.js";
import { onUserChange } from "./auth.js";
import {
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

document.addEventListener("DOMContentLoaded", () => {
  const newThreadForm = document.getElementById("newThreadForm");
  const threadsList = document.getElementById("threadsList");
  const threadMessage = document.getElementById("threadMessage");

  let currentUser = null;

  onUserChange((user) => {
    currentUser = user;
  });

  function mostrarError(texto) {
    if (!threadMessage) return;
    threadMessage.textContent = texto;
    threadMessage.style.display = "block";
  }

  function limpiarError() {
    if (!threadMessage) return;
    threadMessage.style.display = "none";
    threadMessage.textContent = "";
  }

  function formatDate(ts) {
    if (!ts) return "";
    const d = new Date(ts);
    return d.toLocaleString("es-ES", {
      dateStyle: "short",
      timeStyle: "short"
    });
  }

  // Crear nuevo hilo
  if (newThreadForm) {
    newThreadForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      limpiarError();

      if (!currentUser) {
        mostrarError("Debes iniciar sesión para publicar un hilo.");
        return;
      }

      const titleInput = document.getElementById("threadTitle");
      const contentInput = document.getElementById("threadContent");

      const title = titleInput.value.trim();
      const content = contentInput.value.trim();

      if (!title || !content) {
        mostrarError("Debes completar todos los campos.");
        return;
      }

      try {
        await push(ref(db, "hilos"), {
          title,
          content,
          authorUid: currentUser.uid,
          authorEmail: currentUser.email,
          createdAt: Date.now()
        });

        newThreadForm.reset();
        limpiarError();
      } catch (err) {
        console.error(err);
        mostrarError("Error al crear el hilo: " + err.message);
      }
    });
  }

  // Escuchar hilos en tiempo real
  onValue(ref(db, "hilos"), (snapshot) => {
    const data = snapshot.val();
    renderThreads(data);
  });

  function renderThreads(hilos) {
    threadsList.innerHTML = "";

    if (!hilos) {
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

    const entries = Object.entries(hilos); // [ [id, hilo], ... ]
    // Más recientes primero
    entries.sort((a, b) => (b[1].createdAt || 0) - (a[1].createdAt || 0));

    entries.forEach(([id, thread]) => {
      const div = document.createElement("div");
      div.className = "card p-4";

      const createdAtText = formatDate(thread.createdAt);

      div.innerHTML = `
        <h3 class="mb-2">${thread.title}</h3>
        <p class="gpu-meta mb-3">${thread.content}</p>
        <p class="text-muted-custom mb-2" style="font-size: 0.85rem;">
          Publicado por <strong>${thread.authorEmail || "Desconocido"}</strong>
          · ${createdAtText}
        </p>
        <hr />
        <h4 class="mb-2">Respuestas</h4>
        <div class="d-flex flex-column gap-2 mb-3" id="replies-${id}">
          <!-- Respuestas se inyectan aquí -->
        </div>
        <form class="replyForm" data-thread-id="${id}">
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

      // Escuchar respuestas de cada hilo
      listenToReplies(id);
    });

    activarFormulariosRespuesta();
  }

  function listenToReplies(threadId) {
    const repliesContainer = document.getElementById(`replies-${threadId}`);
    if (!repliesContainer) return;

    onValue(ref(db, `hilos/${threadId}/replies`), (snap) => {
      const replies = snap.val();
      repliesContainer.innerHTML = "";

      if (!replies) {
        repliesContainer.innerHTML = `
          <p class="text-muted-custom mb-0">No hay respuestas aún.</p>
        `;
        return;
      }

      const list = Object.values(replies);
      list.forEach((r) => {
        const p = document.createElement("div");
        p.className = "card p-2";
        p.innerHTML = `
          <p class="mb-1">${r.content}</p>
          <p class="text-muted-custom mb-0" style="font-size: 0.75rem;">
            ${r.authorEmail} · ${formatDate(r.createdAt)}
          </p>
        `;
        repliesContainer.appendChild(p);
      });
    });
  }

  function activarFormulariosRespuesta() {
    const forms = document.querySelectorAll(".replyForm");
    forms.forEach((form) => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!currentUser) {
          alert("Debes iniciar sesión para responder.");
          return;
        }

        const threadId = form.getAttribute("data-thread-id");
        const textarea = form.querySelector("textarea");
        const content = textarea.value.trim();
        if (!content) return;

        try {
          await push(ref(db, `hilos/${threadId}/replies`), {
            content,
            authorUid: currentUser.uid,
            authorEmail: currentUser.email,
            createdAt: Date.now()
          });

          textarea.value = "";
        } catch (err) {
          console.error(err);
          alert("Error al enviar la respuesta: " + err.message);
        }
      });
    });
  }
});


