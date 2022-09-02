import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents,reset } from '../../features/event/eventSlice'
import Event from './Event'
function Events() {

  const dispatch = useDispatch();
  
  const { event, isLoading, isError, message } = useSelector(
    (state) => state.event
  )


  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!isError){

      dispatch(getEvents())
    }
      dispatch(reset())
    
  }, [isError, message, dispatch])
if(isLoading){
  <p>ohh</p>
}

  return (
      <main className='flex justify-center mt-10 font-montserrat'>
        
         <div className='w-2/3'>
         {event.map((data,i)=>
           <Event event={data} key={i}/>
          )} 
        </div>  

        
        {console.log(event) }
      </main>
  )
}

export default Events