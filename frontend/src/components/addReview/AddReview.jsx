import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const AddReview = ({ productId, fetchReviews }) => {
    const [name, setName] = useState("");
    const [rating, setRating] = useState("");
    const [reviewText, setReviewText] = useState("");

    const handleReviewSubmit = async () => {
        if(!name || !rating || !reviewText){
            toast.error("Please fill full form");
            return;
        }
        if(rating < 1 || rating > 5){
            toast.error("Please enter valid rating");
            return;
        }

        try {
            await axios.post(`/api/v1/review/add`,{
                name,
                productId,
                rating,
                reviewText
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            toast.success("Review added successfully")
            setName("");
            setRating("");
            setReviewText("");

            fetchReviews();

        } catch (error) {
            toast.error(error.response.data.message || "Error occured while adding review");
            return;
        }
    }

    return (
        <section className='mb-32 w-full lg:w-1/2'>
            <h2 className='mb-12 text-3xl font-bold'>Your Review</h2>
            <div className='flex justify-between mb-12'>
            <input type="text" placeholder='Your Name' value={name}
                onChange={ ({target}) => setName(target.value) }
                className='border-2 py-2 px-4 rounded w-2/3 outline-none' />
            <input type="number" placeholder='Rating' value={rating} 
                onChange={ ({ target }) => setRating(target.value)}
                className='border-2 py-2 px-4 rounded w-2/6 ml-5 outline-none'/>
            </div>
            <textarea placeholder='Your Review' value={reviewText}
                onChange={ ({target}) => setReviewText(target.value) }
                className='border-2 w-full py-2 px-4 min-h-40 outline-none'>                
            </textarea>
            <button type='submit'
                onClick={handleReviewSubmit}
                className='mt-12 bg-red-500 text-white py-2 px-6 rounded'>
                Submit
            </button>
        </section>
    )
}

export default AddReview