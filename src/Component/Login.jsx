import React from 'react';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div>
           
             <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
                 <h1 className='text-center'>Log In</h1>
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label> 
          <input type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <div><p>You don't have an account? please <Link to='/signup'>Register</Link></p></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </div>
    </div>
        </div>
    );
};

export default Login;