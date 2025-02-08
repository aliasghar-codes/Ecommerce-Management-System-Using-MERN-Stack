import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <main className="mb-32 flex justify-center items-center flex-col">
            <h1 className='text-9xl font-medium mt-36 mb-14'>
                404 Not Found
            </h1>
            <p className='mb-28'>
                You visited page not found You may go home page.
            </p>
            <Link to="/" 
                className="bg-red-500 font-bold text-white py-6 hover:bg-red-600 px-12 text-2xl rounded">
                Back to home page
            </Link>
        </main>
    )
}

export default Error