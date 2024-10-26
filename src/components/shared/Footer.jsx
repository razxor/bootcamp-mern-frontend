import React from 'react'
import { Link } from 'react-router-dom'
import ROUTES from '../../routes'

export const Footer = () => {
    return (
        <footer className="footer py-8 bg-[#161a1d] text-gray-200">
            <div className="w-full px-6">
                <div className="w-full sm:w-full md:w-5/6 mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {/* Address Section */}
                    <div className="address">
                        <h3 className="text-xl font-semibold mb-4">Address</h3>
                        <p>123 Main St.</p>
                        <p>Suite 500</p>
                        <p>New York, NY 10001</p>
                    </div>

                    {/* Contact Section */}
                    <div className="contact">
                        <h3 className="text-xl font-semibold mb-4">Contact</h3>
                        <p>Phone: (123) 456-7890</p>
                        <p>Email: contact@example.com</p>
                    </div>

                    {/* Social Links Section */}
                    <div className="social">
                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-primary">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-primary">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-primary">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-primary">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-full md:w-5/6 text-left sm:text-left md:text-center mt-8 text-gray-400 text-sm">
                    © {new Date().getFullYear()} Rs Online Bookshop. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
