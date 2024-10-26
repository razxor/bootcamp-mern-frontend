import React, { useState, useEffect } from 'react'
import ROUTES from '../../../routes'
import { Link } from 'react-router-dom'
import Loader from '../../Loader';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function List() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [editingUser, setEditingUser] = useState(null); // Holds the user being edited
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isFormVisible, setIsFormVisible] = useState(false); // Controls the visibility of the form


    useEffect(() => {
        setLoading(true)
        if (loading) <Loader />
        try {
            fetch(`${import.meta.env.VITE_BASE_URL}/api/users`) // api for the get request
                .then(response => response.json())
                .then(data => setUsers(data));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    }, [])

    // Add or update user
    const onSubmit = (data) => {
        if (editingUser) {
            // Edit existing user
            fetch(`${import.meta.env.VITE_BASE_URL}/api/user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...data, isAdmin: data.role == 'Admin' ? true : false })
            }).then(response => response.json())
                .then(res => {
                    setIsFormVisible(false);
                    setEditingUser(null);
                });
            setUsers(
                users && users.map((user) => (user._id == editingUser._id ? { ...data, isAdmin: data.role == 'Admin' ? true : false } : user))
            );
            toast.success("User has Updated Successfully", {
                position: "top-right",
            });
        } else {
            // Add new user
            try {
                const response = fetch(`${import.meta.env.VITE_BASE_URL}/api/user/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...data, isAdmin: data.role == 'Admin' ? true : false })
                });

                console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to add user');
                }

                const result = response.json();

                console.log('User added:', result);
            } catch (err) {
                console.log(err);
            } finally {
                //setLoading(false);
                setUsers([...users, { ...data }]);
            }
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
        try {
            fetch(`${import.meta.env.VITE_BASE_URL}/api/user/${id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    setIsFormVisible(false);
                })

        } catch (err) {
            console.log(err);
        } finally {
            setUsers(users.filter((user) => user._id != id));
        }

    };

    // Show form to add new user
    const handleAddUser = () => {
        setIsFormVisible(true);
        setEditingUser(null); // Clear editing user
        reset(); // Clear the form for new user        
    };

    return (
        <div className="">
            <div className='flex justify-between items-center py-2'>
                <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            </div>

            {/* Add/Edit User Form */}
            {isFormVisible && (
                <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
                    <div className="mb-2">
                        <label className="block mb-1">Name</label>
                        <input
                            {...register('fullname', { required: 'Name is required' })}
                            className={`p-2 border rounded w-full ${errors.fullname ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="User Name"
                        />
                        {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            disabled
                            {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
                            className={`p-2 border rounded w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="User Email"
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Photo URL</label>
                        <input
                            {...register('photo')}
                            className={`p-2 border rounded w-full`}
                            placeholder="Photo URL"
                        />
                        {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Phone No</label>
                        <input
                            {...register('phone', {required: 'Phone No is required'})}
                            className={`p-2 border rounded w-full`}
                            placeholder="Phone Number"
                        />
                        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Address</label>
                        <input
                            {...register('address', {required:'Address is required'})}
                            className={`p-2 border rounded w-full`}
                            placeholder="Address"
                        />
                        {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Role</label>
                        <select
                            {...register('role', { required: 'Role is required' })}
                            defaultValue={editingUser.isAdmin ? "Admin" : "User"}
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
                <div className='overflow-x-auto'>
                    <table className="min-w-full bg-white rounded shadow table">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Sample data */}
                            {
                                users && users.map((user, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="p-3">{user.fullname}</td>
                                            <td className="p-3">{user.email}</td>
                                            <td className="p-3 capitalize ">{user.isAdmin ? 'Admin' : 'User'}</td>
                                            <td className="p-3 flex justify-between items-center">
                                                <button
                                                    onClick={() => handleEditUser(user)}
                                                    className="bg-yellow-500 text-white py-1 px-3 mr-2 rounded"
                                                >
                                                    Edit
                                                </button>
                                                {
                                                    // !user.isAdmin && (
                                                    //     <button
                                                    //         onClick={() => handleDeleteUser(user._id)}
                                                    //         className="bg-red-500 text-white py-1 px-3 rounded"
                                                    //     >
                                                    //         Delete
                                                    //     </button>
                                                    // )
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
