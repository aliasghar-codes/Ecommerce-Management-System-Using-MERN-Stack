import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <main className="mb-32 flex justify-center items-center flex-col">
            <h1 className='lg:text-9xl text-7xl font-medium mt-36 mb-14'>
                404 Not Found
            </h1>
            <p className='lg:mb-28 mb-20 text-lg lg:text-2xl text-gray-700'>
                You visited page not found You may go home page.
            </p>
            <Link to="/" 
                className="bg-red-500 font-bold text-white py-6 hover:bg-red-600 lg:px-12 px-7 lg:text-2xl text-lg rounded">
                Back to home page
            </Link>
        </main>
    )
}

export default Error