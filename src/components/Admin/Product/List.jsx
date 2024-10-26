import React, { useState, useEffect } from 'react';
import ROUTES from '../../../routes';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Loader from '../../Loader';

export default function List() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setLoading(true);
        if (loading) return <Loader />;

        async function fetchData() {
            try {
                const productsResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/products`);
                const productsData = await productsResponse.json();
                setProducts(productsData);

                const categoriesResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/categories`);
                const categoriesData = await categoriesResponse.json();
                setCategories(categoriesData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchData();
    }, []);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleAddProduct = () => {
        setIsFormVisible(true);
        setEditingProduct(null);
        reset();
    };

    const onSubmit = async (data) => {
        try {
            const url = editingProduct
                ? `${import.meta.env.VITE_BASE_URL}/api/product`
                : `${import.meta.env.VITE_BASE_URL}/api/product/add`;

            const response = await fetch(url, {
                method: editingProduct ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            setIsFormVisible(false);
            reset();
            setProducts(
                editingProduct
                    ? products.map((product) => (product._id === editingProduct._id ? result : product))
                    : [...products, result]
            );
            setEditingProduct(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditProduct = (product) => {
        setIsFormVisible(true);
        setEditingProduct(product);
        reset(product);
    };

    const handleDeleteProduct = async (id) => {
        try {
            await fetch(`${import.meta.env.VITE_BASE_URL}/api/product/${id}`, { method: 'DELETE' });
            setProducts(products.filter((product) => product._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6  mx-auto">
            <div className="flex justify-between items-center py-2">
                <h2 className="text-xl font-bold mb-4">Manage Products</h2>
                <button
                    className="bg-blue-500 text-white px-3 py-1 rounded btn"
                    onClick={handleAddProduct}
                >
                    Add Product
                </button>
            </div>
            {isFormVisible && (
                <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4 bg-gray-100 p-4 rounded-md">
                    <FormField
                        label="Book Name"
                        register={register('bookName', { required: 'Book name is required' })}
                        placeholder="Enter Book Name"
                        error={errors.bookName}
                    />
                    <FormField
                        label="Image URL"
                        register={register('image', { required: 'Image URL is required' })}
                        placeholder="Enter Image URL"
                        error={errors.image}
                    />
                    {/* Additional form fields similar to above */}
                    <button
                        type="submit"
                        className={`py-2 px-4 rounded text-white ${
                            editingProduct ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                    >
                        {editingProduct ? 'Save Changes' : 'Add Product'}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            reset();
                            setEditingProduct(null);
                            setIsFormVisible(false);
                        }}
                        className="py-2 px-4 ml-2 rounded bg-gray-500 text-white"
                    >
                        Cancel
                    </button>
                </form>
            )}
            {!isFormVisible && (
                <div className="overflow-x-auto">
                    <table className=" bg-white rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200 text-sm md:text-base">
                                <th className="p-2 text-left">Image</th>
                                <th className="p-2 text-left">Name</th>
                                <th className="p-2 text-left">Price</th>
                                <th className="p-2 text-left">Category</th>
                                <th className="p-2 text-left">Publisher</th>
                                <th className="p-2 text-left">Total Pages</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} className="border-b text-sm md:text-base">
                                    <td className="p-2">
                                        <img src={product.image} alt={product.bookName} className="w-12 h-12 rounded" />
                                    </td>
                                    <td className="p-2">{product.bookName}</td>
                                    <td className="p-2">${product.price}</td>
                                    <td className="p-2">{product.category}</td>
                                    <td className="p-2">{product.publisher}</td>
                                    <td className="p-2">{product.totalPages}</td>
                                    <td className="p-2 flex flex-col sm:flex-row justify-center items-center gap-2">
                                        <button
                                            onClick={() => handleEditProduct(product)}
                                            className="bg-yellow-500 text-white py-1 px-3 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product._id)}
                                            className="bg-red-500 text-white py-1 px-3 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

const FormField = ({ label, register, placeholder, error }) => (
    <div className="mb-2">
        <label className="block mb-1">{label}</label>
        <input
            {...register}
            className={`p-2 border rounded w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
            placeholder={placeholder}
        />
        {error && <p className="text-red-500">{error.message}</p>}
    </div>
);
