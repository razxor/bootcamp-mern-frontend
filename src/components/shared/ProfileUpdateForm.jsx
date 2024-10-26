import React, { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';


import { AuthContext } from '../../Provider/AuthProvider';
import { json } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfileUpdateForm = () => {
    const { user, setUser, logOutUser } = useContext(AuthContext)
    console.log(user);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    useEffect(() => {
        // Fetch current user data
        const fetchUserData = async () => {
            const userData = await fetchUserFromDatabase(user.uid);
            reset(userData); // Populate form with user's current data
        };
        if (user.uid) { // Only fetch data if userId is provided
            fetchUserData();
        }
    }, [user, reset]);

    // Function to fetch user data (replace with actual API call)
    const fetchUserFromDatabase = async (uid) => {
        return await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/${uid}`)
            .then(res => res.json())
            .then(data => {               
                return data
            })
    };

    const onSubmit = async (data) => {      
        fetch(`${import.meta.env.VITE_BASE_URL}/api/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(result => {
            console.log(result);
            if(result.acknowledged) {
                setUser(data)
                toast.success('Your Profile has been updated')
            }
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

            <div className="mb-4">
                <label className="block mb-1 font-semibold">Name</label>
                <input
                    {...register('fullname', { required: 'Name is required' })}
                    className={`p-2 border rounded w-full ${errors.fullname ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your name"
                />
                {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-semibold">Email</label>
                <input
                    type="email"
                    disabled
                    {...register('email')}
                    className={`p-2 border rounded w-full `}
                    placeholder="Enter your email"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-semibold">Photo URL</label>
                <input
                    {...register('photo')}
                    className={`p-2 border rounded w-full `}
                    placeholder="Enter Photo URL"
                />
            </div>


            <div className="mb-4">
                <label className="block mb-1 font-semibold">Phone</label>
                <input
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                    className={`p-2 border rounded w-full ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-semibold">Address</label>
                <input
                    {...register('address', { required: 'Address is required' })}
                    className={`p-2 border rounded w-full ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter your address"
                />
                {errors.address && <p className="text-red-500">{errors.address.message}</p>}
            </div>

            <button type="submit" className="w-full p-2 bg-blue-500 text-white font-semibold rounded">
                Update Profile
            </button>
        </form>
    );
};

export default ProfileUpdateForm;
