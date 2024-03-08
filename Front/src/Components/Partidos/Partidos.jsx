import React, { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import PostulacionButton from "../PostulacionesBotton";
import NavBar from "../Navbar";
import axios from "axios";

const Partidos = ({ onSelect }) => {
  const [partidos, setPartidos] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://64.23.159.97:8080/api/event/findAll"
        );
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

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleClick = (index) => {
    if (onSelect) {
      onSelect(partidos[index]);
    }
  };

  const handleToggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const diasSemana = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];

  function obtenerDiaSemana(fechaString) {
    const fecha = new Date(fechaString);
    const diaSemana = diasSemana[fecha.getUTCDay()];
    return diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1); // Capitalizar la primera letra
  }

  function obtenerHoraArgentina(fechaString) {
    const fecha = new Date(fechaString);
    const opciones = {
      timeZone: "America/Argentina/Buenos_Aires",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return fecha.toLocaleTimeString("es-AR", opciones);
  }

  const [ipInfo, setIpInfo] = useState(null);

  const toRadians = (grados) => {
    return grados * (Math.PI / 180);
  };

  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const radioTierraKm = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radioTierraKm * c;
  };

  useEffect(() => {
    const getIPInfo = async () => {
      try {
        const response = await axios.get("https://ipinfo.io/json");
        setIpInfo(response.data);
      } catch (error) {
        console.error("Error fetching IP info:", error);
      }
    };

    getIPInfo();
  }, []);

  function obtenerDiaSemana(fechaString) {
    const fecha = new Date(fechaString);
    const diaSemana = diasSemana[fecha.getUTCDay()];
    return diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1); // Capitalizar la primera letra
  }

  function obtenerHoraArgentina(fechaString) {
    const fecha = new Date(fechaString);
    const opciones = {
      timeZone: "America/Argentina/Buenos_Aires",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return fecha.toLocaleTimeString("es-AR", opciones);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://64.23.159.97:8080/api/event/findAll"
        );
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

  const distanciaDesdeUsuario = (partido) => {
    if (ipInfo) {
      const distancia = calcularDistancia(
        parseFloat(ipInfo.loc.split(",")[0]), // Latitud de la IP
        parseFloat(ipInfo.loc.split(",")[1]), // Longitud de la IP
        parseFloat(partido.latitude), // Latitud del partido
        parseFloat(partido.longitude) // Longitud del partido
      );
      return distancia;
    }
    return null;
  };

  const distanciaEntreCoordenadas = (lat1, lon1) => {
    if (ipInfo) {
      return calcularDistancia(
        parseFloat(ipInfo.loc.split(",")[0]), // Latitud de la IP
        parseFloat(ipInfo.loc.split(",")[1]), // Longitud de la IP
        lat1, // Latitud del partido
        lon1 // Longitud del partido
      );
    }
    return null;
  };

  return (
    <div>
      <NavBar />

      <div>
        {partidos.map((partido, index) => (
          <Card
            key={partido.userId}
            className={`bg-white p-4 rounded shadow-md flex flex-col md:flex-row justify-between ${
              hoveredIndex === index ? "border-2 border-green-500" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-row justify-between w-full">
              <div className="md:mr-4">
                <p className="font-bold text-slate-800 mb-2">
                  Nombre del partido:
                </p>
                <p className="text-slate-700 capitalize mb-4">
                  {partido.eventName}
                </p>
              </div>

              <div className="flex justify-end items-end">
                <p className="bg-green-500 text-xl text-white px-5 py-3 shadow-md">
                  Faltan
                  <br />
                  {partido.remainingPlayers}
                </p>
              </div>
            </div>

            <div className="flex flex-row mt-[-17px] font-bold">
              <div className="bg-green-500 justify-center items-center flex text-white p-2 md:p-5 py-5 shadow-md mb-2 md:mb-0">
                🗓 <br />
                {obtenerDiaSemana(partido.startEvent)}{" "}
              </div>
              <div className="bg-green-500 text-white p-2 justify-center items-center flex shadow-md mb-2 md:mr-4">
                🕓
                <br /> {obtenerHoraArgentina(partido.startEvent)}
              </div>

              <div className="bg-green-500 justify-center items-center flex text-white p-2 shadow-md mb-2 md:mr-4">
                💲 {partido.price}
              </div>
              <div className="bg-green-500 justify-center items-center flex text-white p-2 shadow-md mb-2 md:mr-4">
                📍{" "}
                {Math.round(
                  distanciaEntreCoordenadas(
                    partido.latitude,
                    partido.longitude
                  ).toFixed(2)
                )}{" "}
                km
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 md:mt-0">
              <PostulacionButton />
              <button
                onClick={() => handleToggleExpand(index)}
                className="bg-slate-500 text-white py-2 px-4 rounded block"
              >
                {expandedIndex === index ? "Ocultar ⭡" : "Dirección ⭣"}
              </button>
            </div>

            {expandedIndex === index && (
              <div className="mt-4 bg-gray-100 rounded">
                <p className="text-black capitalize">
                  <span className="font-semibold"> Dirección:</span>{" "}
                  {partido.location}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${partido.latitude},${partido.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-sky-600 font-bold underline">
                    Abrir en maps
                  </span>
                </a>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Partidos;
