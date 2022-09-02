import React from 'react'
import Graphic from '../assets/Graphic'
import LoginForm from '../Login/LoginFrom'

function Login() {
  return (
    <main className='md:flex block items-center h-screen md:justify-between md:mt-0 mt-20'>
        <Graphic/>
        <LoginForm/>
    </main>
  )
}

export default Login