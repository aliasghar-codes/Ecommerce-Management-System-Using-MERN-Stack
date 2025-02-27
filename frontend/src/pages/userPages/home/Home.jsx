import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from "../../../components/hero/Hero.jsx"
import Categories from "../../../components/categories/Categories.jsx"
import Service from "../../../components/service/Service.jsx"
import NewArrival from "../../../components/newArrival/NewArrival.jsx"
import speakerBanner from "../../../assets/images/Speaker banner.png"
import JustForYou from '../../../components/justForYou/JustForYou.jsx'
import PcParts from '../../../components/pcParts/PcParts.jsx'
import ExploreProducts from '../../../components/exploreProducts/ExploreProducts.jsx'

const Home = () => {

    useEffect( () => {
        window.scrollTo(0,0);
    }, []);
    
    return (
        <main>

            <Hero />

            <JustForYou />

            <Categories />

            <PcParts />
            
            <section 
                className="bg-black rounded-lg flex items-center justify-between lg:px-14 px-6 py-12 w-11/12 lg:w-5/6 mx-auto">
                <div className="w-1/3">
                    <h3 className='text-green-500 text-xs lg:text-2xl'>Categories</h3>
                    <h2
                        className='font-semibold text-white text-xl lg:text-6xl leading-snug lg:mt-12 mt-4 lg:mb-20 mb-4'>
                        Enhance Your Music Experience
                    </h2>
                    <Link to="/products/category/music"
                        className='bg-green-500 hover:bg-green-600 text-white lg:py-6 py-2 lg:px-12 px-4 lg:text-2xl text-xs rounded'>
                        Buy Now!
                    </Link>
                </div>
                <div className="w-1/3">
                    <img src={ speakerBanner } alt="" 
                        className='h-1/3'/>
                </div>
            </section>
            
            <ExploreProducts />
            
            <NewArrival />

            <Service />
        </main>
    )
}

export default Home