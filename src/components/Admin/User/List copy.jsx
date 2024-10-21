import React, { useState, useEffect } from 'react'
import ROUTES from '../../../routes'
import { Link } from 'react-router-dom'
import useSWR from 'swr';
import Loader from '../../Loader';
import { useForm } from 'react-hook-form';

const fetcher = (url) => fetch(import.meta.env.VITE_BASE_URL + url).then((res) => res.json());

export default function List() {        
    const { data, error, isLoading } = useSWR('/api/users', fetcher);
    if (isLoading) return <Loader />;
    if (error) return <p>Error loading course: {error.message}</p>;    

    const [users, setUsers] = useState(data);
    useEffect(() => {
        //setUsers(data)
        console.log(users);
    }, [])


    const [editingUser, setEditingUser] = useState(null); // Holds the user being edited
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isFormVisible, setIsFormVisible] = useState(false); // Controls the visibility of the form

    // Add or update user
    const onSubmit = (data) => {
        if (editingUser) {
            // Edit existing user
            setUsers(
                users.map((user) => (user.id === editingUser.id ? { ...data, id: editingUser.id } : user))
            );
            setEditingUser(null);
        } else {
            // Add new user
            setUsers([...users, { ...data, id: users.length + 1 }]);
        }
        reset(); // Reset form after submission
        setIsFormVisible(false); // Hide form after adding or editing user
    };

    // Edit user (populate form)
    const handleEditUser = (user) => {
        setEditingUser(user);
        reset(user); // Populate the form with user data
        setIsFormVisible(true); // Show the form
    };

    // Delete user
    const handleDeleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    // Show form to add new user
    const handleAddUser = () => {
        setIsFormVisible(true);
        setEditingUser(null); // Clear editing user
        reset(); // Clear the form for new user
    };
    return (
        <div className="p-6 bg-gray-100">
            <div className='flex justify-between items-center py-2'>
                <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
                {!isFormVisible && (
                    <Link to={ROUTES.ADMIN_USERS_ADD}>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded btn">Add User</button>
                    </Link>
                )}
            </div>

            {/* Add/Edit User Form */}
            {isFormVisible && (
                <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
                    <div className="mb-2">
                        <label className="block mb-1">Name</label>
                        <input
                            {...register('name', { required: 'Name is required' })}
                            className={`p-2 border rounded w-full ${errors.fullname ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="User Name"
                        />
                        {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
                            className={`p-2 border rounded w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="User Email"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Role</label>
                        <select
                            {...register('role', { required: 'Role is required' })}
                            className={`p-2 border rounded w-full ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                        {errors.role && <p className="text-red-500">{errors.role.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className={`py-2 px-4 rounded text-white ${editingUser ? 'bg-blue-500' : 'bg-green-500'}`}
                    >
                        {editingUser ? 'Save Changes' : 'Add User'}
                    </button>

                    {/* Cancel Button */}
                    <button
                        type="button"
                        onClick={() => { reset(); setEditingUser(null); setIsFormVisible(false); }}
                        className="py-2 px-4 ml-2 rounded bg-gray-500 text-white"
                    >
                        Cancel
                    </button>
                </form>
            )}


            {/* Users Table */}
            {!isFormVisible && (
                <table className="w-full bg-white rounded shadow">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            {/* <th className="p-3">Role</th> */}
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Sample data */}
                        {
                            users&& users.map((user, i) => {
                                return (
                                    <tr key={i}>
                                        <td className="p-3">{user.fullname}</td>
                                        <td className="p-3">{user.email}</td>
                                        {/* <td className="p-3 uppercase">{user.role}</td> */}
                                        <td className="p-3">
                                            <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                                            <button className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )}
        </div>
    )
}
