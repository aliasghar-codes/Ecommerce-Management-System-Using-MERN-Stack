import React, { useEffect, useState } from 'react'
import AdminHeader from '../../../components/adminHeader/AdminHeader'
import { toast } from 'react-toastify';
import axios from 'axios';

const ProductDelete = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const serverUrl = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        fetchProducts();
    }, [ allProducts ]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("/api/v1/product/list");
            setAllProducts(response.data.data);
        } catch (error) {
            toast.error(error.response?.data.message || error);
        }
    }

    const handleProductSelect = async ({ target }) => {
        const _id = target.value;
        const filteredArray = allProducts.filter( obj => obj._id === _id);
        setSelectedProduct(filteredArray[0]);

        setImageUrl(filteredArray[0].images[0]);
    }   

    const handleProductDelete = async () => {
        if(!selectedProduct) return;

        try {
            const response = await axios.delete(`/api/v1/product/delete/${selectedProduct._id}`);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data.message || error);
        }

        setSelectedProduct("");
        fetchProducts();
    }

    return (
        <main className='w-full'>
            <AdminHeader heading={"Delete Product"} />
            <section className='bg-white ml-5 px-10 pt-14 pb-28'>
                <h2
                    className="mb-16 text-4xl">
                    Select Product
                </h2>
                <form>
                    <div className='flex items-center mb-5'>
                        <label htmlFor="category" className='w-1/5 inline-block text-3xl'>Name: </label>
                        <select
                            name="category"
                            value={selectedProduct ? selectedProduct._id : ""}
                            onChange={handleProductSelect}
                            className='border-2 border-gray-300 w-1/2 py-4 px-6 outline-none rounded bg-white cursor-pointer'>
                            <option value="">Select</option>
                            {
                                allProducts?.map(product => <option key={product._id} value={product._id}>{product.name}</option>)
                            }
                        </select>
                    </div>
                </form>
            </section>
            {
                selectedProduct?._id && <div className="flex w-full">
                <section className='bg-white ml-5 px-10 pt-14 pb-28 w-2/3'>
                    <h2
                        className="mb-16 text-4xl">
                        Selected Product Details
                    </h2>
                    <div className='flex items-center mb-5'>
                        <label htmlFor="name" className='w-1/5 inline-block text-3xl'>Name: </label>
                        <input
                            disabled
                            value={selectedProduct.name}
                            className="border-2 border-gray-300 py-1 px-4 w-full outline-none"
                            type="text" />
                    </div>
                    <div className='flex items-center mb-5'>
                        <label htmlFor="description" className='w-1/5 inline-block text-3xl'>Description: </label>
                        <input
                            disabled
                            value={selectedProduct.description}
                            className="border-2 border-gray-300 py-1 px-4 w-full outline-none"
                            type="text" />
                    </div>
                    <div className='flex items-center mb-5'>
                        <label htmlFor="price" className='w-1/5 inline-block text-3xl'>Price: </label>
                        <input
                            disabled
                            value={selectedProduct.price}
                            className="border-2 border-gray-300 py-1 px-4 w-full outline-none"
                            type="text" />
                    </div>
                    <button
                        onClick={handleProductDelete}
                        className='bg-red-500 text-white rounded-md py-5 px-16 font-semibold text-2xl mt-14 hover:bg-red-600' >
                        Delete
                    </button>
                </section>
                <section className='bg-white px-10 pt-14 pb-28 w-1/3 flex justify-center items-center'>
                    <img 
                        src={`http://${serverUrl}${imageUrl}`} 
                        className="w-full"
                        alt="" />
                </section>
            </div> }
        </main>
    )
}

export default ProductDelete