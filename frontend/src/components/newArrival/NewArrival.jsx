import React from 'react'
import { Link } from 'react-router-dom'
import "./NewArrival.css"

const NewArrival = () => {
    return (
        <section className="sixth-section container">
                <div className="heading">Featured</div>
                <h2>New Arrival</h2>
                <div className="sixth-container">
                    <div className="sixth-left">
                        <h3>Playstation 5</h3>
                        <p>Black and White version of the PS5 coming out on sale.</p>
                        <Link to="/product/679a8c83d0f2a82da2ae9000">Shop Now</Link>
                    </div>
                    <div className="sixth-right-top">
                        <h3>Women's Collection</h3>
                        <p>Featured woman collections that give you another vibe.</p>
                        <Link to="/products/category/female">Shop Now</Link>
                    </div>
                    <div className="sixth-right-bottom-1">
                        <h3>Speakers</h3>
                        <p>Amazon wireless speakers</p>
                        <Link to="/products/category/music">Shop Now</Link>
                    </div>
                    <div className="sixth-right-bottom-2">
                        <h3>Perfume</h3>
                        <p>GUCCI INTENSE OUD EDP</p>
                        <Link to="/products/category/perfume">Shop Now</Link>
                    </div>
                </div>
            </section>
    )
}

export default NewArrival