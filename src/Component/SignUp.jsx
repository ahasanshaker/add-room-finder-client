import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
// import { useAuth } from '../Providers/AuthProvider.jsx';
import Swal from 'sweetalert2';
import { useAuth } from '../provider/AuthProvider';

const SignUp = () => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', photoURL: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = formData;

    if (!name || !email || !password) {
      Swal.fire('Error', 'Please fill all required fields', 'error');
      return;
    }

    try {
      await signUp(name, email, password, photoURL);
      Swal.fire('Success!', 'Account created successfully!', 'success');
      setFormData({ name: '', email: '', password: '', photoURL: '' });
      navigate('/');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="card w-full max-w-md shadow-2xl bg-white rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Sign Up</h1>
        <div className="card-body">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {['name','email','password','photoURL'].map(field => (
              <div key={field}>
                <label className="label font-semibold text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                  className="input input-bordered w-full focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            ))}

            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 hover:underline font-medium">
                Login
              </Link>
            </p>

            <button type="submit" className="btn btn-primary w-full mt-4">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
