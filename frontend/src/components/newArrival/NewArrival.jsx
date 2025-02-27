import React from 'react'
import { Link } from 'react-router-dom'
import "./NewArrival.css"

const NewArrival = () => {
    return (
        <section className="pt-40 px-6 lg:px-40">
                <div className="heading">Featured</div>
                    <h2 className='lg:text-6xl text-4xl font-medium lg:font-semibold mt-16 lg:mb-36 mb-24'>
                        New Arrival
                    </h2>
                <div className="sixth-container">
                    <div className="sixth-left">
                        <h3 className='font-medium lg:text-5xl text-3xl'>
                            Playstation 5
                        </h3>
                        <p>Black and White version of the PS5 coming out on sale.</p>
                        <Link 
                            className='text-slate-300 underline hover:text-white lg:text-xl text-sm' 
                            to="/product/679a8c83d0f2a82da2ae9000">
                                Shop Now
                        </Link>
                    </div>
                    <div className="sixth-right-top">
                        <h3 className='font-medium lg:text-5xl text-3xl'>
                            Women's Collection
                        </h3>
                        <p>Featured woman collections that give you another vibe.</p>
                        <Link 
                            className='text-slate-300 underline hover:text-white lg:text-xl text-sm' 
                            to="/products/category/female">
                                Shop Now
                        </Link>
                    </div>
                    <div className="sixth-right-bottom-1">
                        <h3 className='font-medium lg:text-5xl text-3xl'>
                            Speakers
                        </h3>
                        <p>Amazon wireless speakers</p>
                        <Link 
                            className='text-slate-300 underline hover:text-white lg:text-xl text-sm' 
                            to="/products/category/music">
                                Shop Now
                        </Link>
                    </div>
                    <div className="sixth-right-bottom-2">
                        <h3 className='font-medium lg:text-5xl text-3xl'>
                            Perfume
                        </h3>
                        <p>GUCCI INTENSE OUD EDP</p>
                        <Link 
                            className='text-slate-300 underline hover:text-white lg:text-xl text-sm' 
                            to="/products/category/perfume">
                                Shop Now
                        </Link>
                    </div>
                </div>
            </section>
    )
}

export default NewArrival