// PartidoInfo.js
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

const PartidoInfo = () => {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    // Función para hacer la solicitud GET
    const fetchData = async () => {
      try {
        const response = await fetch('http://64.23.159.97:8080/api/event/findAll');
        if (response.ok) {
          const data = await response.json();
          setPartidos(data); // Actualizar el estado con los datos recibidos
        } else {
          console.error('Error al obtener los datos');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchData(); // Llamar a la función al montar el componente
  }, []); // El segundo parámetro vacío indica que esta función se ejecutará solo una vez al montar el componente

  return (
    <div>
      {partidos.map((partido) => (
        <div key={partido.userId} className="bg-white p-4 rounded shadow-md flex justify-between">
          <p className="text-black">Nombre del evento: {partido.eventName}</p>
          <p className="text-black">Jugadores faltantes: {partido.playersQuantity}</p>
        </div>
      ))}
    </div>
  );
};

export default PartidoInfo;