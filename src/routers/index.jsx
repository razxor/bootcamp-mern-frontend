import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home';
import ROUTES from '../routes/index'
import MasterLayout from '../layouts/MasterLayout';
import { CourseDetails } from '../pages/CourseDetails';
// import { About } from '../pages/About';
// import { Blog } from '../pages/Blog';
// import { Faq } from '../pages/Faq';
import NotFound from '../pages/NotFound';
import { Course } from '../components/Course';
import { Login } from '../pages/Auth/Login';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import Register from '../pages/Auth/Register';
import { AdminDashboard } from '../pages/Admin/AdminDashboard';
import AdminLayout from '../layouts/AdminLayout';
import { AdminUser } from '../pages/Admin/AdminUser';

const router = createBrowserRouter([
    {
        path: `${ROUTES.HOME}`,
        element: <MasterLayout />,
        children: [
            {
                path: `${ROUTES.LOGIN}`,
                element: <Login />,
            },
            {
                path: `${ROUTES.REGISTER}`,
                element: <Register />,
            },
            {
                path: `${ROUTES.HOME}`,
                element: <Home />,
            },
            {
                path: `${ROUTES.COURSES}`,
                element:
                    (
                        <PrivateRoute>
                            <Course />,
                        </PrivateRoute>
                    )
            },            
            {
                path: `${ROUTES.SINGLE_COURSE.STATIC}`,
                element:
                    (
                        <PrivateRoute>
                            <CourseDetails />,
                        </PrivateRoute>
                    )
            },

            // {
            //     path: `${ROUTES.ABOUT}`,
            //     element: <About />,
            // },
            // {
            //     path: `${ROUTES.BLOG}`,
            //     element: <Blog />,
            // },
            // {
            //     path: `${ROUTES.FAQ}`,
            //     element: <Faq />,
            // },

            {
                path: '*',              //Wildcard route for handling 404
                element: <NotFound />, // Render the NotFound page for undefined routes
            }
        ]
    },
    {
        path: `${ROUTES.HOME}`,
        element: <AdminLayout />,
        children: [
            {
                path: `${ROUTES.ADMIN_DASHBOARD}`,
                element:
                    (
                        // <AdminRoute>
                            <AdminDashboard />,
                        // </AdminRoute>
                    )
            },
            {
                path: `${ROUTES.ADMIN_USERS}`,
                element:
                    (
                        // <AdminRoute>
                            <AdminUser />,
                        // </AdminRoute>
                    )
            },
        ]
    }
]);

export default router