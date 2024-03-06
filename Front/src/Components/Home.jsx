// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col h-screen">
        <img
          className="w-full h-1/2 object-cover"
          src="https://piquecorto.com.ar/wp-content/uploads/2022/12/Messi-beso-copa-del-mundo-Credito-REUTERS-Hannah-Mckay.png"
          alt=""
        />

        <section className="bg-gradient-to-tr  from-yellow-100 to-green-100 rounded-t-3xl flex-1 p-4 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-slate-800 mb-2">
            ¿Pinta Fulbo?
          </h1>
          <h2 className="text-5xl font-bold text-yellow-600 mb-2">
            <span className="text-green-500">Futbol YA</span>
          </h2>

          <h1 className="text-xl text-black mb-4">
            Crea o entra a un grupo, encuentra gente para jugar un picadito.
          </h1>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

