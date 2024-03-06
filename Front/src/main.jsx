import React from "react";
import ReactDOM from "react-dom/client";
// eslint-disable-next-line no-unused-vars
import App from "./App.jsx";
import "./index.css";
// eslint-disable-next-line no-unused-vars
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Landing from "./components/Landing/Landing.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import VistaPartido from "./components/VistaPartido.jsx";
import Nosotros from "./components/Nosotros.jsx";
import Home from "./components/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
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
    path: "/nav",
    element: <Navbar />,
  },
  {
    path: "/vistaPartido",
    element: <VistaPartido />,
  },
  {
    path: "/nosotros",
    element: <Nosotros />,
  },
  Navbar,
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
