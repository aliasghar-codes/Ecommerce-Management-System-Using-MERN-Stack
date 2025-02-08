import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ProductCard from '../../../components/productCard/ProductCard.jsx';
import { useParams } from 'react-router-dom';

const ProductCategory = () => {

    const [itemsFound, setItemsFound] = useState([]);

    const { category } = useParams();

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`/api/v1/product/find/${category}`);
            setItemsFound(res.data.data);
        } catch (error) {
            toast.error("Error occured while fetching products");
        }
    }

    return (
        <main className='my-40 px-40'>
            {
                itemsFound.length > 0 && <h1 className='text-5xl font-bold mb-36'>Your Products</h1>
            }
            <div className=" mt-15 flex w-full flex-wrap gap-6 mb-20">
                {
                    itemsFound.length > 0 ? (
                        itemsFound.map(product => (
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
                    ) : (
                        <h1 className='text-center text-5xl font-bold my-36 w-full'>No products Found</h1>
                    )
                }
            </div>
        </main>
    )
}

export default ProductCategory