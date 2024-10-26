import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from 'react-rating';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import Loader from '../components/Loader';
import { AuthContext } from '../Provider/AuthProvider';

import { useForm } from "react-hook-form";


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
  const { register, handleSubmit, watch, formState: { errors } } = useForm(); 

  const [modalOpen, setModalOpen] = useState(false)
  const { user } = useContext(AuthContext)
  const { id } = useParams();
  const { data: book, error, isLoading } = useSWR(`/api/product/${id}`, fetcher);

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading Book details: {error.message}</p>;


  const onSubmit = async payload => {    
    await fetch(`${import.meta.env.VITE_BASE_URL}/api/order`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload, user_id: user._id, product_id:book._id })
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        toast.success('Your order created successfully.')
        closeModal(); 
      })
  }

  
  const closeModal = (e) => {
    // e.preventDefault()
    const modal = document.getElementById('shippingModal');
    if (modal) {
        modal.close(); // Close the modal
    }
};

  const handleClick = async (book) => {
    const modal = document.getElementById('shippingModal');
    if (modal) {
      modal.showModal(); // Open the modal
    }    
  }

  return (
    <>
      <Helmet>
        <title>Rs Bookshop | {book?.bookName || "Book Details"}</title>
      </Helmet>
      <section id='bookDetails' className='w-4/5 mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-8 py-12 gap-10'>
          <div className="col-span-1 lg:col-span-3">
            <figure>
              <img
                src={`${book.image}`}
                alt="car!" />
            </figure>
          </div>
          <div className="col-span-1 lg:col-span-5">
            <div className='flex justify-between items-center'>
              <h1 className='text-3xl sm:text-3xl lg:text-4xl font-bold'>{book.bookName}</h1>
              <div className='py-2'>
                <Rating
                  emptySymbol="far fa-star text-orange-500"
                  fullSymbol="fas fa-star text-orange-500"
                  fractions={2}
                  initialRating={book.rating}
                  readonly
                //onChange={(rate) => console.log(rate)}
                />
              </div>
            </div>
            <h1 className='text-3xl sm:text-3xl lg:text-xl font-semi-bold py-2'>${book.price}</h1>
            <div className='py-2 grid grid-cols-2'>
              <h1 className='py-1'><strong>Author:</strong> {book.author}</h1>
              <h1 className='py-1'><strong>Publisher:</strong> {book.publisher}</h1>
              <h1 className='py-1'><strong>Category:</strong> {book.category}</h1>
              <h1 className='py-1'><strong>Total Pages:</strong> {book.totalPages}</h1>
              <h1 className='py-1'><strong>Year of Publishing:</strong> {book.yearOfPublishing}</h1>
            </div>

            <div className='flex flex-col sm:flex-col md:flex-row gap-2  pt-3 '>
              {/* <button className='btn btn-warning rounded w-full sm:w-full md:w-1/2' onClick={() => handleClick(book, "has been added to the Wishlist")}>Wish to Read</button> */}
              <button className='btn btn-success text-white rounded w-full sm:w-full md:w-1/2' onClick={() => handleClick(book, "has been added to the Cart")}>Buy Now</button>
            </div>
          </div>
        </div>
      </section>

      <dialog id="shippingModal" className="modal">
        <div className="modal-box">
          <form>
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
          </form>

          <div className='grid'>
            <h1 className='text-2xl text-center py-3 font-bold'>Shipping Details</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col">
                <label htmlFor="fullname">Your Name</label>
                <input
                    id="fullname"
                    defaultValue={user?.fullname}
                    {...register('fullname', { required: true })}
                    placeholder="Name"
                    className="input input-bordered input-success w-full"
                />
                {errors.fullname && <small role="alert" className="text-red-500">Your name is required</small>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    defaultValue={user?.email}
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid email address'
                        }
                    })}
                    type="text"
                    placeholder="Email"
                    className="input input-bordered input-success w-full"
                />
                {errors.email && <small role="alert" className="text-red-500">{errors.email.message}</small>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="phone">Phone Number</label>
                <input
                    id="phone"
                    defaultValue={user?.phone}
                    {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                            value: /^[0-9]+$/,
                            message: 'Invalid phone number'
                        }
                    })}
                    type="text"
                    placeholder="Phone Number"
                    className="input input-bordered input-success w-full"
                />
                {errors.phone && <small role="alert" className="text-red-500">{errors.phone.message}</small>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    defaultValue={user?.address}
                    {...register('address', { required: 'Address is required' })}
                    type="text"
                    placeholder="Address"
                    className="input input-bordered input-success w-full"
                />
                {errors.address && <small role="alert" className="text-red-500">{errors.address.message}</small>}
            </div>

            <div className="flex flex-col">
                <button type="submit" className="w-1/3 mx-auto btn btn-success text-white">
                    Order Confirm
                </button>
            </div>
        </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
