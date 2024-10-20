import React from 'react';
import Loader from '../components/Loader';
import useSWR from 'swr';
import ROUTES from '../routes';
import { Link } from 'react-router-dom';

const fetcher = (url) => fetch(import.meta.env.VITE_BASE_URL + url).then((res) => res.json());

const ProductImages = () => {
    // const items = Array.from({ length: 6 }, (_, i) => i + 1);

    const { data, error, isLoading } = useSWR('/api/courses', fetcher);
    if (isLoading) return <Loader />;
    if (error) return <p>Error loading course: {error.message}</p>;


    return (
        <section className="product-images py-12 bg-white">
            <div className="w-full sm:w-full md:w-2/3 mx-auto px-8 sm:px-8 md:px-0 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {
                        data.map((item, i) => (
                            <div key={i} className="card h-56 bg-base-100 shadow-xl image-full col-span-1 md:col-span-1">
                                <figure>
                                    <Link to={ROUTES.SINGLE_COURSE.DYNAMIC(item.course_id)}>
                                        <img
                                            // src={`../../images/courses/${i + 1}.jpg`}
                                            src={item.img_url}
                                            className='w-full'
                                            alt="Course" />
                                    </Link>
                                </figure>
                                <div className="card-body relative">
                                <Link to={ROUTES.SINGLE_COURSE.DYNAMIC(item.course_id)}>
                                    <h2 className="card-title bottom-5 absolute">{item.title}</h2>
                                </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default ProductImages;
