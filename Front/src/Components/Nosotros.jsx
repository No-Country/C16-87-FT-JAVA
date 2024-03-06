// eslint-disable-next-line no-unused-vars
import React from "react";
import datosJson from "../Datos.json";
import Navbar from "../components/Navbar";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const Perfil = () => {
  const { nombre, apellido, formacion, rol, github, linkedin, image } = datosJson;

  return (
    <>
      <Navbar></Navbar>
      <div className="perfil-container bg-white p-6 rounded-lg shadow-md">
        <img
          src={image}
          alt={`${nombre} ${apellido}`}
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{`${nombre} ${apellido}`}</h1>
        <p className="text-gray-600 mb-2">Formación: {formacion}</p>
        <p className="text-gray-600 mb-4">Rol: {rol}</p>
        <div className="iconos flex justify-center">
          <a href={github} target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-4xl text-gray-800 mx-2 hover:text-gray-600" />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="text-4xl text-gray-800 mx-2 hover:text-gray-600" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Perfil;
