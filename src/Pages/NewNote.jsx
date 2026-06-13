import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header'

const NewNote = () => {

  const [title, setTitle] = useState()
  const [paragraph, setParagraph] = useState()

  const navigate = useNavigate()

  const handleChange = (e) => {
    setEmpty(false)
    if (!localStorage.getItem('accessToken')) navigate('/login')
    if (e.target.id === 'title') setTitle(e.target.value)
    if (e.target.id === 'paragraph') setParagraph(e.target.value)
  }

  const handleInput = (e) => {
    e.target.style.height = "auto"
    e.target.style.height = `${e.target.scrollHeight}px`
  }


  const [empty, setEmpty] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSave = async () => {
    if (!title || !paragraph) return setEmpty(true)

    const BACKEND = import.meta.env.VITE_BACKEND

    const payload = {
      'title' : title,
      'paragraph' : paragraph
    }

    const response = await fetch(`${BACKEND}/notes`, {
      'method' : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'access' : localStorage.getItem('accessToken'),
        'task' : 'add'
      },
      body : JSON.stringify(payload)
    })

    if (response.ok) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 2000);
    }
  }

  return (
    <>
         <div
         className='flex flex-col p-4 gap-10 text-white font-[Ubuntu] min-h-screen w-full'>

          <div className="w-full">
            <Header />
          </div>


          <div
          className={`bg-green-600 rounded-xl px-2 fixed right-8 top-28 ${success ? "" : "hidden"}`}>
            Note added successfully!
          </div>


          <div
          className={`bg-red-600 rounded-xl px-2 fixed right-8 top-28 ${empty ? "" : "hidden"}`}>
            Note cannot be empty!
          </div>


          <div
          className='flex gap-3 items-center'>


            <input 
            type="text"
            id='title'
            onChange={handleChange}
            placeholder='Title'
            className='flex-1 outline-none text-4xl font-[Secular_One] text-[#0088ff]
            placeholder:font-[Secular_One] placeholder:text-neutral-800' />


          <div
          onClick={handleSave}
          className='bg-green-600 rounded-xl px-2 cursor-pointer'>
            Save
          </div>

          </div>

          <textarea
          placeholder='Start writing in your new note....'
          id='paragraph'
          onInput={handleInput}
          onChange={handleChange}
          className='w-full outline-none resize-none placeholder:text-neutral-600'>

          </textarea>


          

         </div>
    </>
  )
}

export default NewNote
