import React, { useState, useEffect } from 'react';
import { IoCalendarOutline, IoTimeOutline, IoLocationOutline, IoCashOutline } from 'react-icons/io5';
import { Map } from './Map/Map';

const LugarInfo = ({ partido }) => {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://64.23.159.97:8080/api/event/coordinates/-33.18/-67.4/10000");
        if (response.ok) {
          const data = await response.json();
          setPartidos(data);
        } else {
          console.error("Error al obtener los datos");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      {partido ? (
        <div className="flex space-x-2">
          <Card icon={<IoCalendarOutline />} text={partido.startEvent} />
          <Card icon={<IoTimeOutline />} text={partido.eventDescription} />
          {/* <Card icon={<IoLocationOutline />} text={partido.location} /> */}
          <Card icon={<IoCashOutline />} text={partido.price} />
          <Map></Map>
        </div>
      ) : (
        <p>Selecciona un partido para ver la información.</p>
      )}
      {partido && (
        <div className="bg-white p-4 rounded shadow-md">
          <p className="text-black">Dirección: {partido.location}</p>
        </div>
      )}
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
