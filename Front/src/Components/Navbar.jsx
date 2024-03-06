// Navbar.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaRegFutbol, FaUser, FaEnvelope, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mostrarCrearPartido, setMostrarCrearPartido] = useState(false);
  const [mostrarUnirmeAPartido, setMostrarUnirmeAPartido] = useState(false);

  const toggleCrearPartido = () => {
    setMostrarCrearPartido(!mostrarCrearPartido);
    setMostrarUnirmeAPartido(false);
  };

  const toggleUnirmeAPartido = () => {
    setMostrarUnirmeAPartido(!mostrarUnirmeAPartido);
    setMostrarCrearPartido(false);
  };

  return (
<nav className="bg-green-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6 ml-7 text-white">
          <Link to="/home" className="flex flex-col items-center group">
            <div className="flex items-center mb-1">
              <FaHome size={24} />
            </div>
            <span className="text-xs group-hover:text-white">Inicio</span>
          </Link>
          <Link
            to="#"
            className="flex flex-col items-center group"
            onClick={toggleUnirmeAPartido}
          >
            <div className="flex items-center mb-1">
              <FaRegFutbol size={24} />
            </div>
            <span className="text-xs group-hover:text-white">Jugar</span>
          </Link>
          <Link
            to="#"
            className="flex flex-col items-center group"
            onClick={toggleCrearPartido}
          >
            <div className="flex items-center mb-1">
              <FaRegFutbol size={24} />
            </div>
            <span className="text-xs group-hover:text-white">Mis Partidos</span>
          </Link>
          <Link to="/mi-red" className="flex flex-col items-center group">
            <div className="flex items-center mb-1">
              <FaUser size={24} />
            </div>
            <span className="text-xs group-hover:text-white">Mi Red</span>
          </Link>
          <Link to="/mensajes" className="flex flex-col items-center group">
            <div className="flex items-center mb-1">
              <FaEnvelope size={24} />
            </div>
            <span className="text-xs group-hover:text-white">Mensajes</span>
          </Link>
        </div>
      </div>
      {/* Contenedor para el botón "Crear Nuevo Partido" */}
      {mostrarCrearPartido && (
        <div className="flex justify-center">
          {/* Link a la ruta correspondiente */}
          <Link to="/crear-nuevo-partido">
            <button
              className="bg-blue-500 text-white px-2 py-2 rounded mt-2"
              onClick={toggleCrearPartido}
            >
              Crear Nuevo Partido
            </button>
          </Link>
        </div>
      )}
      {/* Contenedor para el botón "Unirme a partido" */}
      {mostrarUnirmeAPartido && (
        <div className="flex justify-center">
          {/* Link a la ruta correspondiente */}
          <Link to="/VistaPartido">
            <button
              className="bg-blue-500 text-white px-2 py-2 rounded mt-2"
              onClick={toggleUnirmeAPartido}
            >
              Unirme A Partido
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

