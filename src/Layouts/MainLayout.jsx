import React from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from '../Component/Header';
import Slider from '../Component/Slider';

const MainLayout = () => {
  const location = useLocation();

  // check if current path is "/"
  const isHome = location.pathname === "/";

  return (
    <div>
      <Header />
      
      {/* Slider only on Home */}
      {isHome && <Slider />}

      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
