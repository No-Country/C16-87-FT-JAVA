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
      <div className="flex flex-col h-screen">
        <section className="bg-gradient-to-tr  from-green-400 to-green-800  flex-1 p-4 flex flex-col justify-center items-center">
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
          <h1 className="text-5xl font-bold text-white mb-2">¿Pinta Fulbo?</h1>
          <h2 className="text-5xl font-bold text-white  mb-2">Futbol YA</h2>
          <h2 className="text-2xl font-bold text-white  mb-2">
            Crea o entra a un grupo, encuentra gente para jugar un picadito.
          </h2>

          {/* <h1 className="text-xl text-white">
            Crea o entra a un grupo, encuentra gente para jugar un picadito.
          </h1> */}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
