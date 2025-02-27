import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FiPlus, FiMinus } from "react-icons/fi";
import { RxStarFilled } from "react-icons/rx";
import RelatedProducts from "../../../components/relatedProducts/RelatedProducts.jsx"
import AddReview from "../../../components/addReview/AddReview.jsx"
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const product = () => {

    const [productDetail, setProductDetail] = useState("");
    const [productReview, setProductReview] = useState([]);
    const [mainImg, setMainImg] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [itemQuantity, setItemQuantity] = useState(1);

    const { productId } = useParams();
    const navigateTo = useNavigate();
    const isAuthenticated = useSelector(state => state.isAuthenticated);

    useEffect(() => {
        fetchProduct();
        fetchReviews();
        window.scrollTo(0, 0);
    }, [productId]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`/api/v1/product/detail/${productId}`);
            setProductDetail(response.data.data);
            setMainImg(response.data.data.images[0]);
        } catch (error) {
            toast.error("Error occured while fetching product detail");
        }
    }

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`/api/v1/review/all/${productId}`);
            setProductReview(response.data.data);
        } catch (error) {
            toast.error("Error occured while fetching reviews");
        }
    }

    const handleQuantity = ({ target }) => {
        let prevValue = itemQuantity;

        if (target.id === "add") {
            if (itemQuantity > 2) {
                return;
            } else if (productDetail.quantity >= prevValue + 1) {
                setItemQuantity(prevValue + 1);
            }
        } else {
            if (itemQuantity < 2) {
                return;
            } else {
                setItemQuantity(prevValue - 1);
            }
        }
    }

    const handleAddToCart = async () => {

        if(!isAuthenticated){
            navigateTo("/login");
            return;
        }

        try {
            await axios.post("/api/v1/cart/add", {
                quantity: itemQuantity,
                productId,
                color: selectedColor,
                priceOfSingleProduct: productDetail.price,
                totalPrice: itemQuantity * productDetail.price,
                name: productDetail.name,
                image: productDetail.images[0]
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            toast.success("Item added to cart successfully")
        } catch (error) {
            toast.error("Error occured while adding product to cart");
        }
    }

    if (!productDetail)
        return (
            <div
                className="min-h-72 py-56 flex justify-center items-center">
                <h1
                    className='text-7xl font-bold'>
                    Product Not found
                </h1>
            </div>
        )

    return (
        <main className="lg:px-40 px-6">
            <section className="flex lg:flex-nowrap flex-wrap mt-40 mb-20">
                <div className='w-2/12'>
                    {
                        productDetail.images.map(imag => (
                            <div
                                key={imag}
                                onClick={() => setMainImg(imag)}
                                className="lg:h-32 h-24 w-24 lg:w-32 mb-10 cursor-pointer border-2 flex justify-center items-center p-4 lg:mr-16 hover:border-slate-300 hover:shadow-lg">
                                <img src={"http://localhost:8000/" + imag} className='h-full' alt="" />
                            </div>
                        ))
                    }
                </div>
                <div
                    className="w-3/4 ml-10 lg:ml-0 lg:w-1/3 flex justify-center items-center h-[40rem]">
                    <img src={"http://localhost:8000/" + mainImg} alt=""
                        className="rounded-md h-[35rem]" />
                </div>
                <div
                    className="lg:ml-40 lg:w-1/2 w-full mt-20 lg:mt-0">
                    <div
                        className="pb-10 border-b-2 flex items-center justify-between">
                        <h2
                            className="font-semibold text-2xl lg:text-3xl leading-relaxed">
                            {productDetail.name}
                        </h2>
                        {
                            productDetail.quantity < 1 && (
                                <p className="bg-red-200 py-2 px-8 font-bold rounded-sm">Out of stock</p>
                            )
                        }
                    </div>
                    <div
                        className="pb-10 border-b-2 my-10">
                        <h3
                            className=" text-5xl leading-relaxed text-red-500">
                            Rs. {productDetail.price}
                        </h3>
                    </div>
                    {productDetail.colors[0] &&
                        <div
                            className="pb-10 border-b-2 my-10 flex items-center gap-6">
                            <p className="mr-6 font-bold text-2xl">
                                Colors:
                            </p>
                            {
                                productDetail.colors.map(color => (
                                    <div
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        style={selectedColor === color ? { backgroundColor: color, border: "5px solid black" } : { backgroundColor: color }}
                                        className="hover:border-slate-900 border-white border-4 cursor-pointer w-14 h-14 rounded-full bg-slate-700">
                                    </div>
                                ))
                            }
                        </div>
                    }
                    <div className='flex gap-32 items-center'>
                        <p>Quantity</p>
                        <div className='flex gap-4 items-center'>
                            <div id='subtract' onClick={handleQuantity}
                                style={itemQuantity < 2 ? { backgroundColor: "#f1f5f9", cursor: "not-allowed" } : {}}
                                className='bg-slate-200 cursor-pointer hover:bg-slate-400 hover:text-white rounded-sm p-2'>
                                <FiMinus className='pointer-events-none' />
                            </div>
                            <span
                                className='text-center select-none w-32'>
                                {itemQuantity}
                            </span>
                            <div id='add' onClick={handleQuantity}
                                style={itemQuantity > 2 ? { backgroundColor: "#f1f5f9", cursor: "not-allowed" } : {}}
                                className='bg-slate-200 cursor-pointer hover:bg-slate-400 hover:text-white rounded-sm p-2'>
                                <FiPlus className='pointer-events-none' />
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="w-full my-20 bg-red-500 hover:bg-red-600 text-white rounded-sm py-5">
                        Add To Cart
                    </button>
                </div>
            </section>
            <section className="mb-20">
                {
                    productDetail.description ? (
                        <div>
                            <h3 className='mb-5 text-3xl font-bold'>Description</h3>
                            <p>{productDetail.description}</p>
                        </div>
                    ) : null
                }
                {
                    productDetail.size ? (
                        <div>
                            <h3 className='mb-5 mt-10 text-3xl font-bold'>Size</h3>
                            <p className=''>{productDetail.size}</p>
                        </div>
                    ) : null
                }
            </section>
            <AddReview productId={productDetail._id} fetchReviews={fetchReviews} />
            <section className='mb-32'>
                <h2 className='mb-12 text-2xl lg:text-3xl font-bold'>Ratings & Reviews of {productDetail.name}</h2>
                {
                    productReview.length > 0 ? (
                        productReview.map(review => (
                            <div key={review._id} className='border-b-2 mb-12 pb-5'>
                                <div className='flex items-center gap-7 mb-8'>
                                    <div className='flex items-center gap-3 bg-red-500 text-white py-1 px-2 rounded-md text-lg'>
                                        <span className='text-xs lg:text-xl'>{review.rating}</span>
                                        <RxStarFilled />
                                    </div>
                                    <h3 className='lg:text-3xl text-2xl font-bold'>{review.name}</h3>
                                </div>
                                <p>{review.reviewText}</p>
                            </div>
                        ))
                    ) : <h2 className='font-bold text-red-500'>No Reviews Found</h2>
                }
            </section>
            <RelatedProducts category={productDetail.category} />
        </main>
    )
}

export default product