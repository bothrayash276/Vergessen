import React from 'react'

const Error = ({message, isVisible}) => {
  return (
    <div
    className={`${isVisible ? "" : "hidden"} items-center flex gap-3`}>
      <i className='bi bi-exclamation-triangle text-red-600' />
        <div
        className='text-sm text-red-600'>
            {message}
        </div>
    </div>
  )
}

export default Error
