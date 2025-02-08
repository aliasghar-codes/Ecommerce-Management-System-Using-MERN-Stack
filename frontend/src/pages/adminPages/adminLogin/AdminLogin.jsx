import React, { useState } from 'react'
import axios from "axios"
import { SiGnuprivacyguard } from "react-icons/si";
import { useDispatch } from 'react-redux';
import { setIsAuthenticated, setUser } from '../../../context/slices/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogin = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ showError, setShowError ] = useState(""); 

    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const handleAdminLogin = async (event) => {
        event.preventDefault();

        if(!email || !password){
            setShowError("Please fill full form");
            return;
        }

        try {
            const response = await axios.post("/api/v1/admin/login", { email, password }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const expiry = new Date(Date.now() + 172800000)
            
            localStorage.setItem("adminToken", JSON.stringify(response.data.data.token));
            localStorage.setItem("admin", JSON.stringify(response.data.data.admin));
            localStorage.setItem("expiry", expiry);

            dispatch(setIsAuthenticated(true));
            dispatch(setUser(response.data.data.admin));
            
            toast.success(`${response.data.data.admin.userName} loggedin successfully`)

        } catch (error) {
            error.response ? setShowError(error.response.data.message) : setShowError(error);
            return;
        };

        navigateTo("/admin");
    }

    return (
        <main className='flex items-center justify-center min-h-screen'>
            <div className="bg-slate-100 w-1/4 px-8 py-16 rounded-xl text-center">
            <div className='bg-white w-16 h-16 rounded-3xl flex justify-center items-center mx-auto mb-12'>
            <SiGnuprivacyguard />
            </div>
            <h2 className='mb-16 text-5xl font-semibold tracking-tight'>
                Login <sub className='text-xl'>( Admin )</sub>
            </h2>
            <form onSubmit={ handleAdminLogin }>
                <input 
                    type="text" 
                    value={ email }
                    onChange={ ({ target }) => setEmail(target.value)}
                    placeholder='Email'
                    className='outline-none w-full p-6 rounded mb-8'
                    />
                <input 
                    type="password" 
                    value={ password }
                    onChange={ ({ target }) => setPassword(target.value)}
                    placeholder='Password'
                    className='outline-none w-full p-6 rounded mb-8'
                    />
                { showError && (<p className='text-xl text-left'>{ showError }</p>)}
                <button type='submit'
                    className='w-full border-none text-2xl my-8 text-white bg-red-500 py-4 rounded font-semibold hover:bg-red-600'>
                    Login
                </button>
            </form>
            </div>
        </main>
    )
}

export default AdminLogin