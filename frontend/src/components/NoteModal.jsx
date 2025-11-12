import React, { useState, useEffect } from 'react';

const  NoteModal = React.memo(({ isOpen, onClose, note, onSave }) => {
  // Local state for title & description
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Populate fields when modal opens with existing note
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [note]);

  if (!isOpen) return null;

  const handleSave = () => {
    const newNote = {
      id: note ? note.id : Date.now(), // new id for add
      title,
      description,
    };
    onSave(newNote);
    setDescription('');
    setTitle('')
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* inset-0 Tailwind CSS ka shorthand hai — jo top, right, bottom, aur left sabko ek saath 0 kar deta hai. */}

      {/* fixed - element ko bowser window k acco. fix kr deta h scroll krne pr bhi nhi hota */}
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
      {/* w-(kitne columns lene hain) / (total 12 columns) */}
        <h2 className="text-xl font-bold mb-4">
          {note ? 'Edit Note' : 'Add Note'}
        </h2>

        <input
          className="focus:ring-2 focus:ring-blue-500 border w-full p-2 rounded mb-4 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="focus:ring-2 focus:ring-blue-500 border w-full p-2 rounded mb-4 outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => {setDescription(''); setDescription(''); onClose();}}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSave}
          >
            {note ? 'Save Changes' : 'Add Note'}
          </button>
          {/* <button onClick={() => { onSave({ id, title, description }); onClose(); }}> Save </button> y bhi kr skte the direct*/}
        </div>
      </div>
    </div>
  );
})

export default NoteModal;
