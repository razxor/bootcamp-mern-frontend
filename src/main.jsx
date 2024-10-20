import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './assets/css/custom.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import router from './routers';

import AuthProvider from './Provider/AuthProvider'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
