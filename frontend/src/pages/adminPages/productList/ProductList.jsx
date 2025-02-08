import React, { useEffect, useState } from 'react'
import AdminHeader from '../../../components/adminHeader/AdminHeader.jsx'
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductList = () => {

  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    fetchProducts();
    fetchAllCategories();
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/v1/product/list");
      setAllProducts(response.data.data);
    } catch (error) {
      toast.error(error.response?.data.message || error);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get("/api/v1/category/get-all");
      setAllCategories(response.data.data);
    } catch (error) {
      toast.error(error.response?.data.message || error);
    }
  };

  return (
    <main className='w-full'>
      <AdminHeader heading={"All Products list"} />
      <section className='bg-white ml-5 px-10 pt-14 pb-28 min-h-96'>
        <h2
          className="mb-16 text-4xl">
          Products
        </h2>ٖ
        <div>
          <header>
            <ul className="w-full flex bg-gray-100 mb-14 rounded py-6 px-4">
              <li className="w-1/6">Image</li>
              <li className="w-2/6">Name</li>
              <li className="w-2/6">Category</li>
              <li className="w-1/6">Price</li>
            </ul>
          </header>
          <main>
            {
              allProducts.map(product => <div>
                <ul className="w-full flex border-2 border-gray-100 mb-5 rounded py-3 px-4 items-center">
                  <li className="w-1/6 flex items-center justify-start">
                    <img src={`http://${serverUrl}${product.images[0]}`} className="h-16 rounded" alt="" />
                  </li>
                  <li className="w-2/6 pr-4">
                    {product.name}
                  </li>
                  <li className="w-2/6">
                    { 
                      allCategories.find( category => category._id === product.category)?.name
                    }
                  </li>
                  <li className="w-1/6">
                    {product.price}
                  </li>
                </ul>
              </div>)
            }
          </main>
        </div>
      </section>
    </main>
  )
}

export default ProductList