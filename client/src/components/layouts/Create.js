import React from 'react'
import EventForm from '../Event/EventForm'
import Navbar from '../Navbar/Navbar'
import Sidenav from '../Navbar/Sidenav'
function Create() {
  return (
    <div>
        <Navbar/>
        <Sidenav/>
        <EventForm/>
    </div>
  )
}

export default Create