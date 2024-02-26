import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { AiFillInfoCircle } from "react-icons/ai";

const JugarPartido = () => {
  const precioCancha = 10000;
  const horarioPartido = "18:00 hs";
  const distanciaCancha = "5km";
  const jugadoresFaltantes = 2;
  const fechaPartido = "31 de diciembre";
  const plataPorPersona = precioCancha / 5 - jugadoresFaltantes;

  return (
    <div className="max-w-md mx-auto mt-5 bg-white rounded-lg overflow-hidden shadow-md">
      {/* Parte superior en blanco */}
      <div className="bg-green-500 p-1 text-white rounded-md flex">
        <p className="font-semibold">Detalles del partido</p>
        <p className="ml-auto text-2xl">
          <AiFillInfoCircle />
        </p>
      </div>
      <div className="bg-gray-100 flex p-4">
        {/* Parte izquierda */}
        <div className="flex-grow">
          <p className="text-xl font-semibold text-gray-800">
            Marcos
            <span className="text-gray-500 flex">"El imperio fútbol"</span>
          </p>
        </div>

        {/* Línea divisoria */}
        <div className="border-r border-gray-300 h-full mx-4"></div>

        {/* Parte derecha con fondo verde */}
        <div className="bg-green-600 p-6 text-white text-lg">
          <p className="font-semibold">
            Le faltan <br />
            {jugadoresFaltantes}
          </p>
        </div>
      </div>

      {/* Contenido del card */}
      <div className="p-1">
        {/* Cuatro cuadrados verdes con texto */}

        <div className="grid grid-cols-4 gap-1 mb-4">
          <div
            id="distanciaCancha"
            className="bg-green-500 p-4   text-white rounded-md"
          >
            <p className="font-semibold">
              <span>
                <svg
                  width="60px"
                  height="50px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
                <span className="">{distanciaCancha}</span>
              </span>
            </p>
          </div>
          <div
            id="horarioPartido"
            className="bg-green-500 p-4   text-white rounded-md"
          >
            <p className="font-semibold">
              <span>
                <svg
                  width="60px"
                  height="50px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M12 7V12L13.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
                <span className="">{horarioPartido}</span>
              </span>
            </p>
          </div>

          <div
            id="fechaPartido"
            className="bg-green-500 p-4   text-white rounded-md"
          >
            <p className="font-semibold">
              <span>
                <svg
                  width="60px"
                  height="50px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
                <span className="">{fechaPartido}</span>
              </span>
            </p>
          </div>
          <div
            id="plataPorPersona"
            className="bg-green-500 p-4   text-white rounded-md"
          >
            <p className="font-semibold">
              <span>
                <svg
                  fill="#ffffff"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                  xml:space="preserve"
                  width="60"
                  height="50px"
                  stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <g>
                        <path d="M251.574,0c-37.454,0-67.925,30.471-67.925,67.926c-0.001,37.454,30.47,67.925,67.925,67.925 c37.454,0,67.926-30.471,67.926-67.925C319.5,30.471,289.028,0,251.574,0z M251.574,105.434 c-20.682,0-37.508-16.826-37.508-37.508c-0.001-20.683,16.825-37.509,37.508-37.509c20.682,0,37.509,16.826,37.509,37.509 C289.082,88.608,272.256,105.434,251.574,105.434z"></path>{" "}
                      </g>
                    </g>
                    <g>
                      <g>
                        <rect
                          x="190.525"
                          y="204.932"
                          width="122.106"
                          height="30.417"
                        ></rect>
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M304.62,153.082H198.529c-2.383,0-4.774,0.056-7.168,0.166c-11.603-23.7-35.991-39.386-63.066-39.386h-15.209v64.928 c-24.427,16.201-43.836,39.075-55.821,65.747H13.751v126.705h43.494c9.037,20.098,22.384,38.212,39.019,52.855 c16.391,14.427,35.715,25.243,56.453,31.674V512h86.192v-49.304h25.329V512h86.192v-56.214 c29.054-9.021,55.177-26.645,74.494-50.468c19.047-23.49,30.761-52.231,33.74-82.22h39.585V292.68H458.68 C451.014,214.431,384.85,153.082,304.62,153.082z M401.298,386.159c-17.623,21.734-42.268,37.044-69.396,43.113l-11.889,2.659 v49.651h-25.357v-49.304h-86.164v49.304h-25.357v-49.668l-11.889-2.659c-20.247-4.53-39.226-14.209-54.884-27.991 c-15.552-13.689-27.528-31.143-34.63-50.476l-3.659-9.966H44.169v-65.87h33.92l3.661-9.962 c9.959-27.094,29.21-50.045,54.207-64.627l7.544-4.401v-48.647c11.055,4.599,19.786,14.077,23.114,26.093l3.501,12.64 l13.018-1.605c5.099-0.629,10.279-0.948,15.394-0.948h106.09c68.588,0,124.391,55.801,124.391,124.39 C429.01,336.737,419.426,363.802,401.298,386.159z"></path>{" "}
                      </g>
                    </g>
                    <g>
                      <g>
                        <circle cx="129.315" cy="260.028" r="16.68"></circle>
                      </g>
                    </g>
                  </g>
                </svg>
                <span className="">${plataPorPersona} x Persona</span>
              </span>
            </p>
          </div>
        </div>

        {/* Cuadrado verde al final con texto */}
        <div className="flex bg-indigo-500 items-center justify-center p-3 text-white rounded-md">
          <p className="font-semibold ">Solicitar unirme</p>
        </div>
      </div>
    </div>
  );
};

export default JugarPartido;
