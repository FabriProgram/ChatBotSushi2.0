import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from "react-router";
import Dashboard from './routes/dashboard/Dashboard';
import ChatPedidos from './routes/ChatPedidos/ChatPedidos';  
import Inicio from './routes/incio/Inicio';
import RootLayout from './layouts/rootLayouts/RootLayout';
import { SignIn, SignUp } from '@clerk/clerk-react';

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
        element: <SignIn />
      },
      {
        path: "sign-up/*",
        element: <SignUp />
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
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
