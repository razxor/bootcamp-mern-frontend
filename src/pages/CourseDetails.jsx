import React from 'react';
import { useParams } from 'react-router-dom';
import Rating from 'react-rating';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import Loader from '../components/Loader';

const fetcher = async (url) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`);
    if (!response.ok) {
      throw new Error("Failed to fetch course data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const CourseDetails = () => {
  const { id } = useParams();
  const { data: course, error, isLoading } = useSWR(`/api/courses/${id}`, fetcher);

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading course details: {error.message}</p>;

  return (
    <>
      <Helmet>
        <title>Online Book Shop | {course?.title || "Course Details"}</title>
      </Helmet>
      <section id='bookDetails' className='w-4/5 mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-8 pt-12 gap-10'>
          <div className="col-span-1 lg:col-span-3">
            <figure>
              <img
                src={course?.img_url}
                className='rounded'
                alt="course"
              />
            </figure>
          </div>
          <div className="col-span-1 lg:col-span-5">
            <h1 className='text-3xl sm:text-3xl lg:text-4xl font-bold'>{course.title}</h1>
            <p className='py-2 text-justify'>{course.details}</p>
            <div className='py-2'>
              <Rating
                emptySymbol="far fa-star text-orange-500"
                fullSymbol="fas fa-star text-orange-500"
                fractions={2}
                initialRating={course.ratings.split('/').shift() || 5}
                readonly
              />
              <p>{course.review}</p>
            </div>
            <div className='py-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-5'>
              <h1><strong>Level:</strong> {course.level}</h1>
              <h1><strong>Lessons:</strong> {course.lessons}</h1>
              <h1><strong>Students:</strong> {course.students}</h1>
              <h1><strong>Duration:</strong> {course.duration}</h1>
              <h1><strong>Price:</strong> {course.price}</h1>
              <h1><strong>Assessments:</strong> {course.assessments}</h1>                            
            </div>
            <div className="avatar mb-6 md:mb-0 md:mr-8 flex-shrink-0 items-center gap-2 mt-4">
                <div className="h-10 rounded">
                  <img src="../../images/raz.png" alt="Owner's Image" />                  
                </div>
                <h1 className='py-1'><strong>{course.author}</strong> </h1>
              </div>
          </div>
        </div>
      </section>
    </>
  );
};
