import React, { useState } from 'react'
import NoteCard from '../components/NoteCard';

function Notes() {
    const [notes, setNotes] = useState([
  { id: 1, title: "My first note", description: "This is a test note" },
  { id: 2, title: "Second note", description: "Another note" },
  { id: 3, title: "Third note", description: "Yet another note" },
])
  return (
    <div className="min-h-screen bg-gray-200">
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4'>
      {notes && notes.map((note) => {
           return <NoteCard key={note.id} id={note.id} title={note.title} description={note.description} />
        })}
    </div>
    </div>
  )
}

export default Notes
