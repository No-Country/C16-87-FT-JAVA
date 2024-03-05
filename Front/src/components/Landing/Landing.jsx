import React from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Landing = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const loginSuccessfully = queryParams.get("loginSuccessfully");

    if (loginSuccessfully) {
      toast.success("Inicio de sesión exitoso!");
    }
  }, [location.search]);

  return (
    <div className="flex flex-col h-screen">
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
          Crea o entra a un grupo, encontra gente para jugar un picadito! <hr />
          <span className="items-center justify-center">
            Selecciona tu ubicación y unite ya
          </span>
        </h1>

        <div className="flex space-x-4">
          <a
            href="/register"
            className="bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white font-bold py-2 px-10 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
          >
            Registrate
          </a>
          <a
            href="/login"
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-10 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
          >
            Inicia sesión
          </a>
        </div>
      </section>
    </div>
  );
};

export default Landing;
