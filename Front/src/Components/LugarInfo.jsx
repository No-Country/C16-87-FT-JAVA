// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoLocationOutline,
  IoCashOutline,
} from "react-icons/io5";

const LugarInfo = () => {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://64.23.159.97:8080/api/event/findAll');
        if (response.ok) {
          const data = await response.json();
          setPartidos(data);
        } else {
          console.error('Error al obtener los datos');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-2">
        <Card icon={<IoCalendarOutline />} text={partidos.length > 0 ? partidos[0].startEvent : ""} />
        <Card icon={<IoTimeOutline />} text={partidos.length > 0 ? partidos[0].eventDescription : ""} />
        <Card icon={<IoLocationOutline />} text={partidos.length > 0 ? partidos[0].location : ""} />
        <Card icon={<IoCashOutline />} text={partidos.length > 0 ? partidos[0].price : ""} />
      </div>
      <div className="bg-white p-4 rounded shadow-md">
        <p className="text-black">Dirección: {partidos.length > 0 ? partidos[0].location : ""}</p>
      </div>
    </div>
  );
};

const Card = ({ icon, text }) => {
  return (
    <div className="bg-green-500 text-white max-w-xs p-4 rounded-lg shadow-md">
      {icon && <span className="text-2xl mb-4">{icon}</span>}
      {text && <p className="text-sm">{text}</p>}
    </div>
  );
};

export default LugarInfo;
