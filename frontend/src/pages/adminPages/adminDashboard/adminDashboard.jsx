import React, { useEffect, useState } from 'react'
import AdminHeader from "../../../components/adminHeader/AdminHeader.jsx"
import { toast } from 'react-toastify';
import axios from 'axios';

const adminDashboard = () => {
    const [data, setData] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/v1/dashboard/get-info")
            setData(response.data.data)
        } catch (error) {
            toast.error("Error occured while fetching data");
        }
    }

    return (
        <main className='w-full overflow-hidden'>
            <AdminHeader heading={"Dashboard"} />
            <div className="flex justify-between px-32 mb-20 mt-20">
                <section className='bg-white ml-5 flex flex-col justify-center items-center py-12 w-1/4 rounded-lg'>
                    <h1 className="text-4xl font-semibold mb-10">Total Signups</h1>
                    <p>{data.totalSignup}</p>
                </section>
                <section className='bg-white ml-5 flex flex-col justify-center items-center py-12 w-1/4 rounded-lg'>
                    <h1 className="text-4xl font-semibold mb-10">Orders Pending</h1>
                    <p>{data.ordersPending}</p>
                </section>
                <section className='bg-white ml-5 flex flex-col justify-center items-center py-12 w-1/4 rounded-lg'>
                    <h1 className="text-4xl font-semibold mb-10">Total Sale</h1>
                    <p>{data.totalSale}</p>
                </section>
            </div>
            <div className="flex justify-between px-32">
                <section className='bg-white ml-5 flex flex-col justify-center items-center py-12 w-1/4 rounded-lg'>
                    <h1 className="text-4xl font-semibold mb-10">Total Products</h1>
                    <p>{data.totalProducts}</p>
                </section>
                <section className='bg-white ml-5 flex flex-col justify-center items-center py-12 w-1/4 rounded-lg'>
                    <h1 className="text-4xl font-semibold mb-10">Total Messages</h1>
                    <p>{data.totalMessages}</p>
                </section>
                <section className='bg-white ml-5 flex flex-col justify-center items-center py-12 w-1/4 rounded-lg'>
                    <h1 className="text-4xl font-semibold mb-10">Active Coupons</h1>
                    <p>{data.activeCoupons}</p>
                </section>
            </div>
        </main>
    )
}

export default adminDashboard