import React,{useState,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {create, reset} from '../../features/event/eventSlice'
function EventForm() {

  const [formData,setformData] = useState({title:'', startDate:'', endDate:'', venue:'', description:''});
  const {title,startDate,endDate,venue,description} = formData;
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {event, isLoading, isError, isSuccess, message} = useSelector(
    (state)=>state.event
)
useEffect(()=>{
  console.log(isSuccess);
  if(isError){
      console.log(message);
  }
  if(isSuccess){
      navigate('/')
      console.log('success');
  }
  dispatch(reset())
},[event, isError, isSuccess, message, navigate, dispatch])


  const formOnChange = (e)=>{
    setformData((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  } 


  const formOnSubmit = (e)=>{
    e.preventDefault();
    const eventData = {
      title,
      startDate,
      endDate,
      venue,
      description
  }

  dispatch(create(eventData))
    
  }

  if (isLoading){
    console.log('loading')
}
  return (
    <main className='font-montserrat flex items-center justify-center w-11/12 ml-10'>
      <div className='font-inter text-2xl md:text-white'>
        <h1>Create Event</h1>
      </div>
      <div className='bg-white rounded-md mt-5 w-screen'>
        <form className='pt-20 md:pl-20 pl-6 md:pr-20 pr-5 pb-20 flex md:items-center items-start flex-col' onSubmit={formOnSubmit}>
          <div className='flex flex-col w-full'>
            <label htmlFor="title" className='text-sm font-black'>Title</label>
            <input
              type="text"
              placeholder='Title here'
              name="title"
              className='pl-4 pr-4 mt-2 h-10 md:w-96 shadow-[#f5f5f5c9] shadow-formbox text-sm rounded-sm bg-formbg'
              value={title}
              onChange={formOnChange} 
            /><br />
          </div>
          <div className='flex flex-col mt-5 w-full'>
            <label htmlFor="" className='text-sm font-black'>Start date</label>
            <input
              type="date"
              name="startDate"
              className='pl-4 pr-4 mt-2 h-10 md:w-96 w-full shadow-[#f5f5f5c9] shadow-formbox text-sm rounded-sm bg-formbg'
              value={startDate}
              onChange={formOnChange}
            /><br />
          </div>
          <div className='flex flex-col mt-5 w-full'>
            <label htmlFor="" className='text-sm font-black'>End date</label>
            <input
              type="date"
              name="endDate"
              className='pl-4 pr-4 mt-2 h-10 md:w-96 w-full shadow-[#f5f5f5c9] shadow-formbox text-sm rounded-sm bg-formbg'
              value={endDate}
              onChange={formOnChange}
            /><br />
          </div>
          <div className='flex flex-col mt-5 w-full'>
            <label htmlFor="" className='text-sm font-black'>Location</label>
          <input
            type="text"
            placeholder='venue'
            name="venue"
            className='pl-4 pr-4 mt-2 h-10 md:w-96 w-full shadow-[#f5f5f5c9] shadow-formbox text-sm rounded-sm bg-formbg'
            value={venue}
            onChange={formOnChange}
          /><br />
          </div>
          <div className='flex flex-col mt-5 w-full'>
            <label htmlFor="" className='text-sm font-black'>Description</label>
          <textarea 
          name="description" 
          cols="30" 
          rows="5" 
          placeholder='Description'
          className='pl-4 pr-4 pt-2 pb-2 mt-2 md:w-96 w-full shadow-[#f5f5f5c9] shadow-formbox text-sm rounded-md bg-formbg'
          value={description}
          onChange={formOnChange}
          >
          </textarea>
          </div>
          <div className='flex justify-start items-start w-full'>
          <input type="submit" name="submit" value="Create" className='md:w-80 w-full h-10 text-sm bg-blue text-white mt-10 rounded-md font-extrabold' />
          </div>
        </form>
      </div>
    </main>
  )
}

export default EventForm