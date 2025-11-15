import React, { useState, useCallback } from "react";
import NoteCard from "../components/NoteCard";
import NoteModal from '../components/NoteModal';
import { useEffect } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';

function Notes() {
  const [notes, setNotes] = useState([]);
  // console.log("notes page notes", notes);
  const [search, setSearch] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
const [selectedNote, setSelectedNote] = useState(null);
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

useEffect(() => {
  async function fetchNotes() {
    try {
      const res = await axios.get(`${API_URL}/get/notes`, { withCredentials: true });
      // console.log("res notes", res.data.notes);
      if(res.data.success) setNotes(res.data.notes);
    } catch (err) {
      toast.error(err);
    }
  }
  fetchNotes();
}, []);
  // compute sorted notes
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1; // pinned notes first
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt); // newest first
  });

  const filteredNotes = sortedNotes.filter(
  note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.description.toLowerCase().includes(search.toLowerCase())
);



  // const handleSave = useCallback(
  //   (updatedNote) => {
  //     if (selectedNote) {
  //       // Edit existing note
  //       setNotes((prevNotes) =>
  //         prevNotes.map((note) =>
  //           note.id === updatedNote.id ? updatedNote : note
  //         )
  //       );
  //     } else {
  //       // Add new note
  //       setNotes((prevNotes) => [...prevNotes, updatedNote]);
  //     }
  //   },
  //   [selectedNote] // dependency: selectedNote determines add vs edit
  // );

  return (
    <div className="min-h-screen bg-gray-200 p-4">
    
      <div className="flex justify-end mb-4 gap-5">
          <input
  type="text"
  placeholder="Search notes..."
  className="border p-2 rounded w-full sm:w-48 md:w-64 lg:w-72 focus:ring-2 focus:ring-blue-500 outline-none"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
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
      {/* Show all notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4">
        {filteredNotes && filteredNotes.length > 0 ? (
          filteredNotes.map((note) => {
            return (
              <NoteCard
                key={note._id}
                {...note}
                setNotes = {setNotes}
                notes = {notes}
                onEdit={() => {
                  setSelectedNote(note);
                  setModalOpen(true);
                }}
              />
              // The {...note} spreads all properties of the note object as props.
            );
          })): (
    <h1 className="text-2xl w-full col-span-full text-center">
      {search ? "No notes match your search." : "No notes available. Add a new note to get started!"}
    </h1>
  )}
      </div>
      {/* modal edit/add */}
      <NoteModal
        setNotes = {setNotes}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        note={selectedNote}
      />
    </div>
  );
}

export default Notes;
