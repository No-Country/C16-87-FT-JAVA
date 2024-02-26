// Navbar.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FaRegFutbol, FaUser, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const [mostrarFiltrosMisPartidos, setMostrarFiltrosMisPartidos] = useState(false);

  const toggleFiltrosMisPartidos = () => {
    setMostrarFiltrosMisPartidos(!mostrarFiltrosMisPartidos);
  };

  return (
    <nav className="bg-[#5DB075] p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6 text-white">
          <a href="#" className="flex flex-col items-center" onClick={toggleFiltrosMisPartidos}>
            <FaRegFutbol size={24} className="mb-1" />
            Jugar
          </a>
          <a href="#" className="flex flex-col items-center" onClick={toggleFiltrosMisPartidos}>
            <FaRegFutbol size={24} className="mb-1" />
            Mis Partidos
          </a>
          <a href="#" className="flex flex-col items-center">
            <FaUser size={24} className="mb-1" />
            Mi Red
          </a>
          <a href="#" className="flex flex-col items-center">
            <FaEnvelope size={24} className="mb-1" />
            Mensajes
          </a>
        </div>
      </div>

      {/* Botones de filtrado específicos para Mis Partidos */}
      {mostrarFiltrosMisPartidos && (
        <div className="flex justify-center mt-4 space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Solicitudes</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Nos falta 1</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Finalizados</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

