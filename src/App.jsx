import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Note from './Pages/Note.jsx'
import Register from './Pages/Register.jsx'

const App = () => {
  return (
    <>
      
      <Routes>

        {/* Home page route */}
        <Route 
          path='/'
          element={ <Home/> }
        />


        {/* Individual Note page route */}
        <Route 
          path='/:uid'
          element={ <Note/> }
        />

        {/* Login page route */}
        <Route 
          path='/login'
          element={ <Login/> }
        />


        {/* Register page route */}
        <Route 
          path='/register'
          element={ <Register/> }
        />


      </Routes>

    </>
  )
}

export default App
