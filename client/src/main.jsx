import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from "react-router";
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import Dashboard from './routes/dashboard/Dashboard';
import ChatPedidos from './routes/ChatPedidos/ChatPedidos';  
import Inicio from './routes/incio/Inicio';
import RootLayout from './layouts/rootLayouts/RootLayout';
import Logueo from './routes/Logueo/SignIn';
import Registrarse from './routes/Registrarse/SignUp';

//Ruteo de paginas
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Inicio />,
      },
      {
        path: "sign-in/*",
        element: <Logueo />,
      },
      {
        path: "sign-up/*",
        element: <Registrarse />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/chats/:id",
            element: <ChatPedidos />,
          },
        ],
      },
    ],  
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
