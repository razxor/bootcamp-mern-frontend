import React from 'react';
import Loader from '../components/Loader';
import useSWR from 'swr';
import ROUTES from '../routes';
import { Link } from 'react-router-dom';

const fetcher = (url) => fetch(import.meta.env.VITE_BASE_URL + url).then((res) => res.json());

const ProductImages = () => {
    // const items = Array.from({ length: 6 }, (_, i) => i + 1);

    const { data, error, isLoading } = useSWR('/api/categories', fetcher);
    if (isLoading) return <Loader />;
    if (error) return <p>Error loading course: {error.message}</p>;


    return (
        <section className="product-images py-12 bg-white">
            <div className="w-full sm:w-full md:w-11/12 mx-auto px-8 sm:px-8 md:px-0 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    {
                        data.map((item, i) => (                            
                                item.image && (
                                    <div key={i} className="card h-56 bg-base-100 shadow-xl image-full col-span-1 md:col-span-1">
                                    <figure>
                                        <Link to={ROUTES.CATEGORYWISE_PRODUCTS.DYNAMIC(item.name)}>
                                            <img
                                                // src={`../../images/courses/${i + 1}.jpg`}
                                                src={item.image}
                                                className='w-full'
                                                alt="Course" />
                                        </Link>
                                    </figure>
                                    <div className="card-body relative">
                                    <Link to={ROUTES.CATEGORYWISE_PRODUCTS.DYNAMIC(item.name)}>
                                        <h2 className="card-title text-left absolute top-3 left-3">{item.name}</h2>                                        
                                    </Link>

                                    <Link to={ROUTES.CATEGORYWISE_PRODUCTS.DYNAMIC(item.name)}>                                        
                                        <button className="bottom-3 right-3 absolute btn btn-outline btn-success rounded-full">View Products</button>
                                    </Link>
                                    </div>
                                </div>
                                )
                                                    
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default ProductImages;
