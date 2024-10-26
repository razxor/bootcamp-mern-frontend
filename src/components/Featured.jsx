import React, { useEffect } from 'react'
import { useLocation,useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import ROUTES from '../routes';
import useSWR from 'swr';
import { Link } from 'react-router-dom';

const fetcher = (url) => fetch(import.meta.env.VITE_BASE_URL + url).then((res) => res.json());

export default function Featured() {

    const { cat } = useParams();    
    const { data, error, isLoading } = useSWR(`/api/featured_products`, fetcher);
    if (isLoading) return <Loader />;
    if (error) return <p>Error loading course: {error.message}</p>;

    return (
        <section className="product-images py-12 bg-gray-100">
            <div className="w-full sm:w-full md:w-11/12 mx-auto px-8 sm:px-8 md:px-0 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Featured Books</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    {
                        data.map((item, i) => (                            
                                item.image && (
                                    <div key={i} className="card h-56 bg-base-100 shadow-xl image-full col-span-1 md:col-span-1">
                                    <figure>
                                        <Link to={ROUTES.SINGLE_COURSE.DYNAMIC(item._id)}>
                                            <img
                                                // src={`../../images/courses/${i + 1}.jpg`}
                                                src={item.image}
                                                className='w-full'
                                                alt="Course" />
                                        </Link>
                                    </figure>
                                    <div className="card-body relative">
                                    <Link to={ROUTES.SINGLE_COURSE.DYNAMIC(item._id)}>
                                        <h2 className="card-title absolute bottom-3 hover:text-orange-600">{item.bookName}</h2>                                        
                                    </Link>                                   
                                    </div>
                                </div>
                                )
                                                    
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
