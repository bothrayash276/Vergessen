import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../Components/Header'

const Note = () => {

  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  

  const [title, setTitle] = useState()
  const [paragraph, setParagraph] = useState()

  const navigate = useNavigate()

  const {id} = useParams()

  useEffect( () => {
    const loadUser = async () => {
      try {

        const accessToken = localStorage.getItem('accessToken')

        if (!accessToken) navigate('/login')


        const BACKEND = import.meta.env.VITE_BACKEND

        const response = await fetch(`${BACKEND}/particular`, {
          'method' : 'GET',
          headers : {
            access : accessToken,
            id : id
          }
        })

        if (!response.ok) navigate('/login')

        const note = await response.json()
        setUser(note)
        setTitle(note.title)
        setParagraph(note.paragraph)

      } catch (e) {
        console.log(e)
      }
      finally {
        setLoading(false)
      }
    }


    loadUser()
  } , [])


  const handleDelete = async () => {
    const BACKEND = import.meta.env.VITE_BACKEND

    const response = await fetch(`${BACKEND}/notes`, {
      'method' : 'POST',
      headers : {
        'access' : localStorage.getItem('accessToken'),
        'task' : 'delete'
      },
      body : JSON.stringify({'id' : useParams().id})
    })

    if (response.ok) navigate('/')
  }

  const handleChange = (e) => {
    if (e.target.id === 'title') setTitle(e.target.value)
    if (e.target.id === 'paragraph') setParagraph(e.target.value)
  }

  if (loading) return

  return (
    <>
         <div
         className='flex flex-col p-4 gap-10 text-white font-[Ubuntu] min-h-screen w-full'>

          <div className="w-full">
            <Header />
          </div>

          <div
          className='flex gap-3 items-center'>

            <input 
            type="text"
            id='title'
            onChange={handleChange}
            defaultValue={user.title.toUpperCase()}
            className='flex-1 outline-none text-4xl font-[Secular_One] text-[#0088ff]' />

            <div
            onChange={handleDelete}
            className='px-2 bg-red-600 rounded-xl'>
              Delete
            </div>

          </div>

          <textarea 
          defaultValue={user.paragraph}
          onChange={handleChange}
          className='h-full w-full outline-none'>

          </textarea>



         </div>
    </>
  )
}

export default Note
