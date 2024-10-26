import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function List() {
    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        setLoading(true)
        if (loading) <Loader />
        try {
            fetch(`${import.meta.env.VITE_BASE_URL}/api/categories`) // api for the get request
                .then(response => response.json())
                .then(data => setCategories(data));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    }, [])

    const [editingCategory, setEditingCategory] = useState(null); // Holds the category being edited
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isFormVisible, setIsFormVisible] = useState(false); // Controls the visibility of the form

    // Add or update category
    const onSubmit = (data) => {
        if (editingCategory) {
            // Edit existing category
            setCategories(
                categories.map((category) =>
                    category.id === editingCategory.id ? { ...data, id: editingCategory.id } : category
                )
            );
            setEditingCategory(null);
        } else {
            // Add new category
            try {
                const response = fetch(`${import.meta.env.VITE_BASE_URL}/api/category/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to add user');
                }

                const result = response.json();

                console.log('P added:', result);
            } catch (err) {
                console.log(err);
            } finally {
                setCategories([...categories, { ...data, id: categories.length + 1 }]);
            }
        }
        reset(); // Reset form after submission
        setIsFormVisible(false); // Hide form after adding or editing category
    };

    // Edit category (populate form)
    const handleEditCategory = (category) => {
        setEditingCategory(category);
        reset(category); // Populate the form with category data
        setIsFormVisible(true); // Show the form
    };

    // Delete category
    const handleDeleteCategory = (id) => {
        setCategories(categories.filter((category) => category.id !== id));
    };

    // Show form to add new category
    const handleAddCategory = () => {
        setIsFormVisible(true);
        setEditingCategory(null); // Clear editing category
        reset(); // Clear the form for new category
    };

    return (
        <div className="p-6">
            <div className='flex justify-between items-center py-2'>
                <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
                {/* Show Add Category Button if Table is Visible */}
                {!isFormVisible && (
                    <button
                        onClick={handleAddCategory}
                        className="mb-4 bg-green-500 text-white py-2 px-4 rounded"
                    >
                        Add Category
                    </button>
                )}
            </div>

            {/* Add/Edit Category Form */}
            {isFormVisible && (
                <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
                    <div className="mb-2">
                        <label className="block mb-1">Category Image URL</label>
                        <input
                            {...register('image', { required: 'Image URL is required' })}
                            className={`p-2 border rounded w-full ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Category Image URL"
                        />
                        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Category Name</label>
                        <input
                            {...register('name', { required: 'Category name is required' })}
                            className={`p-2 border rounded w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Category Name"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Description</label>
                        <textarea
                            {...register('description')}
                            className={`p-2 border rounded w-full`}
                            placeholder="Category Description"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`py-2 px-4 rounded text-white ${editingCategory ? 'bg-blue-500' : 'bg-green-500'}`}
                    >
                        {editingCategory ? 'Save Changes' : 'Add Category'}
                    </button>

                    {/* Cancel Button */}
                    <button
                        type="button"
                        onClick={() => { reset(); setEditingCategory(null); setIsFormVisible(false); }}
                        className="py-2 px-4 ml-2 rounded bg-gray-500 text-white"
                    >
                        Cancel
                    </button>
                </form>
            )}

            {/* Categories Table */}
            {!isFormVisible && (
                <div className='overflow-x-auto'>
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="text-left p-2">Image</th>
                                <th className="text-left p-2">Name</th>
                                <th className="text-left p-2">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories && categories.map((category, i) => (
                                <tr key={i} className="border-b">
                                    <td className="p-2">
                                        <img src={category.image} className='rounded' width={100} alt="" />
                                    </td>
                                    <td className="p-2">{category.name}</td>
                                    <td className="p-2">{category.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
