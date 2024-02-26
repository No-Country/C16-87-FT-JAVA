import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Landing from "./components/Landing/Landing.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import JugarPartido from "./components/Jugar/JugarPartido.jsx";
import Navbar from "./components/Navbar.jsx";
import VistaPartido from "./components/VistaPartido.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/jugar",
    element: <JugarPartido />,
  },
  {
    path: "/nav",
    element: <Navbar />,
  },
  {
    path: "/vistaPartido",
    element: <Navbar />,
  },
  Navbar,
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
