import React from 'react'
import { Link } from 'react-router-dom'
import {CalendarIcon, LocationMarkerIcon, TrashIcon, PencilAltIcon} from '@heroicons/react/solid' 
import {useDispatch} from 'react-redux'
import {deleteEvent} from '../../features/event/eventSlice'
import {useNavigate} from 'react-router-dom'
import Delete from './Delete'

function Event({event,i,user}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteClickhandle = (e)=>{
    e.preventDefault();
    // dispatch(deleteEvent(event._id)).then((response)=>{
      
    // console.log(response)
    // navigate('/myevent')
    return(
      <Delete data={event}/>
    )
    }
  


  return (

    <div  key={i} className='shadow-[#ada6a63d] shadow-eventbox rounded-md p-6 mt-10'>
      <Link to={event._id}>
              <h2 className='text-2xl font-montserrat font-[700]'>{event.title}</h2>
              <div className='mt-2 w-3/4 break-words'>
              <p className='font-thin text-sm'>{event.description}</p>
              </div>
              <div className='md:flex block pt-8 pb-10'>
                <div className='flex text-[#647377]'>
                 <div className='flex w-8'><CalendarIcon/></div>
                <p className='mt-2 pl-2 text-sm font-[600]'>From <span className='text-[0.9em] font-[400]'> {event.startDate} </span>to <span className='text-[0.9em] font-[400]'> {event.endDate}</span></p>
                </div>
                <div className='flex ml-10 text-[#647377]'>
                    <div className='w-8'><LocationMarkerIcon/></div>
                    <p className='text-sm font-[600] pt-[7px] pl-1'>{event.venue}</p>
                </div>
              </div>
              { user &&
              <div className='flex  justify-end items-end pr-12 pt-10 pb-10'>
                <div className='flex text-btnblue'>
                <button className='w-24 h-10 border-[1px] border-btnblue flex justify-center pl-2 pr-2 items-center rounded-sm'>
                <p className='text-[#000] font-montserrat font-[700] '>Edit</p>
                  <PencilAltIcon className='text-[#000] w-4 ml-1'/>
                  </button>
                <button 
                className='w-24 h-10 ml-5 bg-btnblue flex justify-center items-center pl-2 pr-2 rounded-sm'
                onClick={deleteClickhandle}
                >
                  <p className='text-white font-montserrat font-[700] text-sm'>Delete</p>
                  <TrashIcon className='text-white w-4 ml-1'/>
                </button>
                </div>
              </div>}
      </Link>
    </div>
  )
}

export default Event