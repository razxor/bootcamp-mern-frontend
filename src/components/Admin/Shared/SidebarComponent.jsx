import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../routes';

export const SidebarComponent = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen">
            <nav className="p-4">
                <ul>
                    <li className="mb-4">
                        <Link to={ROUTES.ADMIN_DASHBOARD} className="hover:bg-gray-700 p-2 block rounded">Dashboard</Link>
                    </li>
                    <li className="mb-4">
                        <Link to={ROUTES.ADMIN_USERS} className="hover:bg-gray-700 p-2 block rounded">Manage Users</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/manage-products" className="hover:bg-gray-700 p-2 block rounded">Manage Products</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/manage-orders" className="hover:bg-gray-700 p-2 block rounded">Manage Orders</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
