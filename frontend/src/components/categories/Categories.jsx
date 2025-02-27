import React from 'react'
import { Link } from "react-router-dom"
import { FiSmartphone } from "react-icons/fi";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { BsSmartwatch } from "react-icons/bs";
import { FiCamera } from "react-icons/fi";
import { BsHeadphones } from "react-icons/bs";
import { IoGameControllerOutline } from "react-icons/io5";

export const categories = () => {
    return (
        <section className="pt-36 lg:px-40 px-6 border-b-2">
                <div className="heading">Categories</div>
                <h2 className='lg:text-6xl text-4xl font-medium lg:font-semibold mt-16 lg:mb-32 mb-24'>
                    Browse By Category
                </h2>
                <div className="flex justify-between flex-wrap my-36 px-10 lg:px-0">
                    <Link to="/products/category/phones" 
                        className="border-2 flex flex-col items-center justify-center lg:w-[15%] w-64 mb-20 py-14 rounded-lg text-2xl transition-all cursor-pointer hover:border-none hover:bg-red-500 hover:text-white" >
                        <FiSmartphone className='text-6xl mb-12' />
                        <p>Phones</p>
                    </Link>
                    <Link to="/products/category/computer" 
                        className="border-2 flex flex-col items-center justify-center lg:w-[15%] w-64 mb-20 py-14 rounded-lg text-2xl transition-all cursor-pointer hover:border-none hover:bg-red-500 hover:text-white" >
                        <HiMiniComputerDesktop className='text-6xl mb-12' />
                        <p>Computers</p>
                    </Link>
                    <Link to="/products/category/watch" 
                        className="border-2 flex flex-col items-center justify-center lg:w-[15%] w-64 mb-20 py-14 rounded-lg text-2xl transition-all cursor-pointer hover:border-none hover:bg-red-500 hover:text-white" >
                        <BsSmartwatch className='text-6xl mb-12' />
                        <p>Smart Watches</p>
                    </Link>
                    <Link to="/products/category/camera" 
                        className="border-2 flex flex-col items-center justify-center lg:w-[15%] w-64 mb-20 py-14 rounded-lg text-2xl transition-all cursor-pointer hover:border-none hover:bg-red-500 hover:text-white" >
                        <FiCamera className='text-6xl mb-12' />
                        <p>Cameras</p>
                    </Link>
                    <Link to="/products/category/headphone" 
                        className="border-2 flex flex-col items-center justify-center lg:w-[15%] w-64 mb-20 py-14 rounded-lg text-2xl transition-all cursor-pointer hover:border-none hover:bg-red-500 hover:text-white" >
                        <BsHeadphones className='text-6xl mb-12' />
                        <p>HeadPhones</p>
                    </Link>
                    <Link to="/products/category/gaming" 
                        className="border-2 flex flex-col items-center justify-center lg:w-[15%] w-64 mb-20 py-14 rounded-lg text-2xl transition-all cursor-pointer hover:border-none hover:bg-red-500 hover:text-white" >
                        <IoGameControllerOutline className='text-6xl mb-12' />
                        <p>Gaming</p>
                    </Link>
                </div>
            </section>
    )
}

export default categories