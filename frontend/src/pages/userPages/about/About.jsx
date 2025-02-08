import React from 'react'
import aboutImg from "../../../assets/images/about img.png"

const About = () => {
    return (
        <main className="px-40">
            <section className="my-20 flex-wrap flex items-center justify-between">
                <div className="w-1/2">
                    <h1 className='mb-20 text-7xl font-semibold'>Our Story</h1>
                    <p className='leading-relaxed font-medium'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam sit, ipsam eum nam est iure culpa
                        cumque, iste laborum, voluptatum veniam ad. Nulla quasi odit soluta atque dicta placeat, recusandae
                        magnam consequuntur, numquam rerum animi exercitationem, eius sunt. Id ipsa magni optio, hic velit
                        consequuntur temporibus esse cum expedita quisquam.
                    </p>
                    <p className='leading-relaxed font-medium'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione delectus amet facilis dolorem ipsam
                        repudiandae, explicabo asperiores eos pariatur? Earum?
                    </p>
                </div>
                <img src={aboutImg} alt="" 
                    className='w-1/3 rounded'/>
            </section>
        </main>
    )
}

export default About