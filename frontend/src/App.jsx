import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {Routes, Route} from "react-router-dom"
import Notes from './pages/Notes'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Protected from './components/Protected'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast';

function App() {
  const [login, setLogin] = useState(() => {
    return localStorage.getItem("login") ? true : false;
  })
console.log("LOGIN STATE:", login);

  useEffect(()=> {
    if(login){
      localStorage.setItem("login", "true");
    }else{
      localStorage.removeItem("login")
    }
  }, [login])

  return (
    <>
      <div>
        <Toaster position="top-right" />
        <Navbar login={login} setLogin={setLogin} />
        <Routes>
          <Route path='/' element={<Protected login={login}><Notes /></Protected>} />
          <Route path='/login' element={<Login login={login} setLogin={setLogin} />}/>
          <Route path='/signup' element={<SignUp login={login} setLogin={setLogin} />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
