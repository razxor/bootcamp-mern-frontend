import React from 'react'
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes';

const SingleCourse = (props) => {
    const { book } = props;
    return (
        <Link to={ROUTES.SINGLE_COURSE.DYNAMIC(book._id)}>
            <div className="card bg-base-100 shadow-xl w-full rounded h-80">
                <figure>
                    <img
                        src={`${book.image}`}
                        alt="Shoes" />
                </figure>
                <div className="card-body p-3">
                    <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-3 justify-center">
                        <div className="col-span-3 sm:col-span-3 lg:col-span-2">
                            <h2 className="text-xl font-bold">
                                {book.bookName}
                            </h2>
                            <p>
                                <i className="fa-solid fa-user-tie"></i> {book.author}
                            </p>
                        </div>
                        <div className="col-span-2 sm:col-span-2 lg:col-span-1 text-end flex flex-col justify-center items-end">
                            <h2 className='tetx-2xl font-bold'>${book.price}</h2>
                            <Rating
                                emptySymbol="far fa-star text-orange-500"
                                fullSymbol="fas fa-star text-orange-500"
                                fractions={2}
                                initialRating={book.rating}
                                readonly
                            //onChange={(rate) => console.log(rate)}
                            />
                            <div className="badge badge-accent badge-outline py-2 my-2 text-xs">{book.category}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 justify-between items-center">
                        <Link className="btn btn-outline rounded-full btn-success w-full" to={ROUTES.SINGLE_COURSE.DYNAMIC(book._id)}>
                            <i className="fa-regular fa-eye"></i> View Details
                        </Link>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SingleCourse
