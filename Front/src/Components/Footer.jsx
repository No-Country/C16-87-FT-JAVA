// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/photo.jpg";

const Footer = () => {
  return (
    <>
      <footer className="bg-green-500 p-4  border-t-cyan-200 flex justify-center items-center">
        <p className="mt-5 mb-6 cursor-pointer inline-flex items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-12 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100">
          C16-87
        </p>
        <img
          src={img}
          alt="Logo"
          className="h-12 w-12 mx-auto my-4 rounded-full"
        />
        <Link to="/nosotros">
          <button className="mt-5 mb-6 cursor-pointer inline-flex items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-8 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100">
            Conócenos
          </button>
        </Link>
      </footer>
    </>
  );
};

export default Footer;
