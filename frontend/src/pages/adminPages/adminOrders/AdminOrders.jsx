import React, { useEffect, useState } from 'react'
import AdminHeader from '../../../components/adminHeader/AdminHeader'
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminOrders = () => {

    const [allBills, setAllBills] = useState([]);

    useEffect(() => {
        fetchBills();
    }, [allBills])

    const fetchBills = async () => {
        try {
            const response = await axios.get("/api/v1/bill/get-all");
            setAllBills(response.data.data);
        } catch (error) {
            toast.error("Error occured while fetching bills");
        }
    }

    const handleBillStatus = async ({ target }) => {
        const billId = target.id;
        const status = target.value;

        try{
            await axios.post(`/api/v1/bill/update-status/${billId}`, {status});
            fetchBills();
        }catch(error){
            toast.error("Error occured while updating status")
        }
    }

    return (
        <main className='w-full'>
            <AdminHeader heading={"Customer Orders"} />
            <section className='bg-white ml-5 min-h-96 px-10 py-14'>
                <h2 className='mb-10 font-bold text-3xl'>All Orders</h2>
                {
                    allBills.map((bill) => (
                        <div key={bill._id} className='w-full border-2 py-4 px-5 rounded flex items-center justify-between mb-10'>
                            <div>
                                <div className='flex mb-2'>
                                    <span className='font-bold w-36'>Name: </span>
                                    <p>{bill.name}</p>
                                </div>
                                <div className='flex mb-2'>
                                    <span className='font-bold w-36'>City: </span>
                                    <p>{bill.city}</p>
                                </div>
                                <div className='flex mb-2'>
                                    <span className='font-bold w-36'>Address: </span>
                                    <p>{bill.address}</p>
                                </div>
                                <div className='flex mb-2'>
                                    <span className='font-bold w-36'>Products: </span>
                                    <p>{bill.products.length}</p>
                                </div>
                                <div className='flex mb-2'>
                                    <span className='font-bold w-36'>Total</span>
                                    <p>{bill.totalAmount}</p>
                                </div>
                            </div>
                            <select id={bill._id} value={bill.status} 
                                onChange={handleBillStatus}
                                className='border-2 border-slate-300 py-4 px-4 cursor-pointer'>
                                <option value="pending">Pending</option>
                                <option value="shipped">Shipped</option>
                                <option value="completed">Completed</option>
                                <option value="canceled">Canceled</option>
                            </select>
                        </div>
                    ))
                }
            </section>
        </main>
    )
}

export default AdminOrders