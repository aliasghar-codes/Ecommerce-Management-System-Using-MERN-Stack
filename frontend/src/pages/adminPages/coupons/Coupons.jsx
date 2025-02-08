import React, { useEffect, useState } from 'react'
import AdminHeader from '../../../components/adminHeader/AdminHeader.jsx'
import axios from 'axios';
import { toast } from "react-toastify";

const Coupons = () => {

    const [code, setCode] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [allCoupons, setAllCoupons] = useState([]);
    const [couponIdToDelete, setCouponIdToDelete] = useState("");

    useEffect(() => {
        fetchCoupons();
    });

    const fetchCoupons = async () => {
        try {
            const response = await axios.get("/api/v1/coupon/get-all");
            setAllCoupons(response.data.data);
        } catch (error) {
            toast.error(error.response.data.message || error);
        }
    }

    const handleDeleteCategory = async e => {
        e.preventDefault();

        if (!couponIdToDelete) {
            toast.error("Please select coupon to delete");
            return;
        }

        try {
            const response = await axios.delete(`/api/v1/coupon/delete/${couponIdToDelete}`);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message || error);
        }

        setCouponIdToDelete("");
        fetchCoupons();
    }

    const handleCreateCoupon = async e => {
        e.preventDefault();

        if (!code || !discountPercentage || !endDate) {
            toast.error("Please fill full form");
            return;
        }

        try {
            const response = await axios.post("/api/v1/coupon/create", {
                code,
                discountPercentage,
                startDate,
                endDate
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message || error);
        }
    }
    
    return (
        <main className='w-full'>
            <AdminHeader heading={"Manage Coupons"} />
            <section className='bg-white ml-5 pt-12 pl-10'>
                <h3 className='tracking-wide text-4xl mb-14'>Add Coupon</h3>
                <form onSubmit={handleCreateCoupon}
                    className="flex flex-col">
                    <div className="w-full mb-10 flex items-center">
                        <label htmlFor="code" className='w-1/5 inline-block'>Coupon Code:</label>
                        <input
                            id="code"
                            type="text"
                            value={code}
                            onChange={({ target }) => setCode(target.value)}
                            className='border-2 border-gray-300 w-1/3 py-2 px-4 outline-none' />
                    </div>
                    <div className="w-full mb-10 flex items-center">
                        <label htmlFor="d-p" className='w-1/5 inline-block'> Discount Percentage:</label>
                        <input
                            id="d-p"
                            type="number"
                            value={discountPercentage}
                            onChange={({ target }) => setDiscountPercentage(target.value)}
                            className='border-2 border-gray-300 w-1/3 py-2 px-4 outline-none' />
                    </div>
                    <div className="w-full mb-10 flex items-center">
                        <label htmlFor="s-d" className='w-1/5 inline-block'> Start Date:</label>
                        <input
                            id="s-d"
                            type="date"
                            value={startDate}
                            onChange={({ target }) => setStartDate(target.value)}
                            className='border-2 border-gray-300 w-1/3 py-2 px-4 outline-none' />
                    </div>
                    <div className="w-full mb-10 flex items-center">
                        <label htmlFor="e-d" className='w-1/5 inline-block'> End Date:</label>
                        <input
                            id="e-d"
                            type="date"
                            value={endDate}
                            onChange={({ target }) => setEndDate(target.value)}
                            className='border-2 border-gray-300 w-1/3 py-2 px-4 outline-none' />
                    </div>
                    <button
                        className='bg-red-500 hover:bg-red-600 text-white rounded-md my-10 py-4 w-[15%]'>
                        Create
                    </button>
                </form>
            </section>
            <section className='bg-white ml-5 pt-12 pl-10 mt-5'>
                <h3 className='tracking-wide text-4xl mb-14'>Delete Coupon</h3>
                <form
                    onSubmit={handleDeleteCategory}
                    className="flex flex-col">
                    <div className="w-full mb-10 flex items-center">
                        <label className='w-1/5 inline-block'>Coupon:</label>
                        <select
                            name="category"
                            value={couponIdToDelete}
                            onChange={({ target }) => setCouponIdToDelete(target.value)}
                            className='border-2 border-gray-300 w-1/3 py-5 px-4 outline-none bg-white cursor-pointer'>
                            <option value="">Select</option>
                            {
                                allCoupons?.map(coupon => <option value={coupon._id} key={coupon._id}>{coupon.code}</option>)
                            }
                        </select>
                    </div>
                    <button
                        type='submit'
                        className='bg-red-500 hover:bg-red-600 text-white rounded-md my-10 py-4 w-[15%]'>
                        Delete
                    </button>
                </form>
            </section>
        </main>
    )
}

export default Coupons