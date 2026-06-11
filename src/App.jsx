import React from 'react'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      
      <Routes>

        {/* Home page route */}
        <Route 
          path='/'
          element={}
        />


        {/* Individual Note page route */}
        <Route 
          path='/:uid'
          element={}
        />

        {/* Login page route */}
        <Route 
          path='/login'
          element={}
        />


        {/* Register page route */}
        <Route 
          path='/register'
          element={}
        />


      </Routes>

    </>
  )
}

export default App
