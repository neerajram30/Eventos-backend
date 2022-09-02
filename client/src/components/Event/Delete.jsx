import React from 'react'

function Delete({event}) {
  return (
    <div className='w-screen h-screen bg-blue'>
        <button>delete</button>
        {console.log("delete"+event)}
    </div>
  )
}

export default Delete