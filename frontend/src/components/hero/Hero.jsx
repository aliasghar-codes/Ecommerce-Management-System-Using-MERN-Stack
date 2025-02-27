import React from 'react'
import { Link } from 'react-router-dom'
import HeroImg from "../../assets/images/header-image.jpg"

const Hero = () => {
    return (
        <section className="flex items-start mb-40 lg:px-40 px-6 justify-between">
            <ul className='border-r-2 w-1/5 pt-20 lg:block hidden'>
                <li className='mb-6'>
                    <Link to="/products/category/female">Woman’s Fashion</Link>
                </li>
                <li className='mb-6'>
                    <Link to="/products/category/male">Men’s Fashion</Link>
                </li>
                <li className='mb-6'>
                    <Link to="/products/category/electronics">Electronics</Link>
                </li>
                <li className='mb-6'>
                    <Link to="/products/category/home">Home & Lifestyle</Link>
                </li>
                <li className='mb-6'>
                    <Link to="/products/category/medicine">Medicine</Link>
                </li>
                <li className='mb-6'>
                    <Link to="/products/category/sports">Sports & Outdoor</Link>
                </li>
                <li className='mb-6'>
                    <Link to="/products/category/baby">Baby’s & Toys</Link>
                </li>
                <li className='mb-6'>
                    <Link to="/products/category/groceries">Groceries & Pets</Link>
                </li>
                <li className='mb-6'>
                    <Link to="/products/category/health">Health & Beauty</Link>
                </li>
            </ul>
            <img src={HeroImg} alt="Her section banner"
                className='rounded-lg lg:w-3/4 w-full pt-20' />
        </section>
    )
}

export default Hero