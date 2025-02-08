import React, { useState } from 'react'
import AdminHeader from '../../../components/adminHeader/AdminHeader'
import { toast } from 'react-toastify';
import axios from 'axios';

const RegisterAdmin = () => {

    const [formValues, setFormValues] = useState({
        userName: "",
        email: "",
        password: ""
    });

    const handleUpdateState = e => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }

    const handleAdminRegister = async e => {
        e.preventDefault();

        if (!formValues.userName || !formValues.email || !formValues.password) {
            toast.error("Please fill full form");
            return;
        };

        try {
            const response = await axios.post("/api/v1/admin/register", {
                userName: formValues.userName,
                email: formValues.email,
                password: formValues.password
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success(response.data.message);

        } catch (error) {
            toast.error(error.response?.data.message || error);
            console.log(error)
        }
    }

    return (
        <main className='w-full'>
            <AdminHeader heading={"Add Admin"} />
            <section className='bg-white ml-5 min-h-96 px-10 py-14'>
                <h2
                    className="mb-16 text-4xl">
                    Enter Details
                </h2>
                <form onSubmit={handleAdminRegister}>
                    <div className='flex items-center mb-5'>
                        <label htmlFor="name" className='w-1/5 inline-block text-3xl'>Name: </label>
                        <input
                            id="name"
                            name="userName"
                            value={formValues.userName}
                            onChange={handleUpdateState}
                            className="border-2 border-gray-300 py-1 px-4 w-1/3 outline-none"
                            type="text" />
                    </div>
                    <div className='flex items-center mb-5'>
                        <label htmlFor="email" className='w-1/5 inline-block text-3xl'>Email: </label>
                        <input
                            id="email"
                            name="email"
                            email="email"
                            value={formValues.email}
                            onChange={handleUpdateState}
                            className="border-2 border-gray-300 py-1 px-4 w-1/3 outline-none"
                            type="email" />
                    </div>
                    <div className='flex items-center mb-5'>
                        <label htmlFor="password" className='w-1/5 inline-block text-3xl'>Password: </label>
                        <input
                            id="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleUpdateState}
                            className="border-2 border-gray-300 py-1 px-4 w-1/3 outline-none"
                            type="text" />
                    </div>
                    <button
                        className='bg-red-500 text-white rounded-md py-5 px-9 font-semibold text-2xl mt-14 hover:bg-red-600'
                        type='submit' >
                        Create Admin
                    </button>
                </form>
            </section>
        </main>
    )
}

export default RegisterAdmin