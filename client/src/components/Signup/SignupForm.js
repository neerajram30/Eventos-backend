import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {register, reset} from '../../features/auth/authSlice'


function SignupForm() {
    const [formData, setformData] = useState({ username: '', email: '', password: '' });
    const { username, email, password } = formData;
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state)=>state.auth
    )

    useEffect(()=>{
        if(isError){
            console.log(message);
        }
        if(isSuccess || user){
            navigate('/login')
        }
        dispatch(reset())
    },[user, isError, isSuccess, message, navigate, dispatch])

    const formOnChange = (e) => {
        setformData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const formOnSubmit = (e) => {
        e.preventDefault();
        const userData = {
            username,
            email,
            password
        }

        dispatch(register(userData))
    }


    if (isLoading){
        console.log('loading')
    }

    return (
        <div className='md:mr-32 mr-0 pl-3 pr-3 md:pl-0 md:pr-0'>
            <div className='font-sora md:text-4xl text-2xl md:mt-0 mt-10'>
                <h2>Signup</h2>
            </div>
            <form className='md:mt-10 mt-6 md:w-80 w-full' onSubmit={formOnSubmit}>
                <input
                    type="text"
                    placeholder='User name'
                    name="username"
                    className='pl-4 pr-4 h-10 md:w-80 w-full hover:shadow-formhover border-[#d4d4d4] border-[1px] text-sm rounded-md'
                    value={username}
                    onChange={formOnChange}
                /><br />
                <input
                    type="text"
                    placeholder='Email'
                    name="email"
                    className='pl-4 pr-4 mt-5 h-10 md:w-80 w-full hover:shadow-formhover border-[#d4d4d4] border-[1px] text-sm rounded-md'
                    value={email}
                    onChange={formOnChange}
                /><br />
                <input
                    type="password"
                    placeholder='Password'
                    name="password"
                    className='pl-4 pr-4 mt-5 h-10 md:w-80 w-full hover:shadow-formhover border-[#d4d4d4] border-[1px] text-sm rounded-md'
                    value={password}
                    onChange={formOnChange}
                /><br />
                <input type="submit" name="submit" value="Register" className='md:w-80 w-full h-10 text-sm bg-blue text-white mt-10 rounded-sm font-extrabold' />
            </form>
        </div>
    )
}

export default SignupForm