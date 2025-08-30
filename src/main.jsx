import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './Layouts/MainLayout.jsx';
import Home from './Component/Home.jsx';
import AddRoom from './Component/AddRoom.jsx';
import UpdateRoom from './Component/UpdateRoom.jsx';
import BrowseAll from './Component/BrowseAll.jsx';
import Login from './Component/Login.jsx';
import SignUp from './Component/SignUp.jsx';
import { AuthProvider } from './provider/AuthProvider.jsx';
import MyListing from './Component/MyListing.jsx';
// import { AuthProvider } from './Providers/AuthProvider.jsx'; // <-- import

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: 'addRoom', Component: AddRoom },
      { path: 'updateRoom/:id', Component: UpdateRoom },
      { path: 'browseAll', Component: BrowseAll },
      { path: 'login', Component: Login },
      { path: 'signup', Component: SignUp },
      { path: 'myListing', Component: MyListing },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
