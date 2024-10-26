import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/shared/Header'
import { Footer } from '../components/shared/Footer'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ROUTES from '../routes';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import { AuthContext } from '../Provider/AuthProvider';
import SidebarComponent from '../components/User/SidebarComponent';


const MasterLayout = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const getTitle = (pathname) => {
    switch (pathname) {
      case ROUTES.HOME:
        return 'Rs Bookshop | Home';
      case ROUTES.COURSES:
        return 'Rs Bookshop | Products';
      
      case ROUTES.FAQ:
        return 'Rs Bookshop | FAQ';
      default:
        return 'Rs Bookshop';
    }
  };

  useEffect(() => {
    //if(user) navigate(ROUTES.HOME)
  }, [user]);

  const userRoute = location.pathname.split('/').find(item => item == 'user');

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{getTitle(location.pathname)}</title>
        </Helmet>

        <Header />
        {
          user && userRoute == 'user' ?
          (
            <>
              <div className="flex min-h-screen">
                <SidebarComponent />
                <div className="flex flex-col w-full">
                  <main className="flex-grow p-6 bg-gray-100 dark:bg-gray-900">
                    <Outlet />
                  </main>
                </div>
              </div>
            </>
          )
          :
        <Outlet />
        }        
        <Footer />
        <div>
          {/* ToastContainer is necessary for rendering the toast */}
          <ToastContainer />
          {/* Other components */}
        </div>
      </HelmetProvider>
    </>
  )
}
export default MasterLayout
