import React from 'react';
import { Link } from 'react-router';

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="card w-full max-w-md shadow-2xl bg-white rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Sign Up</h1>
        <div className="card-body">
          <form className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="label font-semibold text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="label font-semibold text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="label font-semibold text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Photo URL Field */}
            <div>
              <label className="label font-semibold text-gray-700">Photo URL</label>
              <input
                type="text"
                placeholder="Enter photo URL"
                className="input input-bordered w-full focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 hover:underline font-medium">
                Login
              </Link>
            </p>

            <button className="btn btn-primary w-full mt-4">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
