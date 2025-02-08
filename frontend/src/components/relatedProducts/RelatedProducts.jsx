import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from "../productCard/ProductCard.jsx"
import axios from "axios"

const RelatedProducts = ({ category }) => {
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get(`/api/v1/product/related-products/${category}`);
        setProducts(response.data.data);
    }

    return (
        <section style={{ paddingBottom: "4.5rem" }} className="container border-b-2 border-b-slate-200">
                <h2 className='text-4xl font-bold mb-20'>Related Products</h2>
                <div className="mt-15 flex w-full flex-wrap gap-[1%] mb-20">
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
                <Link to="/products" className="main-btn">View All Products</Link>
            </section>
    )
}

export default RelatedProducts