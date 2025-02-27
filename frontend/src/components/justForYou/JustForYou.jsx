import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from "../productCard/ProductCard.jsx"
import axios from "axios"

const JustForYou = () => {

    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get("/api/v1/product/just-for-you");
        setProducts(response.data.data);
    }

    return (
        <section style={{ paddingBottom: "4.5rem" }} className="lg:px-40 px-6 border-b-2 border-b-slate-200">
                <h2 className='lg:text-6xl text-5xl font-medium lg:font-bold lg:mb-32 mb-24'>Just For You</h2>
                <div className=" mt-15 flex w-full flex-wrap justify-between mb-20">
                    {
                        products.map( product => (
                            <ProductCard
                                key={product._id}
                                productName={product.name.slice(0, 45) + "..."}
                                productPrice={product.price}
                                productReviews={0}
                                productRating={0}
                                productId={product._id}
                                imgUrl={`http://localhost:8000/${product.images[0]}`}
                            />
                        ))
                    }
                </div>
                <Link to="/products/category/home" className="text-white bg-red-500 hover:bg-red-600 py-6 rounded text-3xl font-light mx-auto block lg:w-1/6 text-center">View All Products</Link>
            </section>
    )
}

export default JustForYou