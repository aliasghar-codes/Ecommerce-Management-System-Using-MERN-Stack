import React from 'react'
import AdminHeader from '../../../components/adminHeader/AdminHeader.jsx'

const AdminError = () => {
    return (
        <main className='w-full'>
            <AdminHeader heading={"Error"} />
            <section className='bg-white ml-5 flex flex-col justify-center items-center py-72 rounded-lg'>
                <h1 className='text-9xl'>
                    404 
                </h1>
                <h1 className='font-bold'>
                    Not Found
                </h1>
            </section>
        </main>
    )
}

export default AdminError