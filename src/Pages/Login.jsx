import React, { useState } from 'react'
import Error from '../Components/Error.jsx'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [empty, setEmpty] = useState(false)
  const [error, setError] = useState(false)


  const handleChange = (e) => {
    setEmpty(false)
    if (e.target.id === 'email') setEmail(e.target.value)
    if (e.target.id === 'password') setPassword(e.target.value)
  }

  const handleSignIn = async () => {
    if (!email || !password) setEmpty(true)
    
    const payload = {
      'email' : email,
      'password' : password
    }

    const BACKEND = import.meta.env.VITE_BACKEND

    const response = await fetch(`${BACKEND}/login`, {
      'method' : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(payload)
    })

    if (!response.ok) setError(true)

    const {message, access} = await response.json()

    localStorage.setItem('accessToken', access)
    navigate('/')
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
              LOGIN
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
            message={"Invalid Credentials!"}
            />


            <div
            onClick={handleSignIn}
            className='bg-[#0088ff] rounded-xl px-2 cursor-pointer'>
              Sign In
            </div>

            <Link
            to={'/register'}
            className='text-sm text-[#0088ff] hover:underline'>
              Create a new account
            </Link>

          </div>


      </div>  
    </>
  )
}

export default Login
