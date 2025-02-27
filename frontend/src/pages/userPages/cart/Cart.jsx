import React, { useEffect, useState } from 'react'
import "./Cart.css"
import { toast } from 'react-toastify';
import axios from 'axios';
import { TiDelete } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [grandTotal, setGrandTotal] = useState("");
    const [cartUpdated, setCartUpdated] = useState(false);

    const navigateTo = useNavigate();

    const isAuthenticated = useSelector(state => state.isAuthenticated);
    const role = useSelector(state => state.user.role);

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Login to access your cart")
            navigateTo("/login");
            return;
        }

        if (role !== "customer") {
            return;
        }

        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            let totalPrice = 0;

            const response = await axios.get("/api/v1/cart/detail");
            setItems(response.data.data);

            response.data.data.forEach(obj => {
                totalPrice += obj.totalPrice;
            });

            setGrandTotal(totalPrice);

        } catch (error) {
            toast.error("Error occured while fetching products");
        }
    };

    const handleProductQuantity = ({ target }) => {
        const index = Number(target.id);
        const inputValue = Number(target.value);
        let totalPrice = 0;

        const updatedItems = items.map((item, i) => {
            if (i == index) {
                return { ...item, quantity: inputValue, totalPrice: inputValue * item.priceOfSingleProduct };
            }
            return item;
        });

        updatedItems.forEach(obj => {
            totalPrice += obj.totalPrice;
        });

        setItems(updatedItems);
        setGrandTotal(totalPrice);
        setCartUpdated(true);
    }

    const handleItemDelete = async ({ target }) => {
        const objId = target.id;

        try {
            const response = await axios.delete(`/api/v1/cart/delete/${objId}`);
            setItems(response.data.data.products);
            toast.success("Item removed successfully");
            fetchProducts();
        } catch (error) {
            toast.success("Error while deleting a product from cart");
        }
    }

    const handleCheckOut = async () => {
        if (cartUpdated) {
            try {
                await axios.post(`/api/v1/cart/update`, {
                    data: items
                }, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            } catch (error) {
                toast.success("Error while deleting a product from cart");
            }
        }

        navigateTo("/bill");
    }

    return (
        <>
            {items.length > 0 ? (
                <main className="lg:px-40 px-6 cart-main">
                    <div className="headings hidden">
                        <h3 className="font-bold">Products</h3>
                        <h3 className="font-bold">Price</h3>
                        <h3 className="font-bold">Quantity</h3>
                        <h3 className="font-bold">Total</h3>
                    </div>
                    <div className="products hidden lg:block">
                        {
                            items.map((item, index) => (
                                <div className="product relative" key={item.productId}>
                                    <div id={item.productId} onClick={handleItemDelete} className="absolute right-0 top-0 cursor-pointer">
                                        <TiDelete className="pointer-events-none text-4xl text-red-500" />
                                    </div>
                                    <div className="flex items-center my-10">
                                        <img src={`http://localhost:8000/${item.image}`}
                                            className="w-16 mr-2" />
                                        <p className="text-xl leading-normal px-4">{item.name}</p>
                                    </div>
                                    <p id="price">
                                        Rs {item.priceOfSingleProduct}
                                    </p>
                                    <input id={index} type="number" value={item.quantity} onChange={handleProductQuantity}
                                        className="border-2 w-[4.1rem] py-1 pl-5" />
                                    <p id="total">Rs {item.totalPrice}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="lg:hidden">
                        {
                            items.map((item, index) => (
                                <div className="bg-slate-100 relative py-5 mt-10 rounded px-5" key={item.productId}>
                                    <div id={item.productId} onClick={handleItemDelete} className="absolute right-0 top-0 cursor-pointer">
                                        <TiDelete className="pointer-events-none text-4xl text-red-500" />
                                    </div>
                                    <div className="flex items-start my-10">
                                        <img src={`http://localhost:8000/${item.image}`}
                                            className="w-16 mr-2" />
                                        <p className="text-lg leading-normal mx-10">{item.name}</p>
                                    </div>
                                    <div className="flex items-center ">
                                        <p className="w-16 mr-12 text-xl font-medium">Price:</p>
                                        <p id="price" className='text-lg'>
                                            Rs {item.priceOfSingleProduct}
                                        </p>
                                    </div>
                                    <div className="flex items-center my-4">
                                        <p className="w-16 mr-12 font-medium text-xl">Quantity:</p>
                                        <input 
                                            id={index} 
                                            type="number" 
                                            value={item.quantity} 
                                            onChange={handleProductQuantity}
                                            className="border-2 w-16 text-lg py-1 pl-4" />
                                    </div>
                                    <div className="flex items-center my-4">
                                        <p className="w-16 mr-12 font-medium text-xl">Total:</p>
                                        <p id="total" className='text-lg'>Rs {item.totalPrice}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex justify-end mb-52'>
                        <div>
                            <h3 className='font-bold lg:text-4xl my-14'>Grand total: {grandTotal}</h3>
                            <button
                                onClick={handleCheckOut}
                                className='bg-red-500 hover:bg-red-600 text-white w-full py-4 rounded text-sm lg:text-2xl' >
                                Check out
                            </button>
                        </div>
                    </div>
                </main>
            ) : <main className='min-h-96 flex justify-center items-center'>
                <h1 className="text-6xl font-bold">Your cart is empty</h1>
            </main>
            }
        </>
    )
}

export default Cart