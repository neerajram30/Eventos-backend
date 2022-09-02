import React from 'react'
import { UserIcon } from '@heroicons/react/outline'

function Myevents() {
  return (
    <div className='text-start'>
      <a href="/myevent">
        <button 
        className='hover:bg-nvbg w-24 text-center items-center flex flex-col p-1 hover:rounded-lg'
        >
        <UserIcon className='text-blue stroke-1 w-10'/>
        <p className='text-sm' >my events</p>
        </button>
      </a>

    </div>
  )
}

export default Myevents