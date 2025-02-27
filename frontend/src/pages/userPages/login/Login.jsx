import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAuthenticated, setUser } from '../../../context/slices/auth.js'
import axios from 'axios'
import authImg from "../../../assets/images/cart with mobile.png"
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector( state => state.isAuthenticated )

    useEffect(() => {
        if (isAuthenticated) {
            navigateTo("/");
        }
    });

    async function handleLogin(event){
        event.preventDefault();
        
        if(
            !email ||
            !password
        ){
            toast.error("Please fill full form");
            return;
        }

        try {
            let apiResponse = await axios.post(`/api/v1/user/login`, {
                email,
                password
            },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const expiryDate = new Date(Date.now() + 172800000);
            
            localStorage.setItem("user", JSON.stringify(apiResponse.data.data.user));
            localStorage.setItem("accessToken", JSON.stringify(apiResponse.data.data.token));
            localStorage.setItem("expiry", expiryDate);

            dispatch(setIsAuthenticated(true));
            dispatch(setUser(apiResponse.data.data));

            toast.success(`${apiResponse.data.data.user.userName} loggedin successfully`);

        } catch (error) {
            error.response ? toast.error(error.response.data.message) : toast.error("An unexpected error occured");
            return;
        }

        navigateTo("/");
    }

    return (
        <main className='flex my-36 gap-20 items-center px-6 lg:px-0' >
        <img src={ authImg } alt=""
            className='w-1/2 rounded hidden lg:block' />
        <div className="lg:w-2/5 w-full">
            <h2 className='lg:mb-10 mb-6 text-4xl lg:text-5xl'>Login to PSM</h2>
            <p className='lg:text-xl text-base mb-20 text-slate-400'>Enter your details below</p>
            <form onSubmit={ handleLogin }>
                <input
                    style={{borderBottom: "2px solid rgba(128, 128, 128, 0.200)"}}
                    className='w-full my-10 py-5 lg:border-none border-2 outline-none px-4 lg:px-0' 
                    type="email" 
                    placeholder="Email or Phone Number" 
                    value={ email }
                    onChange={ ({ target }) => setEmail(target.value)}
                />
                <input
                    style={{borderBottom: "2px solid rgba(128, 128, 128, 0.200)"}}
                    className='w-full my-10 py-5 lg:border-none border-2 outline-none px-4 lg:px-0' 
                    type="password" 
                    placeholder="Password" 
                    value={ password }
                    onChange={ ({ target }) => setPassword(target.value)}
                />
                <button type='submit' className="w-full my-10 text-white bg-red-500 hover:bg-red-600 py-5 rounded">Login</button>
                <div className="mt-14 flex items-center gap-6">
                    <p className='text-xl lg:text-2xl'>Don't have an account?</p>
                    <Link
                        className='underline hover:text-slate-800 text-xl lg:text-2xl'
                        to="/signup" >
                        Signup
                    </Link>
                </div>
            </form>
        </div>
    </main>
    )
}

export default Login;