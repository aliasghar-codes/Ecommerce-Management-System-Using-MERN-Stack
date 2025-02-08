import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from "../productCard/ProductCard.jsx"
import axios from "axios"

const ExploreProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get("/api/v1/product/explore-products");
        setProducts(response.data.data);
    }

    return (
        <section className="pt-36 mb-44 px-40">
            <div className="heading">Our Products</div>
            <h2 className='text-6xl font-semibold mt-16 mb-36' >
                Explore Our Products
            </h2>
            <div className="flex w-full justify-between flex-wrap">
                {
                    products.map(product => (
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
            <Link to="/products/category/sports" 
                className="text-white bg-red-500 hover:bg-red-600 py-6 rounded text-3xl font-light mx-auto block w-1/6 text-center">
                    View All Products
            </Link>
        </section>
    )
}

export default ExploreProducts