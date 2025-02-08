import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../login/Login.css"
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
        <main className='login-main'>
            <img src={authImg} alt="" />
            <div className="main-content">
                <h2>Create an account</h2>
                <p>Enter your details below</p>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={e => { setUserName(e.target.value) }}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => { setEmail(e.target.value) }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => { setPassword(e.target.value) }}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={e => { setConfirmPassword(e.target.value) }}
                    />
                    <p className='error'>{error}</p>
                    <button type='submit' className="main-btn">Create Account</button>
                    <div className="login">
                        <p>Already have an account?</p>
                        <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Signup