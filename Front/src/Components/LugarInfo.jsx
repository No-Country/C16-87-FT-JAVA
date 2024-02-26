// LugarInfo.js
// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoLocationOutline,
  IoCashOutline,
} from "react-icons/io5";

const LugarInfo = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-2">
        {" "}
        {/* Ajusta el espacio entre los botones */}
        <button className="bg-green-500 text-white flex flex-col items-center px-4 py-2 rounded">
          <IoCalendarOutline className="text-2xl mb-1" />{" "}
          {/* Ajusta el tamaño del ícono */}
          Fecha
        </button>
        <button className="bg-green-500 text-white flex flex-col items-center px-4 py-2 rounded">
          <IoTimeOutline className="text-2xl mb-1" />{" "}
          {/* Ajusta el tamaño del ícono */}
          Horario
        </button>
        <button className="bg-green-500 text-white flex flex-col items-center px-4 py-2 rounded">
          <IoLocationOutline className="text-2xl mb-1" />{" "}
          {/* Ajusta el tamaño del ícono */}
          Distancia
        </button>
        <button className="bg-green-500 text-white flex flex-col items-center px-4 py-2 rounded">
          <IoCashOutline className="text-2xl mb-1" />{" "}
          {/* Ajusta el tamaño del ícono */}
          Precio por persona
        </button>
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        <p className="text-black">Dirección: </p>
        <p className="text-black">Complejo: </p>
      </div>
    </div>
  );
};

export default LugarInfo;
