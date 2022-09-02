import React from 'react'
import Graphic from '../assets/Graphic'
import SignupForm from '../Signup/SignupForm'

function Signup() {
  return (
    <main className='md:flex block items-center h-screen md:justify-between md:mt-0 mt-20'>
        <Graphic/>
        <SignupForm/>
    </main>
  )
}

export default Signup