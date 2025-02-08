import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminNav from '../adminNav/AdminNav.jsx'

const adminLayout = () => {
    const isAuthenticated = useSelector(state => state.isAuthenticated);
    const role = useSelector(state => state.user.role);

    const navigateTo = useNavigate();
    
    useEffect(() => {

        if (isAuthenticated && role !== "admin") {
            navigateTo("/");
        }

        if (!isAuthenticated) {
            navigateTo("/admin-login");
        }
        
    }, []);

    return (
        <div className='flex bg-slate-100'>
            <AdminNav />
            <Outlet />
        </div>

    )
}

export default adminLayout