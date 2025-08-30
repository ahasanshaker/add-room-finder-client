import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
// import { useAuth } from '../Providers/AuthProvider.jsx';
import Swal from 'sweetalert2';
import { useAuth } from '../provider/AuthProvider';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      Swal.fire('Error', 'Please fill all required fields', 'error');
      return;
    }

    try {
      // Login using AuthProvider
      await login(email, password);

      Swal.fire('Success', 'Logged in successfully!', 'success');

      // Clear form
      setFormData({ email: '', password: '' });

      // Navigate to home/dashboard
      navigate('/');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="card w-full max-w-md shadow-2xl bg-white rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Log In</h1>
        <div className="card-body">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="label font-semibold text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input input-bordered w-full focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="label font-semibold text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input input-bordered w-full focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <p className="text-sm text-gray-600">
              You don't have an account?{' '}
              <Link to="/signup" className="text-purple-600 hover:underline font-medium">
                Register
              </Link>
            </p>

            <button type="submit" className="btn btn-primary w-full mt-4">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
