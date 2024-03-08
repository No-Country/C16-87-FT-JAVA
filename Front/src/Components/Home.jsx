// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const loginSuccessfully = queryParams.get("loginSuccessfully");

    if (loginSuccessfully) {
      toast.success("Inicio de sesión exitoso!");
    }
  }, [location.search]);

  const token = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    if (!token) {
      navigate("/");

      return () => clearTimeout(timeoutId);
    }
  }, [token, navigate]);
  return (
    <div>
      <Navbar />
      <div className="flex  flex-col h-screen">
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
        <section class="bg-gradient-to-tr  from-green-400 to-green-800  flex-1 p-4 flex flex-col justify-center items-center">
          <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-slate-200 md:text-5xl lg:text-6xl dark:text-white">
              ¿Queres jugar un partido? con{" "}
              <span className="underline">Futbol Ya</span> es fácil!
            </h1>
            <p class="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 ">
              App para crear/buscar partidos cercanos, conecta jugadores según
              ubicación. Facilita encuentros deportivos, fomenta la diversión y
              la comunidad.
            </p>
            <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <a
                href="#"
                class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Buscar ahora
                <svg
                  class="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                class="inline-flex justify-center items-center bg-gray-200 py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                <svg
                  class="mr-2 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                </svg>
                ¿Como funciona?
              </a>
            </div>
            <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
              <img
                src="https://media.canalnet.tv/2021/06/El-Kun-Aguero-debut%C3%B3-en-la-Copa-America-y-se-volvi%C3%B3-tendencia-1-625x343.jpg"
                alt=""
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
