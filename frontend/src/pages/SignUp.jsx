import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  const [signupForm, setSignupForm] = useState({name: "", email: "", password: "", confm_password: ""})
  const [hideShow, setHideShow] = useState(false)
  const [cnfmHideShow, setCnfmHideShow] = useState(false)
  const handleInput = (e) => {
    const {name, value} = e.target;
    setSignupForm((prev) => ({...prev, [name]: value}))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className='max-w-xl bg-white rounded-lg shadow-lg mt-16 m-auto p-8'>
      
      <form className='space-y-5' onSubmit={handleSubmit}>
        <div className='flex items-center justify-center'>
          <h1 className='text-2xl font-bold'>Signup</h1>
        </div>
        <div>
          <label className='text-sm mb-2' htmlFor="name">Name</label>
          <input className='p-3 w-full rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none' type="name" name="name" id="name" placeholder='Enter your name' onChange={handleInput} value={signupForm.name} />
        </div>
        <div>
          <label htmlFor="email" className='text-sm mb-2'>Email</label>
          <input className='p-3 w-full rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none' type="email" id="email" name="email" placeholder='Enter your email' onChange={handleInput} value={signupForm.email} />
        </div>
        <div>
          <label htmlFor="password" className='text-sm mb-2'>Password</label>
          <div className='relative'>
          <input className='p-3 w-full rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none' type={hideShow? "text": "password"} name="password" id='password' placeholder='Enter your password' onChange={handleInput} value={signupForm.password} />
          <button type="button"
                  className="block text-blue-600 hover:text-blue-700 absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setHideShow(!hideShow)}
                >
                  {hideShow ? "hide" : "show"}
                </button>
        </div>
        </div>
        
        <div>
          <label htmlFor="cnfm_password" className='text-sm mb-2'>Confirm Password</label>
          <div className='relative'>
          <input className='p-3 w-full rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none' type={cnfmHideShow? "text": "password"} name="confm_password" id="cnfm_password" placeholder='Enter your confirm password' onChange={handleInput} value={signupForm.confm_password} />
          <button type="button"
                  className="block text-blue-600 hover:text-blue-700 absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setCnfmHideShow(!cnfmHideShow)}
                >
                  {cnfmHideShow ? "hide" : "show"}
                </button>
        </div>
        </div>
        
        <div className='flex items-center justify-center'>
          <button className='text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg' type='submit'>Signup</button>
        </div>
        <div className='flex items-center justify-center text-gray-500'>
          Already have account?{" "}
          <Link className='text-blue-600 hover:text-blue-700 hover:underline' to="/login">Login</Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp
