import React, { useEffect } from 'react'
import { useLocation,useParams } from 'react-router-dom';
import SingleCourse from '../components/shared/SingleCourse';
import Loader from '../components/Loader';
import useSWR from 'swr';

const fetcher = (url) => fetch(import.meta.env.VITE_BASE_URL + url).then((res) => res.json());

export default function CategoryWiseProducts() {
    const { cat } = useParams();    
    const { data, error, isLoading } = useSWR(`/api/categorywise_products/${cat}`, fetcher);
    if (isLoading) return <Loader />;
    if (error) return <p>Error loading course: {error.message}</p>;

  return (
    <section id='Book' className='w-full lg:w-4/5 px-6 sm:px-6 md:mx-auto pb-9'>
            <div className="heading text-center py-6">
                <h1 className='text-6xl font-bold'>{cat}</h1>
                {/* <p className='py-2'>
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                </p> */}
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    data
                    ?
                    data.map((item, i) => {
                        return (
                            <div className="col-span-1" key={i}>
                                <SingleCourse book={item} />
                            </div>
                        )
                    })
                    :
                    (
                        <h1 className='text-black'>No result Found</h1>
                    )
                }
            </div>
        </section>
  )
}