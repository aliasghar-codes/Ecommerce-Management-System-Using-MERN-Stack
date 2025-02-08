import React, { useEffect, useState } from 'react'
import "./Cart.css"
import { toast } from 'react-toastify';
import axios from 'axios';
import { TiDelete } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [grandTotal, setGrandTotal] = useState("");
    const [cartUpdated, setCartUpdated] = useState(false);

    const navigateTo = useNavigate();

    useEffect(() => {
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
        } catch (error) {
            toast.success("Error while deleting a product from cart");
        }
    }

    const handleCheckOut = async () => {
        if(cartUpdated){
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
                <main className="container cart-main">
                    <div className="headings">
                        <h3 className="font-bold">Products</h3>
                        <h3 className="font-bold">Price</h3>
                        <h3 className="font-bold">Quantity</h3>
                        <h3 className="font-bold">Total</h3>
                    </div>
                    <div className="products">
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
                                        className="border-2 w-20 py-1 px-4" />
                                    <p id="total">Rs {item.totalPrice}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex justify-end mb-52'>
                        <div>
                            <h3 className='font-bold text-4xl my-14'>Grand total: {grandTotal}</h3>
                            <button
                                onClick={handleCheckOut}
                                className='bg-red-500 hover:bg-red-600 text-white w-full py-4 rounded font-bold'>
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