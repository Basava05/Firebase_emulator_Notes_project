import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, doc, updateDoc, deleteDoc,
  onSnapshot, serverTimestamp, connectFirestoreEmulator, query, orderBy
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCn5LXI56KgAwsqqLkk7yl40uoTtg73pG4",
  authDomain: "dbms-project-7b75f.firebaseapp.com",
  projectId: "dbms-project-7b75f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* CONNECT EMULATOR FOR ALL LOCAL CASES */
const isLocal =
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1" ||
  location.hostname.startsWith("10.");

if (
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1"
) {
  connectFirestoreEmulator(db, "127.0.0.1", 9090);
} else {
  console.log("⚠️ Using Production Firestore");
}

/* DOM */
const titleEl = document.getElementById("title");
const contentEl = document.getElementById("content");
const createBtn = document.getElementById("createBtn");
const clearBtn = document.getElementById("clearBtn");
const notesContainer = document.getElementById("notesContainer");

const modal = document.getElementById("modal");
const editTitle = document.getElementById("editTitle");
const editContent = document.getElementById("editContent");
const saveEdit = document.getElementById("saveEdit");
const cancelEdit = document.getElementById("cancelEdit");

let editingId = null;
const fakeUid = "user_123";

const notesCol = collection(db, "notes");

/* CREATE */
createBtn.addEventListener("click", async () => {
  if (!titleEl.value.trim()) return alert("Title required");

  await addDoc(notesCol, {
    title: titleEl.value,
    content: contentEl.value,
    ownerId: fakeUid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  titleEl.value = "";
  contentEl.value = "";
});

/* CLEAR */
clearBtn.addEventListener("click", () => {
  titleEl.value = "";
  contentEl.value = "";
});

/* READ */
const q = query(notesCol, orderBy("createdAt"));
onSnapshot(q, snapshot => {
  notesContainer.innerHTML = "";

  snapshot.forEach(docSnap => {
    const d = docSnap.data();

    const card = document.createElement("div");
    card.className = "note glass";
    card.innerHTML = `
      <div class="title">${d.title}</div>
      <div class="content">${d.content || ""}</div>
      <div class="actions">
        <button onclick="editNote('${docSnap.id}', \`${d.title}\`, \`${d.content || ""}\`)">Edit</button>
        <button onclick="deleteNote('${docSnap.id}')">Delete</button>
      </div>
    `;
    notesContainer.appendChild(card);
  });
});

/* EDIT */
window.editNote = (id, t, c) => {
  editingId = id;
  editTitle.value = t;
  editContent.value = c;
  modal.classList.remove("hidden");
};

saveEdit.onclick = async () => {
  await updateDoc(doc(db, "notes", editingId), {
    title: editTitle.value,
    content: editContent.value,
    updatedAt: serverTimestamp()
  });
  modal.classList.add("hidden");
};

cancelEdit.onclick = () => modal.classList.add("hidden");

/* DELETE */
window.deleteNote = (id) =>
  confirm("Delete?") && deleteDoc(doc(db, "notes", id));
