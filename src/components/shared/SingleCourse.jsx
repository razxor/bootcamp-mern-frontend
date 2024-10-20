import React from 'react'
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes';

const SingleCourse = (props) => {    
    const {course} = props;          
    return (
        <Link to={ROUTES.SINGLE_COURSE.DYNAMIC(course.course_id)}>        
            <div className="card bg-base-100 shadow-xl w-full rounded h-96">
                <figure>
                    <img
                        src={`${course.img_url}`}
                        alt="Shoes" />
                </figure>
                <div className="card-body p-3">
                    <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-3 justify-center">
                        <div className="col-span-3 sm:col-span-3 lg:col-span-2">
                            <h3 className="card-title text-sm py-2">
                                {course.title}
                            </h3>
                            <p className='flex gap-2 items-center'>
                                <img src={course.author_img_url} className='h-10 w-10 rounded-full'/> 
                                {course.author}
                            </p>
                        </div>
                        <div className="col-span-2 sm:col-span-2 lg:col-span-1 text-end flex flex-col justify-center items-end">
                            <Rating
                                emptySymbol="far fa-star text-orange-500"
                                fullSymbol="fas fa-star text-orange-500"
                                fractions={2}
                                initialRating={course.ratings.split('/').shift()}
                                readonly
                            //onChange={(rate) => console.log(rate)}
                            />
                            <div className="badge badge-accent badge-outline py-2 my-2">{course.level}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 justify-between items-center gap-5">
                        <div className="col-span-3 lg:col-span-3 flex gap-2">
                        <div className="badge badge-success  badge-outline font-bold">${course.price}</div>
                        <div className="badge badge-secondary  badge-outline">{course.assessments}</div>
                        <div className="badge badge-primary  badge-outline">{course.lession}</div>                        
                        <div className="badge badge-warning  badge-outline">{course.duration}</div>                        
                        <div className="badge badge-error  badge-outline">{course.student}</div>                        
                        </div>
                        <div className="col-span-3 lg:col-span-3">
                            <Link className="btn btn-outline rounded-full btn-success w-full" to={ROUTES.SINGLE_COURSE.DYNAMIC(course.course_id)}>
                                <i className="fa-regular fa-eye"></i> View Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SingleCourse
