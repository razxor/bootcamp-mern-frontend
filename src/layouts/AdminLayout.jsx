import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ROUTES from '../routes';

import {HeaderComponent} from '../components/Admin/Shared/HeaderComponent';
import {FooterComponent} from '../components/Admin/Shared/FooterComponent';
import {SidebarComponent} from '../components/Admin/Shared/SidebarComponent';

const AdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
    setSidebarOpen(false); // Close sidebar when location changes (for mobile)
  }, [location]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{getTitle(location.pathname)}</title>
      </Helmet>

      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <SidebarComponent isSidebarOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className="flex flex-1 flex-col ">
          {/* Header */}
          <HeaderComponent onSidebarToggle={() => setSidebarOpen(!isSidebarOpen)} />

          {/* Main Area */}
          <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-900 ">
            <Outlet />
          </main>

          {/* Footer */}
          <FooterComponent />
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </HelmetProvider>
  );
};

export default AdminLayout;
