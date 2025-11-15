import React from 'react'

const NoteCard = React.memo(({id, title, description, onEdit, setSelectedNote, selectedNote}) => {
//   console.log(id)
  return (
    <>
    {/* max-w-full lg:max-w-lg sm:max-w-sm md:max-w-md  */}
    <div className='p-8 shadow-lg rounded-lg mt-6 bg-white' key={id}>  
        <h1 className='text-xl sm:text-2xl font-bold mb-2'>{title}</h1>
        <p className='text-gray-700 mb-4'>{description}</p>
        <div className='flex gap-2'>
            <button className='bg-blue-600 hover:bg-blue-700 rounded-lg text-white outline-none px-6 py-2' onClick={onEdit}>Edit</button>
        <button className='bg-orange-500 hover:bg-orange-600 rounded-lg text-white outline-none px-6 py-2'>Delete</button>
        </div>
    </div>
    </>
  )
})

export default NoteCard
