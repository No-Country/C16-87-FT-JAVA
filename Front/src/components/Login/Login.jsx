import React, { useState } from "react";
import wc from "./wc.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
      showPass("password");
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
      showPass("confirmPassword");
    }
  };

  const showPass = () => {
    let x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <>
      <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-yellow-100 to-green-100 text-black">
        <section className="flex w-[30rem] flex-col space-y-10">
          <div className="flex">
            <img className="w-32 h-40" src={wc} alt="" />
            <div className="text-4xl font-bold text-green-500 ">
              Inicia sesión <br />
              <span className="text-slate-700">y encuentra</span> <br />
              <span className="text-slate-700">un partido</span> <br />
              <span className="text-xl text-slate-500">
                crea o unite a un grupo ya!
              </span>
            </div>
          </div>
          <div className="w-5/6 ml-8 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-green-500">
            <input
              type="text"
              placeholder="Nombre de usuario"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <div className="w-5/6 ml-8 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-green-500">
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none pr-8"
            />
            <label
              htmlFor="password"
              className="absolute right-2 mt-2 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="text-gray-500 text-sm mb-2"
                onClick={togglePasswordVisibility}
              />
            </label>
            <input
              type="checkbox"
              id="password" // Mismo id que el input de contraseña
              className="hidden"
              onChange={togglePasswordVisibility}
              onClick={showPass}
              checked={showPassword}
            />
          </div>

          <div className="justify-center items-center flex">
            <button className="flex gap-3 mt-1 cursor-pointer text-white font-semibold bg-gradient-to-r from-green-600 to-green-500 px-32 py-2 rounded-full border border-green-600 hover:scale-105 duration-200 hover:text-white hover:border-green-800 hover:from-green-500 hover:to-green-900">
              Inciar sesión
            </button>
          </div>

          <a
            href="#"
            className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
          >
            OLVIDASTE TU CONTRASEÑA?
          </a>

          <p className="text-center text-lg">
            No tenes cuenta?{" "}
            <a
              href="/register"
              className="font-medium text-indigo-500 underline-offset-4 hover:underline"
            >
              Crea una ahora
            </a>
          </p>
        </section>
      </main>
    </>
  );
};

export default Login;
