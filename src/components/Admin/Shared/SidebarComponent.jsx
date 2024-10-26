import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../routes';

export const SidebarComponent = ({ isSidebarOpen, onClose }) => {
    return (
        <aside
            className={`fixed inset-y-0 left-0 z-20 w-64 transform bg-gray-800 text-white p-4 transition-transform duration-300 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:relative md:translate-x-0 md:min-h-screen`}
        >
            <nav>
                <button
                    onClick={onClose}
                    className="md:hidden text-gray-300 hover:text-white mb-4"
                >
                    Close
                </button>
                <ul>
                    <li>
                        <Link
                            to={ROUTES.ADMIN_DASHBOARD}
                            className="hover:bg-gray-700 p-2 block rounded"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={ROUTES.ADMIN_CATEGORIES}
                            className="hover:bg-gray-700 p-2 block rounded"
                        >
                            Manage Category
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={ROUTES.ADMIN_PRODUCTS}
                            className="hover:bg-gray-700 p-2 block rounded"
                        >
                            Manage Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={ROUTES.ADMIN_USERS}
                            className="hover:bg-gray-700 p-2 block rounded"
                        >
                            Manage Users
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};
