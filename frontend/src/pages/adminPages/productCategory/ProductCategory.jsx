import React, { useEffect, useState } from 'react'
import AdminHeader from '../../../components/adminHeader/AdminHeader.jsx'
import axios from 'axios';
import { toast } from "react-toastify";

const ProductCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [categoryToRemove, setCategoryToRemove] = useState("");
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        fetchAllCategories()
    });

    const fetchAllCategories = async () => {
        try {
            const response = await axios.get("/api/v1/category/get-all");
            setAllCategories(response.data.data);
        } catch (error) {
            toast.error(error.response?.data.message || error);
        }
    }

    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (!categoryName) {
            toast.error("Please fill full form")
            return;
        }

        try {
            const response = await axios.post("/api/v1/category/create", {
                name: categoryName,
                description: categoryDescription,
                subCategory: subCategory ? subCategory : null
            });

            if (response.data.statusCode === 200)
                toast.success("Category created successfully");

        } catch (error) {
            toast.error(error.response?.data.message || error);
        }

        fetchAllCategories();
    };

    const handleRemoveCategory = async (e) => {
        e.preventDefault();

        if (!categoryToRemove) {
            toast.error("Please select category to delete")
            return;
        };

        try {
            const response = await axios.delete(`/api/v1/category/delete/${categoryToRemove}`);

            if (response.data.statusCode === 200)
                toast.success("Category deleted successfully");

        } catch (error) {
            toast.error(error.response?.data.message || error);
        }

        fetchAllCategories();
    }

    return (
        <main className='w-full'>
            <AdminHeader heading={"Manage Categories"} />
            <section className='bg-white ml-5 pt-12 pl-10'>
                <h3 className='tracking-wide text-4xl mb-14'>Add Category</h3>
                <form onSubmit={handleAddCategory}
                    className="flex flex-col">
                    <div className="w-full mb-10 flex items-center">
                        <label htmlFor="name" className='w-1/5 inline-block'>Category Name:</label>
                        <input
                            id='name'
                            type="text"
                            name='name'
                            value={categoryName}
                            onChange={({ target }) => setCategoryName(target.value)}
                            className='border-2 border-gray-300 w-1/3 py-2 px-4 outline-none' />
                    </div>
                    <div className="w-full mb-10 flex items-center">
                        <label htmlFor="des" className='w-1/5 inline-block'> Category Description:</label>
                        <input
                            id="des"
                            type="text"
                            name='description'
                            value={categoryDescription}
                            onChange={({ target }) => setCategoryDescription(target.value)}
                            className='border-2 border-gray-300 w-1/3 py-2 px-4 outline-none' />
                    </div>
                    <div className="w-full mb-10 flex items-center">
                        <label className='w-1/5 inline-block'> Sub Category:</label>
                        <select
                            name="subCategory"
                            value={subCategory}
                            onChange={({ target }) => setSubCategory(target.value)}
                            className='border-2 border-gray-300 w-1/3 py-5 px-4 outline-none bg-white cursor-pointer'>
                            <option value="">Select</option>
                            {
                                allCategories?.map(category => <option key={category._id} value={category._id}>{category.name}</option>)
                            }
                        </select>
                    </div>
                    <button
                        className='bg-red-500 text-white rounded-md my-10 py-4 w-[15%]'>
                        Create
                    </button>
                </form>
            </section>
            <section className='bg-white ml-5 pt-12 pl-10 mt-5'>
                <h3 className='tracking-wide text-4xl mb-14'>Delete Category</h3>
                <form onSubmit={handleRemoveCategory}
                    className="flex flex-col">
                    <div className="w-full mb-10 flex items-center">
                        <label className='w-1/5 inline-block'>Category:</label>
                        <select
                            name="category"
                            value={categoryToRemove}
                            onChange={({ target }) => setCategoryToRemove(target.value)}
                            className='border-2 border-gray-300 w-1/3 py-5 px-4 outline-none bg-white cursor-pointer'>
                            <option value="">Select</option>
                            {
                                allCategories?.map(category => <option value={category._id} key={category._id}>{category.name}</option>)
                            }
                        </select>
                    </div>
                    <button
                        type='submit'
                        className='bg-red-500 text-white rounded-md my-10 py-4 w-[15%]'>
                        Delete
                    </button>
                </form>
            </section>
        </main>
    )
}

export default ProductCategory