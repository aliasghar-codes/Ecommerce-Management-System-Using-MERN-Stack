import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import { setIsAuthenticated, setUser } from '../../context/slices/auth';

const AdminHeader = ({ heading }) => {

    const [showAdminName, setShowAdminName] = useState("");

    const adminName = useSelector(state => state.user.userName);

    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    useEffect(() => {
        let dummyString = "";

        adminName.split(" ")
            .forEach(str => {
                dummyString += str.charAt("0");
            });

        setShowAdminName(dummyString);
    });

    const handleAdminLogout = async e => {
        try {
            await axios.get("/api/v1/user/logout", {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            localStorage.clear();
            dispatch(setIsAuthenticated(false));
            dispatch(setUser({}));

            navigateTo("/admin-login");

        } catch (error) {
            error.response ? toast.error(error.response.data.message) : toast.error(error);
        };
    }

    return (
        <header className='bg-white h-48 mb-5 px-14 flex justify-between items-center'>
            <h2 className='text-4xl font-bold tracking-wide'>{heading}</h2>
            <div className='flex items-center gap-9'>
                <div className='flex items-center gap-5 select-none'>
                    <div
                        className='bg-slate-200 text-gray-800 p-5 tracking-widest rounded-full'>
                        {showAdminName}
                    </div>
                    <button
                        onClick={handleAdminLogout}
                        className='font-bold text-2xl border-2 hover:bg-red-500 hover:text-white hover:border-white rounded py-3 px-8 transition-all'>
                        Logout
                    </button>
                </div>
            </div>
        </header>
    )
}

export default AdminHeader