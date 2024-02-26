// Perfil.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';

const Perfil = () => {
    
  return (
    <div className="bg-[#5DB075] p-4 flex items-center justify-between">
      <div>
        <img
          src="ruta-de-tu-logo.jpg" // Reemplaza esto con la ruta de tu logo
          alt="Logo de la App"
          className="w-8 h-8 object-cover"
        />
      </div>
      <button className="text-white">Mi Perfil</button>
    </div>
  );
};

export default Perfil;




