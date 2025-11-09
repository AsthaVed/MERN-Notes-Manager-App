import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <div>
        <nav className='w-full bg-blue-500 flex px-8 py-4 justify-between items-center'>
          <div>
            <h1 className='text-2xl sm:text-xl text-white font-bold'>Notes Manager</h1>
          </div>
          <div>
            <ul className='flex items-center gap-6'>
              <li><Link className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 shadow-lg outline-none rounded' to="/">Notes</Link></li>
              <li><Link className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 shadow-lg outline-none rounded' to="/login">Login</Link></li>
              <li><Link className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 shadow-lg outline-none rounded' to="/signup">Signup</Link></li>
              <li><button className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 shadow-lg outline-none rounded'>Logout</button></li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar
