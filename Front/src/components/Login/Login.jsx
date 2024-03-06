import React, { useState, useEffect } from "react";
import { useFormik, Form, Field, ErrorMessage } from "formik";
import wc from "./wc.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoAlertCircleOutline } from "react-icons/io5";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const createdSuccessfully = queryParams.get("createdSuccessfully");
    const ifNotLog = queryParams.get("isNotLog");

    if (createdSuccessfully) {
      toast.success("Usuario creado exitosamente. Inicia sesión.");
    }
    if (ifNotLog) {
      toast.error("Necesitas loguearte para crear partido!");
    }
  }, [location.search]);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    showPass();
  };

  const showPass = () => {
    let x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  // Configuración de Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      // Validación de email
      if (!values.email) {
        errors.email = (
          <div className="flex items-center">
            <IoAlertCircleOutline className="mr-2" />
            <span>Por favor ingresa un correo electrónico</span>
          </div>
        );
      } else if (
        !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
      ) {
        errors.email = (
          <div className="flex items-center">
            <IoAlertCircleOutline className="mr-2" />
            <span>Ingresa un correo válido.</span>
          </div>
        );
      }

      // Validación de contraseña
      if (!values.password) {
        errors.password = (
          <div className="flex items-center">
            <IoAlertCircleOutline className="mr-2" />
            <span>Por favor ingresa una contraseña</span>
          </div>
        );
      }

      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      setLoading(true);

      axios
        .post(
          `http://64.23.159.97:8080/api/auth/login/${values.email}/${values.password}`
        )
        .then((result) => {
          console.log("soy result", result);
          if (result.data.token) {
            // Guardar el token en sessionStorage
            sessionStorage.setItem("jwtToken", result.data.token);

            toast.success("Inicio de sesión exitoso");
            console.log("SE INICIÓ MEN");
            navigate("/home?loginSuccessfully=true");
          }
        })
        .catch((err) => {
          if (err.response.data === "User not found") {
            console.log(err.response.data);
            toast.error("Usuario no encontrado");
          }
        })
        .finally(() => {
          setLoading(false);
          resetForm();
        });
    },
  });

  return (
    <>
      <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-yellow-100 to-green-100 text-black">
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
          <form onSubmit={formik.handleSubmit}>
            <div
              className={`w-5/6 ml-8 transform border-b-2 bg-transparent text-2xl duration-300 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "focus-within:border-green-500"
              }`}
            >
              <input
                type="text"
                placeholder="Email"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-sm text-red-400 font-bold">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div
              className={`w-5/6 ml-8 mt-2 transform border-b-2 bg-transparent text-2xl mb-4 duration-300 ${
                formik.errors.password
                  ? "border-red-500"
                  : "focus-within:border-green-500"
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Contraseña"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none pr-8"
                name="password"
                autoComplete="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
              {formik.touched.password && formik.errors.password && (
                <div className="text-sm text-red-400 font-bold">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div className="justify-center items-center flex">
              <button
                type="submit"
                className="flex gap-3 mt-8 cursor-pointer text-white font-semibold bg-gradient-to-r from-green-600 to-green-500 px-32 py-2 rounded-full border border-green-600 hover:scale-105 duration-200 hover:text-white hover:border-green-800 hover:from-green-500 hover:to-green-900"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

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
