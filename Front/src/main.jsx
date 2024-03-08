import React from "react";
import ReactDOM from "react-dom/client";
// eslint-disable-next-line no-unused-vars
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
// eslint-disable-next-line no-unused-vars
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Landing from "./components/Landing/Landing.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import VistaPartido from "./components/VistaPartido.jsx";
import Nosotros from "./components/Nosotros.jsx";
import Home from "./components/Home.jsx";
import FormEvent from "./components/Forms/FormEvent.jsx";
import Notificaciones from "./components/Notificaciones.jsx";
import Partidos from "./components/Partidos/Partidos.jsx";

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
  {
    path: "/crear-nuevo-partido",
    element: <FormEvent />,
  },
  {
    path: "/notificaciones",
    element: <Notificaciones />,
  },
  {
    path: "/partidos",
    element: <Partidos />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
