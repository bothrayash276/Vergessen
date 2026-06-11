import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {UpdateContext} from './UpdateContext.jsx'
import { useNavigate } from 'react-router-dom'

const DisplayCard = ({id, title, paragraph}) => {

    const {tick, setTick} = useContext(UpdateContext)
    const navigate = useNavigate()

    const truncate = (e) => {
        if (e.length <= 180) return e
        
        let s = ""
        for ( let i = 0; i < 180; i++ ) {
            s += e[i]
        }
        s += "...." 

        return s
    }

    
    const handleDelete = async () => {
        const BACKEND = import.meta.env.BACKEND
        const response = await fetch(`${BACKEND}/notes`, {
            'method' : 'POST',
            headers : {
                'access' : localStorage.getItem('accessToken'),
                'task' : 'delete',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({'id' : id})
        })

        if (response.status === 404) {
            navigate('/login')
        }

        setTick(tick+1)
    }


  return (
    <>
        <div
        className='rounded-lg bg-[#121212] flex gap-5 flex-col 
                 text-white font-[Ubuntu] p-4 px-10 max-w-80'>
            
            {/* Title */}
            <div
            className='font-[Secular_One] text-[24px] text-[#0088ff]'>
                {title.toUpperCase()}
            </div>

            {/* Paragraph */}
            <div
            className='text-sm leading-5.5'>
                {truncate(paragraph)}
            </div>


            {/* Buttons */}
            <div
            className='flex gap-5 items-center'>

                <Link
                to={`/${id}`}
                className='bg-[#0088ff] px-3 rounded-lg cursor-pointer text-sm'>
                    Edit
                </Link>


                <div
                onClick={handleDelete}
                className='bg-red-600 px-3 rounded-lg cursor-pointer text-sm'>
                    Delete
                </div>

            </div>

        </div>
    </>
  )
}

export default DisplayCard
