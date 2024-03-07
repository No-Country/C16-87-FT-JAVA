import React, { useState, useEffect } from 'react';

const PartidoInfo = ({ onSelect }) => {
  const [partidos, setPartidos] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleClick = (partido) => {
    if (onSelect) {
      onSelect(partido);
    }
  };

  return (
    <div>
      {partidos.map((partido, index) => (
        <div
          key={partido.userId}
          className={`bg-white p-4 rounded shadow-md flex justify-between ${hoveredIndex === index ? 'border-2 border-green-500' : ''}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(partido)}
        >
          <p className="text-black">Nombre del evento: {partido.eventName}</p>
          <p className="text-black">Jugadores faltantes: {partido.playersQuantity}</p>
        </div>
      ))}
    </div>
  );
};

export default PartidoInfo;