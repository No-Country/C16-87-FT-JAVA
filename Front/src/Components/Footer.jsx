// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import img from '../assets/photo.jpg';

const Footer = () => {
  return (
    <>
    <footer className="bg-green-500 p-4 flex justify-center items-center">
      <p className="text-white mr-4">C16-87 Lequipe</p>
      <img
        src={img}
        alt="Logo"
        className="h-12 w-12 mx-auto my-4 rounded-full"
      />
      <Link to="/nosotros">
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Conócenos
        </button>
      </Link>
    </footer>
    </>
  );
};

export default Footer;


