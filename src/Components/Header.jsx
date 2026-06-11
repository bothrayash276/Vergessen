import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({sidebar, setSidebar}) => {
  return (
    <>
        {/* Outer Div */}
        <div
        className='font-[Ubuntu] flex items-center gap-10 text-white'>

          {/* Logo and Text */}
          <Link
          to={'/'}
          className='flex gap-3 items-center cursor-pointer
                     flex-1'>

            <img src="./logo.svg" alt="" className='w-5' />

            <div
            className='text-white font-[Secular_One] text-xl'>
              VERGESSEN
            </div>

          </Link>

          {/* All Notes */}
          <Link
          to={'/'}
          className='text-sm not-sm:hidden cursor-pointer
                     hover:underline hover:text-[#0088ff] hover:underline-offset-4' >
            All Notes
          </Link>

          {/* Create A Note */}
          <Link
          to={'/newNote'}
          className='text-sm not-sm:hidden cursor-pointer
                     hover:underline hover:text-[#0088ff] hover:underline-offset-4' >
            Add One
          </Link>


          {/* Sign In */}
          <Link
          to={'/login'}
          className='text-sm not-sm:hidden cursor-pointer
                     bg-[#0088ff] p-0.5 px-2 rounded-[15px]' >
            Sign In
          </Link>


        </div>
    </>
  )
}

export default Header
