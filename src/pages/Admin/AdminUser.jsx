import React from 'react'

export const AdminUser = () => {
    return (
        <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <table className="w-full bg-white rounded shadow">
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
                    <tr>
                        <td className="p-3">John Doe</td>
                        <td className="p-3">john@example.com</td>
                        <td className="p-3">Admin</td>
                        <td className="p-3">
                            <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
