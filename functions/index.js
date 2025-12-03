const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

admin.initializeApp();

// Cloud Function: triggers when a note is created
exports.onNoteCreate = onDocumentCreated("notes/{noteId}", async (event) => {
  const snap = event.data;
  const noteId = event.params.noteId;

  if (!snap) return;

  const note = snap.data();

  await admin.firestore().collection("auditLogs").add({
    action: "note-created",
    noteId,
    ownerId: note.ownerId || null,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  return;
});
