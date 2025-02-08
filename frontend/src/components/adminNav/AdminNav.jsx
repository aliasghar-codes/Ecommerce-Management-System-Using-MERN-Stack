import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LuCircleParking } from "react-icons/lu";
import { RiBillLine, RiCoupon2Line } from "react-icons/ri";

import {
    MdKeyboardArrowUp,
    MdKeyboardArrowDown,
    MdOutlineDashboard,
    MdOutlineMessage,
} from "react-icons/md";

import {
    IoPersonOutline
} from "react-icons/io5";

const adminNav = () => {

    const [isHome, setIsHome] = useState(false);
    const [isProductsExpanded, setIsProductsExpanded] = useState(false);
    const [isProductActive, setIsProductActive] = useState(false);
    const [isMembersExpanded, setIsMembersExpanded] = useState(false);
    const [isMemberActive, setIsMemberActive] = useState(false);
    const [loading, setLoading] = useState(true);

    const currentRoute = useLocation().pathname;

    useEffect(() => {
        if (currentRoute === "/admin") {
            setIsHome(true);
        }else if(currentRoute === "/admin/member/admin"){
            setIsMembersExpanded(true);
            setIsMemberActive(true);
        }else if(
            currentRoute === "/admin/product/add" ||
            currentRoute === "/admin/product/delete" ||
            currentRoute === "/admin/product/list" ||
            currentRoute === "/admin/product/category"
        ){
            setIsProductsExpanded(true);
            setIsProductActive(true);
        }

        setLoading(false);
    }, [currentRoute]);

    const resetState = () => {
        setIsProductsExpanded(false);
        setIsProductActive(false);

        setIsMembersExpanded(false);
        setIsMemberActive(false);

        setIsHome(false);
    }

    const handleProductsClick = () => {
        setIsMembersExpanded(false);
        setIsMemberActive(false);

        setIsProductsExpanded(!isProductsExpanded);

        setIsHome(false);
    }
    
    const handleMembersClick = () => {
        setIsProductsExpanded(false);
        setIsProductActive(false);

        setIsMembersExpanded(!isMembersExpanded);

        setIsHome(false);
    }

    const handleMemberStyle = ({ isActive }) => {
        if(isActive){
            setIsMemberActive(true);
            return { 
                color: "#991b1b", 
                backgroundColor: "#fef2f2" 
            } 
        }
    }

    const handleProductStyle = ({ isActive }) => {
        if(isActive){
            setIsProductActive(true);
            return { 
                color: "#991b1b", 
                backgroundColor: "#fef2f2" 
            }
        }
    }

    if(loading){
        return(
            <div className='loading'>Loading...</div>
        )
    }

    return (
        <nav className='min-h-[100vh] border-2 border-gray-200 w-1/5 py-8 px-6 bg-white'>
            <Link to="/" className='font-extrabold text-5xl text-red-600 tracking-tighter'>
                PSM
            </Link>
            <ul className='mt-16 flex flex-col gap-7'>
                <li>
                    <NavLink to="/admin"
                        onClick={resetState}
                        style={isHome ? { color: "#991b1b", backgroundColor: "#fef2f2" } : {}}
                        className='flex items-center gap-6 hover:text-red-800 hover:bg-red-50 py-4 px-2 rounded-sm'>
                        <MdOutlineDashboard className='text-3xl' />
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <h4
                        onClick={handleProductsClick}
                        style={isProductsExpanded || isProductActive ? { color: "#991b1b" } : {}}
                        className='flex items-center justify-between hover:text-red-800 hover:bg-red-50 py-4 px-2 rounded-sm cursor-pointer font-bold mb-1'>
                        <span className='flex items-center gap-6'>
                            <LuCircleParking className='text-3xl' />
                            Products
                        </span>
                        {
                            isProductsExpanded ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />
                        }
                    </h4>
                    {isProductsExpanded ? (
                        <ul className='ml-14'>
                            <li>
                                <NavLink to="/admin/product/add"
                                    style={handleProductStyle}
                                    className='flex items-center justify-between hover:text-red-800 hover:bg-red-50 py-4 px-2 rounded-sm mb-1'>
                                    Product Add 
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/product/delete"
                                    style={handleProductStyle}
                                    className='flex items-center justify-between hover:text-red-800 hover:bg-red-50 py-4 px-2 rounded-sm mb-1'>
                                    Product Delete
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/product/list"
                                    style={handleProductStyle}
                                    className='flex items-center justify-between hover:text-red-800 hover:bg-red-50 py-4 px-2 rounded-sm mb-1'>
                                    Products List
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/product/category"
                                    style={handleProductStyle}
                                    className='flex items-center justify-between hover:text-red-800 hover:bg-red-50 py-4 px-2 rounded-sm mb-1'>
                                    Manage Categories
                                </NavLink>
                            </li>
                        </ul>) : null}
                </li>
                <li>
                    <NavLink to="/admin/coupons"
                        onClick={resetState}
                        className={({ isActive }) => isActive ? "flex items-center gap-6 text-red-800 bg-red-50 py-4 px-2 rounded-sm" : 'flex items-center gap-6 hover:text-red-800 hover:bg-red-50 py-4 px-2 rounded-sm'}>
                        <RiCoupon2Line />
                        Coupons
                    </NavLink>
                </li>
                <li>
                    <h4
                        onClick={handleMembersClick}
                        style={ isMemberActive || isMembersExpanded ? { color: "#991b1b" } : {}}
                        className='flex items-center justify-between hover:text-red-800 hover:bg-red-50 py-4 px-2 rounded-sm font-bold cursor-pointer mb-1'>
                        <span className='flex items-center gap-6'>
                            <IoPersonOutline className='text-3xl' />
                            Members
                        </span>
                        <MdKeyboardArrowUp />
                    </h4>
                    {isMembersExpanded ? (
                        <ul className='ml-14'>
                            <li>
                                <NavLink to="/admin/member/admin"
                                    style={handleMemberStyle}
                                    className='flex items-center justify-between hover:text-red-800 hover:bg-red-50 py-4 px-2 rounded-sm mb-1'>
                                    Create Admin
                                </NavLink>
                            </li>
                        </ul>) : null}
                </li>
                <li>
                    <NavLink to="/admin/orders"
                        onClick={resetState}
                        className={({ isActive }) => isActive ? "flex items-center gap-6 text-red-800 bg-red-50 py-4 px-2 rounded-sm" : 'flex items-center gap-6 hover:text-red-800 hover:bg-red-50 py-4 px-2 rounded-sm'}>
                        <RiBillLine />
                        Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/messages"
                        onClick={resetState}
                        className={({ isActive }) => isActive ? "flex items-center gap-6 text-red-800 bg-red-50 py-4 px-2 rounded-sm" : 'flex items-center gap-6 hover:text-red-800 hover:bg-red-50 py-4 px-2 rounded-sm'}>
                        <MdOutlineMessage />
                        Messages
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default adminNav