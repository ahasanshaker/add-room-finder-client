import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/564/564619.png" 
        alt="404 Not Found" 
        className="w-80 mb-6" 
      />
      <h1 className="text-4xl font-bold mb-2">404 Not Found</h1>
      <p className="mb-4">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Go Back Home</Link>
    </div>
  );
};

export default ErrorPage;
