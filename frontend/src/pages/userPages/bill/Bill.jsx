import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Bill = () => {
    const [cartItems, setCartItems] = useState([]);
    const [grandTotal, setGrandTotal] = useState("");
    const [shippingCost, setshippingCost] = useState("");
    const [termsRead, setTermsRead] = useState(false);
    const [name, setName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    const navigateTo = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            let totalPrice = 0;

            const response = await axios.get("/api/v1/cart/detail");
            setCartItems(response.data.data);

            if (response.data.data.length < 1) {
                navigateTo("/");
                return;
            }

            response.data.data.forEach(obj => {
                totalPrice += obj.totalPrice;
            });

            setGrandTotal(totalPrice);
            totalPrice > 50000 ? setshippingCost(1000) : setshippingCost(500)

        } catch (error) {
            toast.error("Error occured while fetching products");
        }
    };

    const handlePlaceOrder = async () => {
        if (
            !termsRead ||
            !name ||
            !emailAddress ||
            !phone ||
            !dateOfBirth ||
            !gender ||
            !address ||
            !city ||
            !state ||
            !zipCode
        ) {
            toast.error("Please fill full form");
            return;
        }

        try {
            const totalAmount = shippingCost + grandTotal; console.log(totalAmount)

            await axios.post("/api/v1/bill/create", {
                name,
                emailAddress,
                phone,
                dateOfBirth,
                gender,
                address,
                city,
                state,
                zipCode,
                paymentMethod,
                totalAmount,
                products: cartItems
            }, {
                withCredentials: true,
                "Content-Type": "application/json"
            })

            toast.success("Bill created successfully");
            navigateTo("/");
        } catch (error) {
            toast.error("Error occured, Please try again later")
        }
    };

    return (
        <>
            <h1
                className='lg:pl-40 pl-6 text-5xl lg:border-r-2 w-1/2 pt-20 font-bold tracking-normal pb-14'>
                Checkout
            </h1>
            <main className='lg:px-40 px-6 flex flex-wrap'>
                <div className='lg:w-1/2 w-full lg:border-r-2 pb-32 lg:pr-24'>
                    <h2 className='text-3xl font-bold tracking-normal mb-10'>
                        Shipping info
                    </h2>
                    <form>
                        <div className='flex flex-col gap-4 mb-10'>
                            <label htmlFor="name" className='font-bold'>
                                Full Name <span className='text-red-500'>*</span>
                            </label>
                            <input type="text" id='name' placeholder='Enter full name'
                                value={name}
                                onChange={({ target }) => setName(target.value)}
                                className='border-2 outline-none px-6 py-4 rounded' />
                        </div>
                        <div className='flex flex-col gap-4 mb-10'>
                            <label htmlFor="emailAddress" className='font-bold'>
                                Email address <span className='text-red-500'>*</span>
                            </label>
                            <input type="text" id='emailAddress' placeholder='Enter email address'
                                value={emailAddress}
                                onChange={({ target }) => setEmailAddress(target.value)}
                                className='border-2 outline-none px-6 py-4 rounded' />
                        </div>
                        <div className='flex flex-col gap-4 mb-10'>
                            <label htmlFor="phone" className='font-bold'>
                                Phone <span className='text-red-500'>*</span>
                            </label>
                            <input type="number" id='phone' placeholder='Enter phone number'
                                value={phone}
                                onChange={({ target }) => setPhone(target.value)}
                                className='border-2 outline-none px-6 py-4 rounded' />
                        </div>
                        <div className='flex gap-16 mb-10'>
                            <div className='flex flex-col gap-4 mb-10 w-1/2'>
                                <label htmlFor="dateOfBirth" className='font-bold'>
                                    Date of Birth <span className='text-red-500'>*</span>
                                </label>
                                <input type="date" id='dateOfBirth'
                                    value={dateOfBirth}
                                    onChange={({ target }) => setDateOfBirth(target.value)}
                                    className='border-2 outline-none px-6 py-4 cursor-pointer rounded' />
                            </div>
                            <div className='flex flex-col gap-4 mb-10 w-1/2'>
                                <label htmlFor="gender" className='font-bold'>
                                    Gender <span className='text-red-500'>*</span>
                                </label>
                                <select id='gender'
                                    value={gender}
                                    onChange={({ target }) => setGender(target.value)}
                                    className='border-2 outline-none px-6 py-4 cursor-pointer rounded' >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 mb-10'>
                            <label htmlFor="address" className='font-bold'>
                                Address <span className='text-red-500'>*</span>
                            </label>
                            <input type="text" id='address' placeholder='Enter Address'
                                value={address}
                                onChange={({ target }) => setAddress(target.value)}
                                className='border-2 outline-none px-6 py-4 rounded' />
                        </div>
                        <div className='flex justify-between mb-10'>
                            <div className='flex flex-col gap-4 mb-10 w-1/3'>
                                <label htmlFor="city" className='font-bold'>
                                    City <span className='text-red-500'>*</span>
                                </label>
                                <input type="text" id='city' placeholder='Enter city'
                                    value={city}
                                    onChange={({ target }) => setCity(target.value)}
                                    className='border-2 outline-none px-6 py-4 rounded' />
                            </div>
                            <div className='flex flex-col gap-4 mb-10 w-1/3'>
                                <label htmlFor="state" className='font-bold'>
                                    State <span className='text-red-500'>*</span>
                                </label>
                                <input type="text" id='state' placeholder='Enter state'
                                    value={state}
                                    onChange={({ target }) => setState(target.value)}
                                    className='border-2 outline-none px-6 py-4 rounded' />
                            </div>
                            <div className='flex flex-col gap-4 mb-10 w-1/4'>
                                <label htmlFor="zipCode" className='font-bold'>
                                    Zip Code <span className='text-red-500'>*</span>
                                </label>
                                <input type="number" id='zipCode' placeholder='Enter zip code'
                                    value={zipCode}
                                    onChange={({ target }) => setZipCode(target.value)}
                                    className='border-2 outline-none px-6 py-4 rounded' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 mb-10 w-full'>
                            <label htmlFor="p-m" className='font-bold'>
                                Payment Method <span className='text-red-500'>*</span>
                            </label>
                            <select id='p-m'
                                value={paymentMethod}
                                onChange={({ target }) => setPaymentMethod(target.value)}
                                className='border-2 outline-none px-6 py-4 cursor-pointer rounded' >
                                <option value="Cash on delivery">Cash on delivery</option>
                            </select>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <input type="checkbox" checked={termsRead} onChange={({ target }) => setTermsRead(target.checked)}
                                className='h-20 w-6 cursor-pointer' />
                            <p className='text-xl select-none'>I have read and agree to the Terms and Conditions.</p>
                        </div>
                    </form>
                </div>
                <div className='lg:w-1/2 lg:pl-24 pb-32'>
                    <h2 className='text-3xl font-bold tracking-normal mb-10'>
                        Review your cart
                    </h2>
                    {
                        cartItems.map(item => (
                            <div className='flex gap-5 mb-20 items-center'>
                                <div className='border-2 p-5 w-32 '>
                                    <img src={`http://localhost:8000/${item.image}`} alt=""
                                        className='h-full' />
                                </div>
                                <div>
                                    <h3 className='text-2xl mb-1'>{item.name}</h3>
                                    <h3 className='text-slate-500 mb-8'>{item.quantity}x</h3>
                                    <p>{item.priceOfSingleProduct}</p>
                                </div>
                            </div>)
                        )}
                    <div className='mt-20 border-t-2 pt-20'>
                        <div className='flex justify-between mb-5'>
                            <h3 className='text-slate-500'>Subtotal</h3>
                            <p className='font-bold'>{grandTotal}</p>
                        </div>
                        <div className='flex justify-between mb-5'>
                            <h3 className='text-slate-500'>Shipping Cost</h3>
                            <p className='font-bold'>{shippingCost}</p>
                        </div>
                        <div className='flex justify-between'>
                            <h3 className='text-slate-500'>Total</h3>
                            <p className='font-bold'>Rs. {shippingCost + grandTotal}</p>
                        </div>
                    </div>
                    <button onClick={handlePlaceOrder}
                        className='w-full bg-red-500 text-white hover:bg-red-600 cursor-pointer mt-24 py-5 rounded-lg'>
                        Place order
                    </button>
                </div>
            </main>
        </>
    )
}

export default Bill