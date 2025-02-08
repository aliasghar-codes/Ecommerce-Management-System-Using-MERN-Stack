import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BsTelephoneFill } from "react-icons/bs";
import { toast } from 'react-toastify';

const Contact = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(null);
    const [message, setMessage] = useState("");

    const navigateTo = useNavigate();

    async function handleUserContact(event) {

        event.preventDefault();

        if (
            !name ||
            !email ||
            !message
        ) {
            toast.error("Please fill full form");
            return;
        };

        if (phone) {
            if (Number.isNaN(parseInt(phone))) {
                toast.error("Please enter valid phone number")
            }
        }


        try {
            await axios.post("/api/v1/contact", {
                name,
                email,
                phone,
                message
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            toast.success("Message sent Successfully")
        } catch (error) {
            error.response ? toast.error(error.response.data.message) : toast.error("Unexpected error occured");
            return
        };

        navigateTo("/");
    }

    return (
        <main className="px-40 flex flex-wrap justify-between">
            <div className="w-1/4 shadow-lg my-36 rounded-lg px-12 py-20 border-t-2 border-slate-50">
                <div className="flex items-center mb-12">
                    <div className="mr-6 bg-red-500 text-white rounded-full h-10 w-10 flex justify-center items-center p-3">
                        <BsTelephoneFill />
                    </div>
                    <h2 className='text-3xl font-semibold'>Call To Us</h2>
                </div>
                <p 
                    className='font-semibold mb-6 text-xl'>We are available 24/7, 7 days a week.</p>
                <p 
                    className='font-semibold mb-6 text-xl'>Phone: +923103852656</p>
                <hr className='my-20' />
                <div className="flex items-center mb-12">
                    <div className="mr-6 bg-red-500 text-white rounded-full h-10 w-10 flex justify-center items-center p-3">
                        <BsTelephoneFill />
                    </div>
                    <h2 className='text-3xl font-semibold'>Write To Us</h2>
                </div>
                <p 
                    className='font-semibold mb-6 text-xl'>Fill form, we will contact you.</p>
                <p 
                    className='font-semibold mb-6 text-xl'>Email: aliasgharbhatti30@gmail.com</p>
                <p 
                    className='font-semibold mb-6 text-xl'>Email: support@test.com</p>
            </div>
            <div className="shadow-lg w-[70%] my-36 rounded-lg px-14 py-20 border-t-2 border-slate-50">
                <form onSubmit={handleUserContact}>
                    <div className="flex justify-between mb-12">
                        <input
                            type="text"
                            placeholder="Your Name*"
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                            className='w-[30%] outline-none bg-slate-50 py-6 px-10' />
                        <input
                            type="email"
                            placeholder="Your Email*"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            className='w-[30%] outline-none bg-slate-50 py-6 px-10' />
                        <input
                            type="text"
                            placeholder="Your Phone"
                            value={phone}
                            onChange={({ target }) => setPhone(target.value)}
                            className='w-[30%] outline-none bg-slate-50 py-6 px-10' />
                    </div>
                    <textarea
                        placeholder="Your Message"
                        cols="30"
                        rows="10"
                        value={message}
                        onChange={({ target }) => setMessage(target.value)}
                        className='resize-none w-full outline-none bg-slate-50 py-6 px-10' >
                    </textarea>
                    <button className="ml-auto block font-semibold text-white bg-red-500 hover:bg-red-600 py-5 px-8 text-xl rounded mt-14">
                        Send Message
                    </button>
                </form>
            </div>
        </main>
    )
}

export default Contact