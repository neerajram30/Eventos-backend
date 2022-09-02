import React from 'react'
import {Link} from 'react-router-dom'
import Dropdown from '../assets/icons/Dropdown'

function Navbar() {

  return (
    <nav className='h-14 font-montserrat'>
      <div className='fixed w-screen bg-nvbg h-16'>
        <div className='flex justify-between'>
            <div className='pt-2 ml-5 font-inter text-xl'>
              <Link to='/'>
                Eventos
              </Link>
            </div>  
            <div className='pt-2 mr-5'>
              <Dropdown/>
            </div>
            
            
        </div>
      </div>
    </nav>
  )
}

export default Navbar