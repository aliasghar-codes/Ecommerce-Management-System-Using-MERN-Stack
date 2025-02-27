import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authImg from "../../../assets/images/cart with mobile.png"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setIsAuthenticated, setUser } from '../../../context/slices/auth.js'
import { toast } from 'react-toastify'

const Signup = () => {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector( state => state.isAuthenticated )

    useEffect(() => {
        if (isAuthenticated) {
            navigateTo("/");
        }
    });

    async function handleRegister(event) {
        event.preventDefault();

        if (
            !userName ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            toast.error("Please fill full form");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be same");
            return;
        }

        try {
            let apiResponse = await axios.post(`/api/v1/user/register`, {
                userName,
                email,
                password
            },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const expiryDate = new Date(Date.now() + 172800000);

            localStorage.setItem("user", JSON.stringify(apiResponse.data.data.user));
            localStorage.setItem("accessToken", JSON.stringify(apiResponse.data.data.token));
            localStorage.setItem("expiry", expiryDate);
            dispatch(setIsAuthenticated(true));
            dispatch(setUser(apiResponse.data.data));

            toast.success(`${apiResponse.data.data.user.userName} registered successfully`);

        } catch (error) {

            error.response ? toast.error(error.response.data.message) : toast.error("An unexpected error occured");
            return;
        }
        
        navigateTo("/");
    }

    return (
        <main className='flex my-36 gap-20 items-center px-6 lg:px-0'>
            <img src={authImg} alt=""
                className='w-1/2 rounded hidden lg:block' />
            <div className="lg:w-2/5 w-full">
                <h2 className='lg:mb-10 mb-6 text-4xl lg:text-5xl'>Create an account</h2>
                <p className='lg:text-xl text-base mb-20 text-slate-400'>Enter your details below</p>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        style={{borderBottom: "2px solid rgba(128, 128, 128, 0.200)"}}
                        className='w-full lg:my-5 my-4 py-5 lg:border-none border-2 outline-none px-4 lg:px-0'
                        placeholder="Username"
                        value={userName}
                        onChange={e => { setUserName(e.target.value) }}
                    />
                    <input
                        type="email"
                        style={{borderBottom: "2px solid rgba(128, 128, 128, 0.200)"}}
                        className='w-full lg:my-5 my-4 py-5 lg:border-none border-2 outline-none px-4 lg:px-0'
                        placeholder="Email"
                        value={email}
                        onChange={e => { setEmail(e.target.value) }}
                    />
                    <input
                        type="password"
                        style={{borderBottom: "2px solid rgba(128, 128, 128, 0.200)"}}
                        className='w-full lg:my-5 my-4 py-5 lg:border-none border-2 outline-none px-4 lg:px-0'
                        placeholder="Password"
                        value={password}
                        onChange={e => { setPassword(e.target.value) }}
                    />
                    <input
                        type="password"
                        style={{borderBottom: "2px solid rgba(128, 128, 128, 0.200)"}}
                        className='w-full lg:my-5 my-4 py-5 lg:border-none border-2 outline-none px-4 lg:px-0'
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={e => { setConfirmPassword(e.target.value) }}
                    />
                    <p className='error'>{error}</p>
                    <button type='submit' className="w-full my-10 text-white bg-red-500 hover:bg-red-600 py-5 rounded">Create Account</button>
                    <div className="lg:mt-10 mt-5 flex items-center gap-6">
                        <p className='text-xl lg:text-2xl'>Already have an account?</p>
                        <Link to="/login" className='underline hover:text-slate-800 text-xl lg:text-2xl'>
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Signup