import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/shared/Header'
import { Footer } from '../components/shared/Footer'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ROUTES from '../routes';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { HeaderComponent } from '../components/Admin/Shared/HeaderComponent';
import { FooterComponent } from '../components/Admin/Shared/FooterComponent';
import { SidebarComponent } from '../components/Admin/Shared/SidebarComponent';


const AdminLayout = () => {
    const location = useLocation();

    const getTitle = (pathname) => {
        switch (pathname) {
            case ROUTES.HOME:
                return 'Online Book Shop | Home';
            case ROUTES.ABOUT:
                return 'Online Book Shop | About';
            case ROUTES.BLOG:
                return 'Online Book Shop | Blog';
            case ROUTES.FAQ:
                return 'Online Book Shop | FAQ';
            default:
                return 'Online Book Shop';
        }
    };

    useEffect(() => {

    }, [location]);
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{getTitle(location.pathname)}</title>
                </Helmet>

                <div className="flex min-h-screen">
                    <SidebarComponent />
                    <div className="flex flex-col w-full">
                        <HeaderComponent />
                        <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-900">
                            <Outlet />
                        </main>
                    </div>
                </div>


                <FooterComponent />
                <div>
                    {/* ToastContainer is necessary for rendering the toast */}
                    <ToastContainer />
                    {/* Other components */}
                </div>
            </HelmetProvider>
        </>
    )
}
export default AdminLayout
