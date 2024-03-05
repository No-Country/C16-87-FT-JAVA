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

    axios
      .post("http://64.23.159.97:8080/api/user/save", {
        ...values,
        location: "asd",
      })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          // Manejar el éxito, redirigir o realizar otras acciones necesarias
          console.log();
        }
      })
      .catch((err) => console.log("Error", console.error(err)))
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
            </div>
          </div>
          <Formik
            initialValues={{
              userName: "",
              email: "",
              password: "",
              // confirmarContrasena: "",
            }}
            validate={(values) => {
              let errores = {};
              //Validación name

              if (!values.userName) {
                errores.userName = "Debes ingresar un name de usuario.";
              } else if (values.userName.length < 5) {
                errores.userName = "El name debe tener al menos 5 caracteres.";
              } else if (values.userName.length > 16) {
                errores.userName = "Máximo 16 caracteres.";
              } else if (!/^[a-zA-Z0-9]+$/.test(values.userName)) {
                errores.userName = "Solo se aceptan letras y números.";
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
                      errors.userName
                        ? "border-red-500"
                        : "focus-within:border-green-500"
                    }`}
                  >
                    <input
                      type="text"
                      name="userName"
                      placeholder="userName de usuario"
                      className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                      value={values.userName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.userName && errors.userName && (
                      <div className="text-sm text-red-400 font-bold">
                        {errors.userName}
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
                      // value={values.confirmarContrasena}
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
