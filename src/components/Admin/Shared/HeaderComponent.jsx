import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const HeaderComponent = () => {
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // Apply dark mode class to the body
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-xl font-bold text-blue-600 dark:text-white">
                    Admin Panel
                </div>

                {/* Search Bar */}
                <div className="relative w-1/3 hidden md:block">
                    <input
                        type="text"
                        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search..."
                    />
                    <div className="absolute top-2 right-2 text-gray-400 dark:text-gray-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 16l4-4m0 0l4-4m-4 4H3m13 0h6"
                            />
                        </svg>
                    </div>
                </div>

                {/* Profile Dropdown & Dark Mode Toggle */}
                <div className="flex items-center space-x-4">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="text-gray-600 dark:text-gray-300 focus:outline-none"
                        title="Toggle Dark Mode"
                    >
                        {darkMode ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 3v1m0 16v1m8.485-11.485l-.707.707m-12.02 0l-.707-.707m0 12.02l.707-.707m12.02 0l.707.707M17 12a5 5 0 11-10 0 5 5 0 0110 0zm-5 7v3m0-3a7 7 0 010-14v3"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 3a9 9 0 00-9 9h3a6 6 0 0112 0h3a9 9 0 00-9-9z"
                                />
                            </svg>
                        )}
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                            className="flex items-center focus:outline-none"
                        >
                            <img
                                className="w-10 h-10 rounded-full"
                                src="https://via.placeholder.com/150"
                                alt="User profile"
                            />
                            <span className="ml-2 text-gray-700 dark:text-white">Admin</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 ml-1 text-gray-500 dark:text-gray-300"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {profileDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 border rounded-lg shadow-lg z-50">
                                <a
                                    href="/profile"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    Profile
                                </a>
                                <a
                                    href="/settings"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    Settings
                                </a>
                                <a
                                    href="/logout"
                                    className="block px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    Logout
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};