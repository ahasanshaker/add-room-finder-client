import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useAuth } from '../provider/AuthProvider';
import { FcGoogle } from 'react-icons/fc'; // Google icon import

const Login = () => {
  const { login, googleSignIn } = useAuth();
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
      await login(email, password);
      Swal.fire('Success', 'Logged in successfully!', 'success');
      setFormData({ email: '', password: '' });
      navigate('/');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      Swal.fire('Success', 'Logged in with Google!', 'success');
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
            <button type="submit" className="btn btn-primary w-full mt-4">Login</button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex justify-center items-center gap-2"
          >
            <FcGoogle className="w-6 h-6" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
