import React from 'react'
import Create from '../assets/icons/Create'
import Edit from '../assets/icons/Edit'
import Home from '../assets/icons/Home'
import Myevents from '../assets/icons/Myevents'

function Sidenav() {
  return (
    <nav className='p-2 flex md:flex-col flex-row fixed mt-[70vh] md:mt-0 items-center justify-space-between md:justify-center md:ml-10 pt-10 '>
       <div className='md:pt-10 pt-20'>
        <Home/>
       </div>
        <div className='md:pt-10 pt-20'>
          <Myevents/>
        </div>
        <div className='md:pt-10 pt-20'>
          <Create/>
        </div>
        <div className='md:pt-10 pt-20'>
          <Edit/>
        </div>
    </nav>
  )
}

export default Sidenav