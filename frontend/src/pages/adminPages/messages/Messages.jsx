import React, { useEffect, useState } from 'react'
import AdminHeader from '../../../components/adminHeader/AdminHeader.jsx'
import { toast } from 'react-toastify';
import axios from 'axios';
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [showModel, setShowModel] = useState(false);
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        fetchMessages();
    });

    const fetchMessages = async () => {
        try {
            const response = await axios.get("/api/v1/contact/get-all");
            setMessages(response.data.data)
        } catch (error) {
            toast.error(error.response?.data.message || error);
        }
    };

    const handleMessageSelect = e => {

        e.stopPropagation();

        selectedMessages.includes(e.target.id) ?
            setSelectedMessages(prev => [...prev].filter(item => item !== e.target.id)) :
            setSelectedMessages(prev => [...prev, e.target.id])
    }

    const handleMessageDelete = async (e) => {
        e.stopPropagation();
        const id = e.target.id;

        try {
            const response = await axios.delete(`/api/v1/contact/delete/${id}`);
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response?.data.message || error);
        }

        fetchMessages();
    }

    const handleBulkDelete = async (e) => {
        try {
            const response = await axios.post("/api/v1/contact/delete", {
                data: selectedMessages
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data.message || error);
        }

        setSelectedMessages([]);
        fetchMessages();
    }

    const showMessage = message => {
        setShowModel(true);
        setModalData(message);
    }

    return (
        <main className='w-full overflow-hidden'>
            <AdminHeader heading={"Messages"} />
            {
                showModel &&
                <section className='bg-white px-12 py-16 mx-auto w-1/2 rounded-2xl z-10 flex gap-12 flex-col overflow-hidden relative'>
                    <span
                        onClick={() => setShowModel(false)}
                        className='absolute right-8 top-8 cursor-pointer text-red-600'>
                        <IoCloseCircleOutline className='text-4xl' />
                    </span>
                    <div className="flex gap-5">
                        <span className="font-bold">Name: </span>
                        <p>
                            {modalData.name}
                        </p>
                    </div>
                    <div className="flex gap-5">
                        <span className="font-bold">Email: </span>
                        <p>
                            {modalData.email}
                        </p>
                    </div>
                    {
                        modalData.phone ?
                            <div className="flex gap-5">
                                <span className="font-bold">Phone: </span>
                                <p>
                                    {modalData.phone}
                                </p>
                            </div>
                        : null
                    }
                    <div
                        className=''>
                        <span className="font-bold mb-5">Message: </span>
                        <p className='indent-16 mt-2 leading-loose'>
                            {modalData.message}
                        </p>
                    </div>
                </section>
            }

            <section style={showModel ? { display: "none" } : {}} className='bg-white ml-5 p-10'>
                <div
                    className='flex mb-10 border-b-2 border-gray-100 pb-5'>
                    <h4
                        className='w-1/6 mr-10 font-semibold'>
                        Name
                    </h4>
                    <h4
                        className='w-1/4 mr-10 font-semibold'>
                        Email
                    </h4>
                    <h4
                        className='font-semibold'>
                        Message
                    </h4>
                </div>
                <div>{
                    messages.length > 0 ?
                        messages.map(value => (
                            <div
                                onClick={() => showMessage(value)}
                                key={value._id}
                                style={selectedMessages.includes(value._id) ? { backgroundColor: "#fef2f2" } : {}}
                                className='cursor-pointer py-4 flex items-center border-b-2 border-gray-100 hover:shadow-message-shadow hover:border-gray-200 px-2 text-gray-400 hover:text-black relative'>
                                <span className='w-1/6 overflow-hidden mr-10 flex items-center gap-4'>
                                    <div
                                        id={value._id}
                                        className='hover:bg-gray-200 h-12 w-12 rounded-full flex justify-center items-center'
                                        onClick={handleMessageSelect} >
                                        {
                                            selectedMessages.includes(value._id) ? (
                                                <MdOutlineCheckBox
                                                    className='pointer-events-none text-black' />
                                            ) : (
                                                <MdOutlineCheckBoxOutlineBlank
                                                    className='pointer-events-none' />
                                            )
                                        }
                                    </div>
                                    <p className='text-black'>
                                        {value.name.length > 12 ? `${value.name.slice(0, 12)}...` : value.name}
                                    </p>
                                </span>
                                <span className='w-1/4 inline-block overflow-hidden mr-10 text-black'>
                                    {value.email.length > 30 ? `${value.email.slice(0, 30)}...` : value.email}
                                </span>
                                <span
                                    className='overflow-hidden text-black'>
                                    {value.message.length > 40 ? `${value.message.slice(0, 40)}...` : value.message}
                                </span>
                                <div
                                    id={value._id}
                                    className='absolute right-16 hover:bg-gray-200 h-12 w-12 rounded-full flex justify-center items-center'
                                    onClick={handleMessageDelete} >
                                    <RiDeleteBin6Line
                                        className='pointer-events-none' />
                                </div>
                            </div>
                        ))
                        : (<h2
                            className='w-full text-5xl flex justify-center items-center h-96'>
                            No Messages Found
                        </h2>)
                }</div>
                {
                    selectedMessages.length > 0 &&
                    <button
                        onClick={handleBulkDelete}
                        className='mt-14 bg-red-500 text-white py-3 px-16 rounded-md'>
                        {selectedMessages.length > 1 ? "Delete All" : "Delete"}
                    </button>
                }
            </section>
        </main>
    )
}

export default Messages