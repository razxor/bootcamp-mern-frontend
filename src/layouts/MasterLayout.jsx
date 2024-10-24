import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/shared/Header'
import { Footer } from '../components/shared/Footer'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ROUTES from '../routes';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import { AuthContext } from '../Provider/AuthProvider';


const MasterLayout = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
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
    //if(user) navigate(ROUTES.HOME)
  }, [user]);
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{getTitle(location.pathname)}</title>
        </Helmet>

        <Header />
        <Outlet />
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
