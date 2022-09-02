import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyevents, reset } from '../../features/event/eventSlice'
import Event from './Event'
import { useNavigate } from 'react-router-dom'

function UserEvents() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { event, isLoading, isError, message } = useSelector(
    (state) => state.event
  )


  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login')
    }
    if (!isError) {

      dispatch(getMyevents())
    }
    dispatch(reset())

  }, [user, navigate, isError, message, dispatch])
  if (isLoading) {
    <p>ohh</p>
  }

  return (
    <main className='flex justify-center mt-10 font-montserrat'>
      <div className='w-2/3'>
        {event.map((data, i) =>
          <Event event={data} key={i} user={user}/>
        )}
      </div>

      {console.log(event)}
    </main>
  )
}

export default UserEvents