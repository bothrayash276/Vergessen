import React, { useState, useEffect, useContext } from 'react'
import Header from '../Components/Header.jsx'
import DisplayCard from '../Components/DisplayCard.jsx'
import { useNavigate } from 'react-router-dom'
import { UpdateContext } from '../Components/UpdateContext.jsx' 

const Home = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const {tick, setTick} = useContext(UpdateContext)

  useEffect(() => {
    async function loadUser() {

      const accessToken = localStorage.getItem('accessToken')

      if (!accessToken) navigate('/login')

      const BACKEND = import.meta.env.VITE_BACKEND

      const response = await fetch(`${BACKEND}/user`, {
        'method' : 'GET',
        headers : {
          'access' : accessToken
        }
      })


      if (!response.ok) navigate('/login')

      const userDetails = await response.json()

      setUser(userDetails)

      setLoading(false)

    }


    loadUser()
  }, [])



  if (loading) return

  return (
    <>
        <Header />

        <div
        className='flex p-4 flex-wrap gap-3'>
          {
            user.notes.map( note => {
              return <DisplayCard 
                        id={note.id}
                        title={note.title}
                        paragraph={note.paragraph}
                        />
            })
          }
        </div>
    </>
  )
}

export default Home
