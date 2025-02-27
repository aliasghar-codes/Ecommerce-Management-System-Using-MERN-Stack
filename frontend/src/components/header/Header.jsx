import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios"
import { IoMdSearch } from "react-icons/io";
import { GrCart } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import { MdHome, MdOutlineMessage, MdPeople } from "react-icons/md";
import { IoMenu, IoPerson, IoClose } from "react-icons/io5";
import { setIsAuthenticated, setUser } from '../../context/slices/auth.js';
import { toast } from 'react-toastify';

const Header = () => {

    const [searchText, setSearchText] = useState("");
    const [isMobileNav, setIsMobileNav] = useState(false);

    const navigateTo = useNavigate();

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.isAuthenticated);
    const role = useSelector(state => state.user.role);

    const handleLogout = async () => {

        if (!isAuthenticated) {
            setError("You are not logged in");
            return;
        }

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

        } catch (error) {
            error.response ? toast.error(error.response.data.message) : toast.error(error);
        };
    }

    const handleSearch = (e) => {
        if (e.key == "Enter") {
            navigateTo(`/products?name=${searchText}`)
            e.preventDefault();
        }
    }

    return (
        <>
            <header className="border-b-2">
                <div className="lg:px-40 px-4 flex items-center justify-between font-semibold lg:h-44 h-28">
                    <Link to="/"
                        className='lg:text-5xl text-3xl text-red-500 font-extrabold hover:text-red-600'>
                        PSM
                    </Link>
                    <ul className="lg:flex hidden gap-20">
                        <li>
                            <NavLink to="/" className={({ isActive }) => ` ${isActive ? "border-b-2 border-slate-300" : ""}`}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={({ isActive }) => ` ${isActive ? "border-b-2 border-slate-300" : ""}`}>
                                Contact
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={({ isActive }) => ` ${isActive ? "border-b-2 border-slate-300" : ""}`}>
                                About
                            </NavLink>
                        </li>
                        <li>
                            {
                                isAuthenticated && role !== "admin" ? (
                                    <Link onClick={handleLogout}>
                                        Logout
                                    </Link>
                                ) : null
                            }
                            {
                                !isAuthenticated && (
                                    <NavLink to="/login" className={({ isActive }) => ` ${isActive ? "nav-link-active" : ""}`}>
                                        Login
                                    </NavLink>
                                )
                            }
                        </li>
                    </ul>
                    <div className="lg:flex hidden items-center gap-10">
                        <form
                            className='py-5 pr-7 rounded flex items-center bg-slate-100'>
                            <input type="text"
                                placeholder="What are you looking for?"
                                value={searchText}
                                onKeyDown={handleSearch}
                                onChange={({ target }) => setSearchText(target.value)}
                                className='bg-transparent pl-7 pr-3 outline-none text-2xl' />
                            <Link to={`/products?name=${searchText}`}>
                                <IoMdSearch className='cursor-pointer text-3xl' />
                            </Link>
                        </form>
                        <Link to="/cart">
                            <GrCart className='cursor-pointer text-3xl' />
                        </Link>
                        {
                            isAuthenticated ?
                                role === "admin" ? (
                                    <Link to="/admin">
                                        <RiAdminFill className='cursor-pointer text-3xl' />
                                    </Link>
                                ) : null
                                : null
                        }
                    </div>
                    <div className='lg:hidden cursor-pointer' onClick={() => setIsMobileNav(true)}>
                        <IoMenu className='pointer-events-none text-3xl' />
                    </div>
                    <div className={`${isMobileNav ? "right-0" : "hidden"} absolute h-screen bg-white w-full top-0 lg:hidden z-50`}>
                        <div className="bg-red-500 text-white h-28 px-4 flex items-center justify-between mb-20">
                            <Link onClick={() => setIsMobileNav(false)} to="/login" className='text-white text-3xl flex gap-5 items-center font-normal'>
                                <IoPerson /> Login & Signup
                            </Link>
                            <button onClick={() => setIsMobileNav(false)}>
                                <IoClose className='pointer-events-none text-3xl font-bold' />
                            </button>
                        </div>
                        <ul className='px-4 flex flex-col gap-14 text-3xl'>
                            <li className='border-b pb-5'>
                                <Link onClick={() => setIsMobileNav(false)}
                                    to="/" className='flex items-center gap-4 text-gray-600 font-sans' >
                                    <MdHome className='text-2xl' /> Home
                                </Link>
                            </li>
                            <li className='border-b pb-5'>
                                <Link onClick={() => setIsMobileNav(false)}
                                    to="/contact"
                                    className='flex items-center gap-4 text-gray-600 font-sans' >
                                    <MdOutlineMessage className='text-2xl' /> Contact us
                                </Link>
                            </li>
                            <li className='border-b pb-5'>
                                <Link onClick={() => setIsMobileNav(false)}
                                    to="/about" className='flex items-center gap-4 text-gray-600 font-sans' >
                                    <MdPeople className='text-2xl' /> About us
                                </Link>
                            </li>
                            <li className='border-b pb-5'>
                                <Link onClick={() => setIsMobileNav(false)}
                                    to="/cart" className='flex items-center gap-4 text-gray-600 font-sans' >
                                    <GrCart className='text-2xl' /> My Cart
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <section className="lg:hidden border-b-2 mt-6 pb-6 px-4">
                <form
                    className='py-5 pr-7 rounded flex items-center bg-slate-100'>
                    <input type="text"
                        placeholder="What are you looking for?"
                        value={searchText}
                        onKeyDown={handleSearch}
                        onChange={({ target }) => setSearchText(target.value)}
                        className='bg-transparent w-full pl-7 pr-3 outline-none text-2xl' />
                    <Link to={`/products?name=${searchText}`}>
                        <IoMdSearch className='cursor-pointer text-3xl' />
                    </Link>
                </form>
            </section>
        </>
    )
}

export default Header