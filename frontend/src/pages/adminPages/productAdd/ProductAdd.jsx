import React, { useEffect, useState } from 'react'
import AdminHeader from '../../../components/adminHeader/AdminHeader.jsx'
import { toast } from 'react-toastify';
import axios from 'axios';
import { IoCloseOutline } from "react-icons/io5";

const ProductAdd = () => {

    const [allCategories, setAllCategories] = useState([]);
    const [imagesName, setImagesName] = useState({
        image1: "",
        image2: "",
        image3: "",
        image4: ""
    });
    const [formValues, setFormValues] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        size: "",
        gender: "",
        colors: {
            color1: "",
            color2: "",
            color3: "",
            color4: ""
        },
        images: {
            image1: null,
            image2: null,
            image3: null,
            image4: null
        }
    });

    useEffect(() => async () => {
        try {
            const response = await axios.get("/api/v1/category/get-all");
            setAllCategories(response.data.data);
        } catch (error) {
            toast.error(error.response?.data.message || error);
        }
    });

    const handleUpdateState = ({ target }) => {
        if (target.name === "images") {

            const { name, id } = target;

            setImagesName({ ...imagesName, [id]: target.files[0].name });

            setFormValues({ ...formValues, [name]: { ...formValues.images, [id]: target.files[0] } });

        } else if (target.name === "colors") {

            const { name, value } = target;

            setFormValues({ ...formValues, [name]: { ...formValues.colors, [target.id]: value } });
        }
        else {
            setFormValues({ ...formValues, [target.name]: target.value })
        }
    }

    const resetImageState = ({ target }) => {
        setImagesName({ ...imagesName, [target.id]: "" });
        setFormValues({ ...formValues, images: { ...formValues.images, [target.id]: "" } });
    }

    const handleAddProduct = async e => {
        e.preventDefault();

        const images = [];
        const colors = [];

        for (let key in formValues.images) {

            const value = formValues.images[key];

            if (value === null || value === "") {
                continue;
            } else {
                images.push(value);
            }
        }

        for (let key in formValues.colors) {
            const value = formValues.colors[key];

            if (value === null || value === "") {
                continue;
            } else {

                if (!value.startsWith("#", 0) || value.length < 7) {
                    toast.error("Please input valid HEX color code")
                }

                colors.push(value);
            }
        }

        if (
            !formValues.name ||
            !formValues.description ||
            !formValues.price ||
            !formValues.quantity ||
            images.length < 2 ||
            colors.length < 1) {
            toast.error("Please fill all the necessary information");
            return;
        }

        try {
            const response = await axios.post("/api/v1/product/create", {
                name: formValues.name,
                description: formValues.description,
                price: formValues.price,
                category: formValues.category,
                quantity: formValues.quantity,
                size: formValues.size,
                gender: formValues.gender,
                images: images,
                colors: JSON.stringify(colors)
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success(response.data.message);
            
        } catch (error) {
            toast.error(error.response?.data.message || error)
        }

        setFormValues({
            name: "",
            description: "",
            price: "",
            category: "",
            quantity: "",
            size: "",
            gender: "",
            colors: {
                color1: "",
                color2: "",
                color3: "",
                color4: ""
            },
            images: {
                image1: null,
                image2: null,
                image3: null,
                image4: null
            }
        });

        setImagesName({
            image1: "",
            image2: "",
            image3: "",
            image4: ""
        });
    }

    return (
        <main className='w-full'>
            <AdminHeader heading={"Add Product"} />
            <section className='bg-white ml-5 min-h-96 px-10 py-14'>
                <h2
                    className="mb-16 text-4xl">
                    Enter Product Details
                </h2>
                <form onSubmit={handleAddProduct}>
                    <div className='flex items-center mb-5'>
                        <label htmlFor="name" className='w-1/5 inline-block text-3xl'>Name: </label>
                        <input
                            name='name'
                            id="name"
                            value={formValues.name}
                            onChange={handleUpdateState}
                            className="border-2 border-gray-300 py-1 px-4 w-1/3 outline-none"
                            type="text" />
                    </div>
                    <div className='flex items-center mb-5'>
                        <label htmlFor="description" className='w-1/5 inline-block text-3xl'>Description: </label>
                        <textarea
                            name='description'
                            id="description"
                            value={formValues.description}
                            onChange={handleUpdateState}
                            className="border-2 border-gray-300 py-1 px-4 w-1/3 outline-none h-40"
                            type="text" >
                        </textarea>
                    </div>
                    <div className='flex items-center mb-5'>
                        <label htmlFor="price" className='w-1/5 inline-block text-3xl'>Price: </label>
                        <input
                            name='price'
                            id="price"
                            value={formValues.price}
                            onChange={handleUpdateState}
                            className="border-2 border-gray-300 py-1 px-4 w-1/3 outline-none"
                            type="text" />
                    </div>
                    <div className='flex items-center mb-5'>
                        <label htmlFor="category" className='w-1/5 inline-block text-3xl'>Category: </label>
                        <select
                            name="category"
                            value={formValues.category}
                            onChange={handleUpdateState}
                            className='border-2 border-gray-300 w-1/3 py-2 px-4 outline-none bg-white cursor-pointer'>
                            <option value="">Select</option>
                            {
                                allCategories?.map(category => <option key={category._id} value={category._id}>{category.name}</option>)
                            }
                        </select>
                    </div>
                    <div className='flex items-center mb-5'>
                        <label htmlFor="quantity" className='w-1/5 inline-block text-3xl'>Quantity: </label>
                        <input
                            name='quantity'
                            id="quantity"
                            value={formValues.quantity}
                            onChange={handleUpdateState}
                            className="border-2 border-gray-300 py-1 px-4 w-1/3 outline-none"
                            type="text" />
                    </div>
                    <div className='flex items-center mb-5'>
                        <label htmlFor="size" className='w-1/5 inline-block text-3xl'>Dimensions: </label>
                        <input
                            name='size'
                            id="size"
                            value={formValues.size}
                            onChange={handleUpdateState}
                            className="border-2 border-gray-300 py-1 px-4 w-1/3 outline-none"
                            type="text" />
                    </div>
                    <div className='flex items-center mb-5'>
                        <label htmlFor="gender" className='w-1/5 inline-block text-3xl'>Gender: </label>
                        <select
                            name='gender'
                            id="gender"
                            value={formValues.gender}
                            onChange={handleUpdateState}
                            className="border-2 border-gray-300 bg-white py-2 px-4 w-1/3 outline-none cursor-pointer">
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className='flex items-center mb-5'>
                        <label className='w-1/5 inline-block text-3xl'>Colors: </label>
                        <div className='flex gap-5 w-1/3'>
                            <input
                                value={formValues.colors.color1}
                                onChange={handleUpdateState}
                                name="colors"
                                id="color1"
                                placeholder='#fefefe'
                                maxLength={7}
                                className="border-2 border-gray-300 py-1 px-4 w-1/4 outline-none"
                                type="text" />
                            <input
                                value={formValues.colors.color2}
                                onChange={handleUpdateState}
                                name="colors"
                                id="color2"
                                placeholder='#fefefe'
                                maxLength={7}
                                className="border-2 border-gray-300 py-1 px-4 w-1/4 outline-none"
                                type="text" />
                            <input
                                value={formValues.colors.color3}
                                onChange={handleUpdateState}
                                name="colors"
                                id="color3"
                                placeholder='#fefefe'
                                maxLength={7}
                                className="border-2 border-gray-300 py-1 px-4 w-1/4 outline-none"
                                type="text" />
                            <input
                                value={formValues.colors.color4}
                                onChange={handleUpdateState}
                                name="colors"
                                id="color4"
                                placeholder='#fefefe'
                                maxLength={7}
                                className="border-2 border-gray-300 py-1 px-4 w-1/4 outline-none"
                                type="text" />
                        </div>
                    </div>
                    <div className='flex items-center mb-5'>
                        <label htmlFor="name" className='w-1/5 inline-block text-3xl'>Images: </label>
                        <div className='flex gap-5 w-1/3'>
                            <div className='relative border-2 border-gray-300 w-1/4 flex items-center justify-center'>
                                {
                                    formValues.images.image1 &&
                                    <div
                                        id='image1'
                                        onClick={resetImageState}
                                        className='absolute -right-2 -top-3 cursor-pointer bg-white text-red-500'>
                                        <IoCloseOutline
                                            className='pointer-events-none' />
                                    </div>
                                }
                                {
                                    imagesName.image1 ?
                                        <div className='overflow-hidden'>{imagesName.image1}</div> :
                                        <input
                                            type="file"
                                            name="images"
                                            id="image1"
                                            onChange={handleUpdateState}
                                            accept="image/*"
                                            className='py-3 px-4 w-full outline-none text-xs cursor-pointer'
                                        />
                                }
                            </div>
                            <div className='relative border-2 border-gray-300 w-1/4 flex items-center justify-center'>
                                {
                                    formValues.images.image2 &&
                                    <div
                                        id='image2'
                                        onClick={resetImageState}
                                        className='absolute -right-2 -top-3 cursor-pointer bg-white text-red-500'>
                                        <IoCloseOutline
                                            className='pointer-events-none' />
                                    </div>
                                }
                                {
                                    imagesName.image2 ?
                                        <div className='overflow-hidden'>{imagesName.image2}</div> :
                                        <input
                                            type="file"
                                            name="images"
                                            id="image2"
                                            onChange={handleUpdateState}
                                            accept="image/*"
                                            className='py-3 px-4 w-full outline-none text-xs cursor-pointer'
                                        />
                                }
                            </div>
                            <div className='relative border-2 border-gray-300 w-1/4 flex items-center justify-center'>
                                {
                                    formValues.images.image3 &&
                                    <div
                                        id='image3'
                                        onClick={resetImageState}
                                        className='absolute -right-2 -top-3 cursor-pointer bg-white text-red-500'>
                                        <IoCloseOutline
                                            className='pointer-events-none' />
                                    </div>
                                }
                                {
                                    imagesName.image3 ?
                                        <div className='overflow-hidden'>{imagesName.image3}</div> :
                                        <input
                                            type="file"
                                            name="images"
                                            id="image3"
                                            onChange={handleUpdateState}
                                            accept="image/*"
                                            className='py-3 px-4 w-full outline-none text-xs cursor-pointer'
                                        />
                                }
                            </div>
                            <div className='relative border-2 border-gray-300 w-1/4 flex items-center justify-center'>
                                {
                                    formValues.images.image4 &&
                                    <div
                                        id='image4'
                                        onClick={resetImageState}
                                        className='absolute -right-2 -top-3 cursor-pointer bg-white text-red-500'>
                                        <IoCloseOutline
                                            className='pointer-events-none' />
                                    </div>
                                }
                                {
                                    imagesName.image4 ?
                                        <div className='overflow-hidden'>{imagesName.image4}</div> :
                                        <input
                                            type="file"
                                            name="images"
                                            id="image4"
                                            onChange={handleUpdateState}
                                            accept="image/*"
                                            className='py-3 px-4 w-full outline-none text-xs cursor-pointer'
                                        />
                                }
                            </div>
                        </div>
                    </div>
                    <button
                        className='bg-red-500 text-white rounded-md py-5 px-9 font-semibold text-2xl mt-14 hover:bg-red-600'
                        type='submit' >
                        Create Product
                    </button>
                </form>
            </section>
        </main>
    )
}

export default ProductAdd