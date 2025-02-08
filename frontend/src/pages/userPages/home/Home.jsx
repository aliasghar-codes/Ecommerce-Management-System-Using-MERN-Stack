import React from 'react'
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
    
    return (
        <main>

            <Hero />

            <JustForYou />

            <Categories />

            <PcParts />
            
            <section 
                className="bg-black rounded-lg flex items-center justify-between px-14 py-12 w-5/6 mx-auto">
                <div className="w-1/3">
                    <h3 className='text-green-500'>Categories</h3>
                    <h2
                        className='font-semibold text-white text-6xl leading-snug mt-12 mb-20'>
                        Enhance Your Music Experience
                    </h2>
                    <Link to="/products/category/music"
                        className='bg-green-500 hover:bg-green-600 text-white py-6 px-12 rounded'>
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