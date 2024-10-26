import React, { useState, useEffect } from 'react'
import ROUTES from '../../../routes'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import Loader from '../../Loader';
import { toast } from 'react-toastify';


export default function List() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        setLoading(true)
        if (loading) <Loader />
        try {
            fetch(`${import.meta.env.VITE_BASE_URL}/api/products`) // api for the get request
                .then(response => response.json())
                .then(data => setProducts(data));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

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
    console.log('products ', products);
    const [isFormVisible, setIsFormVisible] = useState(false); // Controls the visibility of the form
    const [editingProduct, setEditingProduct] = useState(null); // Holds the product being edited
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Show form to add new user
    const handleAddProduct = () => {
        setIsFormVisible(true);
        setEditingProduct(null); // Clear editing user
        reset(); // Clear the form for new user        
    };

    // Add or update product
    const onSubmit = (data) => {
        console.log(data);
        if (editingProduct) {
            console.log(editingProduct);
            fetch(`${import.meta.env.VITE_BASE_URL}/api/product`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setIsFormVisible(false);
                })
            // Edit existing product
            setProducts(
                products.map((product) =>
                    product._id == editingProduct._id ? { ...data } : product
                )
            );
            setEditingProduct(null);
            toast.success("Product has updated Successfully", {
                position: "top-right",
            });
        } else {
            // Add new product
            try {
                fetch(`${import.meta.env.VITE_BASE_URL}/api/product/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setIsFormVisible(false);
                    })

                    toast.success("Product added Successfully", {
                        position: "top-right",
                    });

            } catch (err) {
                console.log(err);
            } finally {
                setProducts([...products, { ...data }]);
            }
        }
        reset(); // Reset form after submission
    };

    // Edit product (populate form)
    const handleEditProduct = (product) => {
        setIsFormVisible(true); // Show the form
        setEditingProduct(product);
        reset(product); // Populate the form with product data
    };

    // Delete product
    const handleDeleteProduct = (id) => {
        if (confirm("Are you sure you want to delete?")) {
            try {
                fetch(`${import.meta.env.VITE_BASE_URL}/api/product/${id}`, {
                    method: 'DELETE'
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setIsFormVisible(false);
                    })
    
            } catch (err) {
                console.log(err);
            } finally {
                console.log(id);
                setProducts(products && products.filter((product) => product._id != id));
            }
        }        
    };

    return (
        <div className="">
            <div className='flex justify-between items-center py-2'>
                <h2 className="text-xl font-bold mb-4">Manage Products</h2>
                <button className="bg-blue-500 text-white px-3 py-1 rounded btn" onClick={handleAddProduct}>Add Product</button>
            </div>
            {/* Add/Edit Product Form */}
            {isFormVisible && (
                <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
                    <div className="mb-2">
                        <label className="block mb-1">Book Name</label>
                        <input
                            {...register('bookName', { required: 'Book name is required' })}
                            className={`p-2 border rounded w-full ${errors.bookName ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Product Name"
                        />
                        {errors.bookName && <p className="text-red-500">{errors.bookName.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Image URL</label>
                        <input
                            {...register('image', { required: 'Image URL is required' })}
                            className={`p-2 border rounded w-full ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Product Name"
                        />
                        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Total Pages</label>
                        <input
                            {...register('totalPages', { required: 'Total pages field is required' })}
                            className={`p-2 border rounded w-full ${errors.totalPages ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Product Name"
                        />
                        {errors.totalPages && <p className="text-red-500">{errors.totalPages.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Rating</label>
                        <input
                            {...register('rating', { required: 'Rating is required' })}
                            className={`p-2 border rounded w-full ${errors.rating ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Product Name"
                        />
                        {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Publisher</label>
                        <input
                            {...register('publisher', { required: 'Publisher is required' })}
                            className={`p-2 border rounded w-full ${errors.publisher ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Product Name"
                        />
                        {errors.publisher && <p className="text-red-500">{errors.publisher.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Author</label>
                        <input
                            {...register('author', { required: 'Author name is required' })}
                            className={`p-2 border rounded w-full ${errors.author ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Product Name"
                        />
                        {errors.author && <p className="text-red-500">{errors.author.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Year of Publication</label>
                        <input
                            {...register('yearOfPublishing', { required: 'Year of Publication is required' })}
                            className={`p-2 border rounded w-full ${errors.yearOfPublishing ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Product Name"
                        />
                        {errors.yearOfPublishing && <p className="text-red-500">{errors.yearOfPublishing.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Price</label>
                        <input
                            type="number"
                            {...register('price', { required: 'Price is required', min: 1 })}
                            className={`p-2 border rounded w-full ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Price"
                        />
                        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1">Category</label>
                        <select
                            className={`p-2 border rounded w-full ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('category', { required: 'Category is required' })}

                        >
                            <option value="">Seelct One</option>
                            {
                                categories && categories.map((cat, i) => <option value={cat.name}>{cat.name}</option>)
                            }
                        </select>
                        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className={`py-2 px-4 rounded text-white ${editingProduct ? 'bg-blue-500' : 'bg-green-500'}`}
                    >
                        {editingProduct ? 'Save Changes' : 'Add Product'}
                    </button>
                    {/* {editingProduct && ( */}
                    <button
                        type="button"
                        onClick={() => { reset(); setEditingProduct(null); setIsFormVisible(false); }}
                        className="py-2 px-4 ml-2 rounded bg-gray-500 text-white"
                    >
                        Cancel
                    </button>
                    {/* )} */}
                </form>
            )}
            {/* Products Table */}
            {!isFormVisible && (
                <div className='overflow-x-auto'>
                    <table className="min-w-full bg-white rounded shadow table">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="text-left p-2">Image</th>
                                <th className="text-left p-2">Name</th>
                                <th className="text-left p-2">Price</th>
                                {/* <th className="text-left p-2">Category</th>
                                <th className="text-left p-2">Publisher</th>
                                <th className="text-left p-2">Total Pages</th> */}
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map((product) => (
                                <tr key={product.id} className="border-b">
                                    <td className="p-2">
                                        <img src={product.image} alt="" className='size-12 rounded' />
                                    </td>
                                    <td className="p-2">{product.bookName}</td>
                                    <td className="p-2">${product.price}</td>
                                    {/* <td className="p-2">{product.category}</td>
                                    <td className="p-2">{product.publisher}</td>
                                    <td className="p-2">{product.totalPages}</td> */}
                                    <td className="p-2 text-center flex gap-2 items-center">
                                        <button
                                            onClick={() => handleEditProduct(product)}
                                            className="bg-yellow-500 text-white py-2 px-3 mr-2 rounded"
                                        >
                                            Edit & View
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product._id)}
                                            className="bg-red-500 text-white py-2 px-3 rounded"
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
