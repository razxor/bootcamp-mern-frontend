import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../routes';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-2xl mt-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to={ROUTES.HOME} className="btn btn-primary btn-outline rounded-full mt-6">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
