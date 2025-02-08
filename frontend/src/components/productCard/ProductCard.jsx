import React from 'react'
import { Link } from "react-router-dom"
import { IoHeartOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import { FaRegStar, FaStar } from "react-icons/fa6";

const ProductCard = ({ productName, productPrice, productRating, productReviews, imgUrl, productId }) => {

    return (
        <div className="card shadow-xl w-[24%] px-4 pb-10 pt-4 border-2 border-white hover:border-slate-200 cursor-pointer rounded-xl mb-20">
            <Link to={`/product/${productId}`}>
                <div className="flex justify-center relative mb-14 overflow-hidden h-64">
                    <div
                        className='flex items-center justify-center p-4'>
                        <img src={imgUrl} alt=""
                            className='h-full' />
                    </div>
                    <div className="flex flex-col gap-4 absolute right-4">
                        <IoHeartOutline className='hover:text-red-600  rounded-full p-1 bg-white text-4xl' />
                        <FaRegEye className='hover:text-red-600  rounded-full p-1 bg-white text-4xl' />
                    </div>
                </div>
                <h3 className='text-2xl'>{productName}</h3>
                <div className="flex my-2">
                    <p className='text-red-500 font-bold my-4'>Rs.{productPrice}</p>
                </div>
                <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, index) => (
                        <span key={index}>
                            {index < productRating ? <FaStar /> : <FaRegStar className="text-orange-500" />}
                        </span>
                    ))}
                    <span className='ml-2 mr-2 font-bold text-slate-400'>({productReviews})</span>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard