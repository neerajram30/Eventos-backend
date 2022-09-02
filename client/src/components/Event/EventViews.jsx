import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getEventbyId, reset } from '../../features/event/eventSlice'

function EventViews() {
  const { event_id } = useParams();
  const dispatch = useDispatch();

  const { event, isLoading, isError, message } = useSelector(
    (state) => state.event
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!isError) {

      dispatch(getEventbyId(event_id))
    }
    dispatch(reset())

  }, [isError, message, dispatch, event_id])

  if (isLoading) {
    <p>ohh</p>
  }
  return (
    <div>
      <div>
        <h2>{event.title}</h2>
        <p>from {event.startDate} to {event.endDate}</p>
        <p></p>
      </div>
    </div>
  )
}

export default EventViews