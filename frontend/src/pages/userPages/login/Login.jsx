import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAuthenticated, setUser } from '../../../context/slices/auth.js'
import axios from 'axios'
import "./Login.css"
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
        <main className='login-main'>
        <img src={ authImg } alt="" />
        <div className="main-content">
            <h2>Login to PSM</h2>
            <p>Enter your details below</p>
            <form onSubmit={ handleLogin }>
                <input 
                    type="email" 
                    placeholder="Email or Phone Number" 
                    value={ email }
                    onChange={ ({ target }) => setEmail(target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={ password }
                    onChange={ ({ target }) => setPassword(target.value)}
                />
                <button type='submit' className="main-btn">Login</button>
                <div className="login">
                    <p>Don't have an account?</p>
                    <Link to="/signup">Signup</Link>
                </div>
            </form>
        </div>
    </main>
    )
}

export default Login;