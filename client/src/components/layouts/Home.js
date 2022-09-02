import React from 'react'
import Events from '../Event/Events'
import Navbar from '../Navbar/Navbar'
import Sidenav from '../Navbar/Sidenav'

function Home() {
  return (
    <div>
        <Navbar/>
        <Sidenav/>
        <Events/>
    </div>
  )
}

export default Home