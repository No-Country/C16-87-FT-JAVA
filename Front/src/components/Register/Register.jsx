import React, { useState } from "react";
import cc from "./ameri.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
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

  const showPass = (field) => {
    let x = document.getElementById(field);
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
            <img className="w-28 h-44 mt-10" src={cc} alt="" />
            <div className="text-4xl mt-10 font-bold text-green-500 ">
              Crea tu cuenta <br />
              <span className="text-slate-700">y jugate</span> <br />
              <span className="text-slate-700">un picadito</span> <br />
              <span className="text-xl text-slate-500">
                crea o unite a un grupo
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

          <div className="w-5/6 ml-8  transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-green-500">
            <input
              type="email"
              placeholder="Email"
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
                onClick={() => togglePasswordVisibility("password")}
              />
            </label>
            <input
              type="checkbox"
              id="password"
              className="hidden"
              onChange={() => togglePasswordVisibility("password")}
              checked={showPassword}
            />
          </div>

          <div className="w-5/6 ml-8 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-green-500">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirma tu contraseña"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none pr-8"
            />
            <label
              htmlFor="confirmPassword"
              className="absolute right-2 mt-2 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEye : faEyeSlash}
                className="text-gray-500 text-sm mb-2"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              />
            </label>
            <input
              type="checkbox"
              id="confirmPassword"
              className="hidden"
              onChange={() => togglePasswordVisibility("confirmPassword")}
              checked={showConfirmPassword}
            />
          </div>

          <div className="flex flex-col items-center">
            <button className="flex gap-3 cursor-pointer text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-500 px-32 py-2 rounded-full border border-blue-600 hover:scale-105 duration-200 hover:text-white hover:border-blue-800 hover:from-blue-500 hover:to-blue-900">
              Registrarse
            </button>
          </div>

          {/* <a
            href="#"
            className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
          >
            OLVIDATE TU CONTRASEÑA?
          </a> */}

          <p className="text-center text-lg">
            Ya tenes cuenta?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-500 underline-offset-4 hover:underline"
            >
              Incia sesión
            </a>
          </p>
        </section>
      </main>
    </>
  );
};

export default Register;
