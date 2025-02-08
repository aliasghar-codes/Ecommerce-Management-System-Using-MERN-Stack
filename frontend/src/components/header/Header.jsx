import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios"
import { IoMdSearch } from "react-icons/io";
import { GrCart } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import { setIsAuthenticated, setUser } from '../../context/slices/auth.js';
import { toast } from 'react-toastify';

const Header = () => {

    const [searchText, setSearchText] = useState("");

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
        if(e.key == "Enter"){
            navigateTo(`/products?name=${searchText}`)
            e.preventDefault();
        }
    }

    return (
        <header className="border-b-2">
            <div className="px-40 flex items-center justify-between font-semibold h-44">
                <Link to="/"
                    className='text-5xl text-red-500 font-extrabold hover:text-red-600'>
                    PSM
                </Link>
                <ul className="flex gap-20">
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
                <div className="flex items-center gap-10">
                    <form action="#"
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
                    {
                        role === "customer" ? (
                            <Link to="/cart">
                                <GrCart className='cursor-pointer text-3xl' />
                            </Link>
                        ) : null
                    }
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
            </div>
        </header>
    )
}

export default Header