import React from 'react'
import deliveryIcon from "../../assets/images/truck icon.png"
import customerServiceIcon from "../../assets/images/saller icon.png"
import guranteeIcon from "../../assets/images/money.png"

const Service = () => {
    return (
        <section className="flex flex-wrap justify-between gap-14 my-36 lg:mx-40">
            <div 
                className="flex flex-col justify-center items-center gap-7 mx-auto" >
                <img src={deliveryIcon} alt="" />
                <h3 className='text-4xl mt-5 font-semibold'>
                    FREE AND FAST DELIVERY
                </h3>
                <p>Free delivery for all orders over $140</p>
            </div>
            <div 
                className="flex flex-col justify-center items-center gap-10 mx-auto" >
                <img src={customerServiceIcon} alt="" />
                <h3 className='text-4xl font-semibold mt-5'>
                    24/7 CUSTOMER SERVICE
                </h3>
                <p>Friendly 24/7 customer support</p>
            </div>
            <div 
                className="flex flex-col justify-center items-center gap-10 mx-auto" >
                <img src={guranteeIcon} alt="" />
                <h3 className='text-4xl mt-5 font-semibold'>
                    MONEY BACK GUARANTEE
                </h3>
                <p>We return money within 30 days</p>
            </div>
        </section>
    )
}

export default Service