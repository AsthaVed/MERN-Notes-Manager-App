import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';

const NoteCard = React.memo(({_id, title, description, pinned, onEdit, setNotes, notes}) => {
//   console.log(id)
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const handleDeleteNote = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this note?");

  if (!confirmDelete) return;
    try{
    const res = await axios.delete(`${API_URL}/delete/note/${id}`, {withCredentials: 'include'});
    console.log("delete", res.data);
     // Remove note from state after deletion
    setNotes((prev) => prev.filter((note) => note._id !== id));
    // alert(res.data.msg)
    toast.success(res.data.msg)
    }catch(err){
            // console.log("Error:", err.response?.data || err.message);
            toast.error("Error:", err.response?.data || err.message)
        }
}

const handlePinned = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/notes/pin/${id}`, {}, { withCredentials: 'include' });
      setNotes(prev => prev.map(n => n._id === id ? res.data.note : n));
      toast.success(res.data.msg); // bonus
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error pinning note");
    }
  }

  return (
    <>
    {/* max-w-full lg:max-w-lg sm:max-w-sm md:max-w-md  */}
    <div className='p-8 shadow-lg rounded-lg mt-6 bg-white'>  
        <h1 className='text-xl sm:text-2xl font-bold mb-2 capitalize'>{title}</h1>
        <p className='text-gray-700 mb-4'>{description}</p>
        <div className='flex gap-2'>
            <button className='bg-blue-600 hover:bg-blue-700 rounded-lg text-white outline-none px-6 py-2' onClick={onEdit}>Edit</button>
        <button className='bg-red-500 hover:bg-red-600 rounded-lg text-white outline-none px-6 py-2' onClick={() => handleDeleteNote(_id)}>Delete</button>
        <button
  className='bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded'
  onClick={() => handlePinned(_id)}
>
  {pinned ? "Unpin" : "Pin"}
</button>
        </div>
    </div>
    </>
  )
})

export default NoteCard
