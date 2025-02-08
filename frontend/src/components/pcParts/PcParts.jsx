import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from "../productCard/ProductCard.jsx"
import axios from "axios"

const PcParts = () => {
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get("/api/v1/product/computer-components");
        setProducts(response.data.data);
    }

    return (
    <section className="pt-36 mb-44 px-40">
                <div className="heading">New Added</div>
                <div className="flex justify-between items-center w-full mt-16 mb-36">
                    <h2
                        className='text-6xl font-semibold'>
                        Computer Components
                    </h2>
                    <Link to="/products/category/computer" 
                        className="text-white bg-red-500 hover:bg-red-600 px-14 py-6 rounded text-3xl font-light">View All</Link>
                </div>
                <div className="flex flex-wrap justify-between w-full">
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
            </section>
)
}

export default PcParts