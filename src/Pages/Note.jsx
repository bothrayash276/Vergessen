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


  const [updateMSG, setUpdateMSG] = useState(false)
  const [empty, setEmpty] = useState(false)

  const handleUpdate = async () => {

    if(!title || !paragraph) return setEmpty(true)

    const BACKEND = import.meta.env.VITE_BACKEND

    const payload = {
      'id' : user.id,
      'title' : title,
      'paragraph' : paragraph
    }

    const response = await fetch(`${BACKEND}/notes`, {
      'method' : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'access' : localStorage.getItem('accessToken'),
        'task' : 'update'
      },
      body : JSON.stringify(payload)
    })


    if (response.ok) {
      setUpdateMSG(true)
      setTimeout(() => {
        setUpdateMSG(false)
      }, 2000);
    }
  }

  const handleDelete = async () => {
    const BACKEND = import.meta.env.VITE_BACKEND
    

    const response = await fetch(`${BACKEND}/notes`, {
      'method' : 'POST',
      headers : {
        'access' : localStorage.getItem('accessToken'),
        'task' : 'delete',
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({'id' : id})
    })

    if (response.ok) navigate('/')
  }

  const handleChange = (e) => {
    setEmpty(false)
    if (e.target.id === 'title') setTitle(e.target.value)
    if (e.target.id === 'paragraph') setParagraph(e.target.value)
  }

  const handleInput = (e) => {
    e.target.style.height = "auto"
    e.target.style.height = `${e.target.scrollHeight}px`
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
          className={`bg-green-600 rounded-xl px-2 fixed right-10 top-50 ${updateMSG ? "" : "hidden"}`}>
            Updated Successfully!
          </div>

          <div
          className={`bg-red-600 rounded-xl px-2 fixed right-10 top-50 ${empty ? "" : "hidden"}`}>
            Field cannot be empty!
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
          onClick={handleUpdate}
          className='bg-[#0088ff] rounded-xl px-2 text-sm cursor-pointer'>
            Update
          </div>  

            <div
            onClick={handleDelete}
            className='px-2 bg-red-600 rounded-xl text-sm cursor-pointer'>
              Delete
            </div>


          </div>

          <textarea
          onInput={handleInput} 
          id='paragraph'
          defaultValue={user.paragraph}
          onChange={handleChange}
          className='w-full outline-none resize-none min-h-80'>

          </textarea>

          

         </div>
    </>
  )
}

export default Note
