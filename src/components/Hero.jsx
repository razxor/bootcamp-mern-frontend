import React from 'react'
import ROUTES from '../routes'
import { Link } from 'react-router-dom'

export const Hero = () => {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-12  shadow-sm">
            <div className="col-span-1 sm:col-span-1 md:col-span-6 flex flex-col justify-center px-6 py-6 sm:py-6 sm:px-6 lg:px-16">
                <div className='text-3xl sm:text-3xl md:text-3xl lg:text-5xl font-bold'>Your Learning Journey Begins Here</div>
                <p className='py-2 text-md lg:text-xl'>
                    Find Your Next Favorite Course at Book Online Shop
                </p>
                <div className='flex gap-5 mt-6 lg:mb-1'>
                    <Link className='bg-orange-500 px-6 w-full sm:w-full lg:w-52 hover:bg-lime-500 py-3 rounded text-white text-lg font-bold text-center' to={ROUTES.COURSES}>
                        <i className="fa-solid fa-cart-shopping"></i> Buy Now
                    </Link>
                </div>
            </div>
            <div className="col-span-1 sm:col-span-1 md:col-span-6">
                <img src="/images/h-6.jpg" alt="hero" className='w-full' />
            </div>
        </div>
    )
}
