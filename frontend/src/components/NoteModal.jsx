import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

const NoteModal = React.memo(({ isOpen, onClose, note, onSave, setNotes }) => {
  // Local state for title & description
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  const [modalNote, setModalNote] = useState({ title: "", description: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setModalNote((prev) => ({ ...prev, [name]: value }));
  };

  // Populate fields when modal opens with existing note
  useEffect(() => {
    // console.log("modal log", note);
    if (note) {
      setModalNote({
        title: note.title || "",
        description: note.description || "",
      });
    } else {
      setModalNote({ title: "", description: "" });
    }
  }, [note]);

  if (!isOpen) return null;
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const handleSave = async () => {
    // const newNote = {
    //   id: note ? note.id : Date.now(), // new id for add
    //   title,
    //   description,
    // };
    if (note) {
      // Edit existing note
      try{
      const res = await axios.put(
        `${API_URL}/update/notes/${note._id}`,
        modalNote,
        { withCredentials: "include" }
      );
      // Update note in state
      setNotes((prev) =>
        prev.map((n) => (n._id === note._id ? res.data.note : n))
      );
      // alert(res.data.msg);
      toast.success(res.data.msg);
      } catch (err) {
        // alert(err.response);
        toast.error(err.response);
      }
    } else {
      try {
        const res = await axios.post(`${API_URL}/post/notes`, modalNote, {
          withCredentials: "include",
        });
        console.log("notes", res.data.note);
        setNotes((prev) => [...prev, res.data.note]);
        setModalNote({ title: "", description: "" });
        // alert(res.data.msg);
        toast.success(res.data.msg);
      } catch (err) {
        // alert(err.response);
        toast.error(err.response);
      }
    }
    // onSave(newNote);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* inset-0 Tailwind CSS ka shorthand hai — jo top, right, bottom, aur left sabko ek saath 0 kar deta hai. */}

      {/* fixed - element ko bowser window k acco. fix kr deta h scroll krne pr bhi nhi hota */}
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
        {/* w-(kitne columns lene hain) / (total 12 columns) */}
        <h2 className="text-xl font-bold mb-4">
          {note ? "Edit Note" : "Add Note"}
        </h2>

        <input
          className="focus:ring-2 focus:ring-blue-500 border w-full p-2 rounded mb-4 outline-none"
          name="title"
          value={modalNote.title}
          onChange={handleInput}
          placeholder="Title"
        />
        <textarea
          className="focus:ring-2 focus:ring-blue-500 border w-full p-2 rounded mb-4 outline-none"
          name="description"
          value={modalNote.description}
          onChange={handleInput}
          placeholder="Description"
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => {
              if (!note) setModalNote({ title: "", description: "" });
              onClose();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSave}
          >
            {note ? "Save Changes" : "Add Note"}
          </button>
          {/* <button onClick={() => { onSave({ id, title, description }); onClose(); }}> Save </button> y bhi kr skte the direct*/}
        </div>
      </div>
    </div>
  );
});

export default NoteModal;
