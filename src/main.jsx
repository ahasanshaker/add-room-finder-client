import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from './Layouts/MainLayout.jsx';
import Home from './Component/Home.jsx';
import AddRoom from './Component/AddRoom.jsx';
import UpdateRoom from './Component/UpdateRoom.jsx';
import BrowseAll from './Component/BrowseAll.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children:[
      {
        index: true,
        Component:Home
      },
      {
        path: 'addRoom',
        Component: AddRoom

      },
      {
        path: 'updateRoom',
        Component: UpdateRoom
      },
      {
        path: 'browseAll',
        Component: BrowseAll
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />,

  </StrictMode>,
)
