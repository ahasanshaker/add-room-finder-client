import React from "react";
import { NavLink, useNavigate } from "react-router";
// import { useAuth } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { useAuth } from "../provider/AuthProvider";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleProtectedLink = (e, path) => {
    e.preventDefault();
    if (user) {
      navigate(path);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please login first",
        showConfirmButton: true,
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
    }
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition duration-300 ${
              isActive ? "bg-primary text-white shadow-md" : "hover:bg-primary hover:text-white"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        {/* Protected route */}
        <a
          href="/addRoom"
          onClick={(e) => handleProtectedLink(e, "/addRoom")}
          className="px-4 py-2 rounded-md transition duration-300 hover:bg-primary hover:text-white"
        >
          Add To Find Roommate
        </a>
      </li>
      <li>
        <NavLink
          to="/browseAll"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition duration-300 ${
              isActive ? "bg-primary text-white shadow-md" : "hover:bg-primary hover:text-white"
            }`
          }
        >
          Browse Listing
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myListing"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition duration-300 ${
              isActive ? "bg-primary text-white shadow-md" : "hover:bg-primary hover:text-white"
            }`
          }
        >
          My Listing
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <nav>
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
          {/* Left */}
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                {links}
              </ul>
            </div>
            <NavLink to='/'><a className="btn btn-ghost text-xl font-bold text-primary">Find RoomMate</a></NavLink>
          </div>

          {/* Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-2">{links}</ul>
          </div>

          {/* Right */}
          <div className="navbar-end">
            {user ? (
              <button className="btn btn-error px-5" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <NavLink to="/login">
                <button className="btn btn-primary px-5">Login</button>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
