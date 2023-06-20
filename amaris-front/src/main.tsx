import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './pages/Login.tsx'
import ErrorPage from './pages/Error.tsx';
import Register from './pages/Register.tsx';
import User from './pages/User.tsx';
import NoRegistered from './pages/NoRegistered';

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "user/:userId",
    element: <User />,
  },
  {
    path: "noregistered",
    element: <NoRegistered />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
