import React, { useState } from 'react'
import Error from '../Components/Error.jsx'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'

const Register = () => {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(false)

  const [errmsg, setErrmsg] = useState()

  const handleChange = (e) => {
    setError(false)
    setErrmsg("")
    if (e.target.id === 'name') setName(e.target.value)
    if (e.target.id === 'email') setEmail(e.target.value)
    if (e.target.id === 'password') setPassword(e.target.value)
  }

  const handleRegister = async () => {
    if (!name || !email || !password) setError(true)

    const BACKEND = import.meta.env.BACKEND

    const payload = {
      'name' : name,
      'email' : email,
      'password' : password 
    }

    const response = await fetch(`${BACKEND}/register`, {
      'method' : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(payload)
    })

    if (!response.ok) {
      const {message} = await response.json()
      setErrmsg(message)
      setError(true)
    }

    const {message, access} = await response.json()
    localStorage.setItem('accessToken', access)
  }


  return (
    <>
       <div
      className='min-h-screen min-w-full flex flex-col items-center text-white gap-10 font-[Ubuntu]'>
          
          <div
          className='w-full'>
            <Header />
          </div>

          <div
          className='flex flex-col gap-10 items-center'>

            <div
            className='text-4xl font-[Secular_One]'>
              REGISTER
            </div>

            <div
            className='flex flex-col gap-3'>
              <label htmlFor="name"
              className='px-2'>Name</label>
              
              <div
              className='flex '>
                <i className='bi bi-person-fill text-xl p-2 px-4
                border-l border-t border-b rounded-l-lg'/>
                <input 
                type="text"
                id='text'
                onChange={handleChange}
                placeholder='Email'
                className='text-white outline-none p-2 px-4
                border rounded-r-lg' />
              </div>

            </div>


            <div
            className='flex flex-col gap-3'>
              <label htmlFor="email"
              className='px-2'>Email</label>
              
              <div
              className='flex '>
                <i className='bi bi-envelope-fill text-xl p-2 px-4
                border-l border-t border-b rounded-l-lg'/>
                <input 
                type="email"
                id='email'
                onChange={handleChange}
                placeholder='Email'
                className='text-white outline-none p-2 px-4
                border rounded-r-lg' />
              </div>

            </div>


            <div
            className='flex flex-col gap-3'>
              <label htmlFor="password"
              className='px-2'>Password</label>
              
              <div
              className='flex '>
                <i className='bi bi-key-fill text-xl p-2 px-4
                border-l border-t border-b rounded-l-lg'/>
                <input 
                type="password"
                id='password'
                placeholder='Password'
                onChange={handleChange}
                className='text-white outline-none p-2 px-4
                border rounded-r-lg' />
              </div>

            </div>


            <Error 
            isVisible={error}
            message={errmsg || "Field cannot be empty"}
            />


            <div
            onClick={handleRegister}
            className='bg-[#0088ff] rounded-xl px-2 cursor-pointer'>
              Register
            </div>

            <Link
            to={'/login'}
            className='text-sm text-[#0088ff] hover:underline'>
              Sign in instead
            </Link>

          </div>


      </div>   
    </>
  )
}

export default Register
