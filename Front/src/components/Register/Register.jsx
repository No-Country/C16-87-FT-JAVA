import React, { useState, useRef, useEffect } from "react";
import cc from "./ameri.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = (values, { resetForm }) => {
    setLoading(true);

    // Realizar la solicitud al backend
    axios
      .post("http://64.23.159.97:8080/api/user/save", values)
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          // Manejar el éxito, redirigir o realizar otras acciones necesarias
          console.log();
        }
      })
      .catch((err) => console.log("Error", err))
      .finally(() => setLoading(false));

    resetForm();
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
      showPass(passwordRef.current);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
      showPass(confirmPasswordRef.current);
    }
  };

  const showPass = (inputRef) => {
    const inputType = inputRef.getAttribute("type");
    if (inputType === "password") {
      inputRef.setAttribute("type", "text");
    } else {
      inputRef.setAttribute("type", "password");
    }
  };

  // Obtener el elemento iframe por su etiqueta y nombre (o por cualquier otra forma que sea relevante en tu caso)
  var iframe = document.querySelector(
    'iframe[src^="https://www.google.com/maps/embed"]'
  );

  // Verificar si se encontró el iframe
  if (iframe) {
    // Obtener la URL del atributo src
    var src = iframe.getAttribute("src");

    // Analizar la URL para extraer la longitud y latitud
    var match = src.match(/!3d(-?\d+\.\d+)!2d(-?\d+\.\d+)/);

    // Verificar si se encontraron coincidencias
    if (match && match.length === 3) {
      var latitud = parseFloat(match[1]);
      var longitud = parseFloat(match[2]);

      // Hacer algo con los datos obtenidos (por ejemplo, imprimir en la consola)
      console.log("Latitud:", latitud);
      console.log("Longitud:", longitud);
    } else {
      console.error(
        "No se pudo extraer la longitud y la latitud de la URL del mapa."
      );
    }
  } else {
    console.error("No se encontró un iframe con la URL de Google Maps.");
  }

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
                crea o unite a un grupo hola
              </span>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.8917075066756!2d-58.277126524876024!3d-34.75832066567841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32fa59fd85a5b%3A0x43f15424dc6ecd44!2sJumbo!5e0!3m2!1ses!2sar!4v1709404927667!5m2!1ses!2sar"
                width="600"
                height="450"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validate={(values) => {
              let errores = {};
              //Validación name

              if (!values.name) {
                errores.name = "Debes ingresar un name de usuario.";
              } else if (values.name.length < 5) {
                errores.name = "El name debe tener al menos 5 caracteres.";
              } else if (values.name.length > 16) {
                errores.name = "Máximo 16 caracteres.";
              } else if (!/^[a-zA-Z0-9]+$/.test(values.name)) {
                errores.name = "Solo se aceptan letras y números.";
              }

              //Validación correo
              if (!values.email) {
                errores.email = "Por favor ingresa un correo electronico.";
              } else if (
                !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                  values.email
                )
              ) {
                errores.email = "Ingresa un correo válido.";
              }
              // Validación contraseña
              if (!values.password) {
                errores.password = "Por favor ingresa una contraseña.";
              } else if (values.password.length < 8) {
                errores.password =
                  "La contraseña debe tener al menos 8 caracteres.";
              } else {
                // Validación de mayúscula
                if (!/[A-Z]/.test(values.password)) {
                  errores.password =
                    "La contraseña debe contener al menos una mayúscula.";
                }

                // Validación de minúscula
                if (!/[a-z]/.test(values.password)) {
                  errores.password =
                    "La contraseña debe contener al menos una minúscula.";
                }

                // Validación de número
                if (!/\d/.test(values.password)) {
                  errores.password =
                    "La contraseña debe contener al menos un número.";
                }

                // Validación de símbolo
                if (!/[\W_]/.test(values.password)) {
                  errores.password =
                    "La contraseña debe contener al menos un símbolo.";
                }
              }

              if (!values.confirmarContrasena) {
                errores.confirmarContrasena =
                  "Por favor confirma tu contraseña.";
              } else if (values.confirmarContrasena !== values.password) {
                errores.confirmarContrasena = "Las contraseñas no coinciden.";
              }

              return errores;
            }}
            onSubmit={onSubmitHandler}
            // onSubmit={(values, { resetForm }) => {
            //   resetForm();
            //   console.log("formulario enviado", values);
            // }}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
            }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <div
                    className={`w-5/6 ml-8 transform border-b-2 bg-transparent text-2xl mb-4 duration-300 ${
                      errors.name
                        ? "border-red-500"
                        : "focus-within:border-green-500"
                    }`}
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="name de usuario"
                      className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name && (
                      <div className="text-sm text-red-400 font-bold">
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div
                    className={`w-5/6 ml-8 transform border-b-2 bg-transparent text-2xl mb-4 duration-300 ${
                      errors.email
                        ? "border-red-500"
                        : "focus-within:border-green-500"
                    }`}
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                      <div className="text-sm text-red-400 font-bold">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div
                    className={`w-5/6 ml-8 transform border-b-2 bg-transparent text-2xl mb-4 duration-300 ${
                      errors.password
                        ? "border-red-500"
                        : "focus-within:border-green-500"
                    }`}
                  >
                    <input
                      type="password"
                      name="password"
                      ref={passwordRef}
                      placeholder="Contraseña"
                      className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none pr-8"
                      autoComplete="new-password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                    {touched.password && errors.password && (
                      <div className="text-sm text-red-400 font-bold">
                        {errors.password}
                      </div>
                    )}
                    <input
                      type="checkbox"
                      className="hidden"
                      onChange={() => togglePasswordVisibility("password")}
                      checked={showPassword}
                    />
                  </div>

                  <div
                    className={`w-5/6 ml-8 transform border-b-2 bg-transparent text-2xl mb-4 duration-300 ${
                      errors.confirmarContrasena
                        ? "border-red-500"
                        : "focus-within:border-green-500"
                    }`}
                  >
                    <input
                      type="password"
                      name="confirmarContrasena"
                      ref={confirmPasswordRef}
                      placeholder="Confirma tu contraseña"
                      className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none pr-8"
                      autoComplete="new-passwordConfirm"
                      value={values.confirmarContrasena}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label
                      htmlFor="confirmPassword"
                      className="absolute right-2 mt-2 cursor-pointer"
                    >
                      <FontAwesomeIcon
                        icon={showConfirmPassword ? faEye : faEyeSlash}
                        className="text-gray-500 text-sm mb-2"
                        onClick={() =>
                          togglePasswordVisibility("confirmPassword")
                        }
                      />
                    </label>
                    {touched.confirmarContrasena &&
                      errors.confirmarContrasena && (
                        <div className="text-sm text-red-400 font-bold">
                          {errors.confirmarContrasena}
                        </div>
                      )}
                    <input
                      type="checkbox"
                      className="hidden"
                      onChange={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                      checked={showConfirmPassword}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    type="submit"
                    className="flex gap-3 cursor-pointer text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-500 px-32 mt-10 py-2 rounded-full border border-blue-600 hover:scale-105 duration-200 hover:text-white hover:border-blue-800 hover:from-blue-500 hover:to-blue-900"
                  >
                    Registrarse
                  </button>
                </div>
              </form>
            )}
          </Formik>

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
