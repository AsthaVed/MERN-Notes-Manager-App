import React, { useState, useCallback } from "react";
import NoteCard from "../components/NoteCard";
import NoteModal from '../components/NoteModal';

function Notes() {
  const [notes, setNotes] = useState([
    { id: 1, title: "My first note", description: "This is a test note" },
    { id: 2, title: "Second note", description: "Another note" },
    { id: 3, title: "Third note", description: "Yet another note" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
const [selectedNote, setSelectedNote] = useState(null);
// const handleSave = (newNote) => {
//     if (selectedNote) {
//       // edit note
//       setNotes((prev) =>
//         prev.map((note) => (note.id === newNote.id ? newNote : note))
//       );
//     } else {
//       // add note
//       setNotes((prev) => [...prev, newNote]);
//     }
//   };
  const handleSave = useCallback(
    (updatedNote) => {
      if (selectedNote) {
        // Edit existing note
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === updatedNote.id ? updatedNote : note
          )
        );
      } else {
        // Add new note
        setNotes((prevNotes) => [...prevNotes, updatedNote]);
      }
    },
    [selectedNote] // dependency: selectedNote determines add vs edit
  );

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => {
            setSelectedNote(null);
            setModalOpen(true);
          }}
        >
          Add Note
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4">
        {notes &&
          notes.map((note) => {
            return (
              <NoteCard
                key={note.id}
                {...note}
                onEdit={() => {
                  setSelectedNote(note);
                  setModalOpen(true);
                }}
              />
            );
          })}
      </div>
      <NoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        note={selectedNote}
        onSave={handleSave}
      />
    </div>
  );
}

export default Notes;
