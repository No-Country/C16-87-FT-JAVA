import React, { useState, useEffect } from "react";
import { Card, Modal, Select } from "flowbite-react";
import PostulacionButton from "../PostulacionesBotton";
import NavBar from "../Navbar";
import axios from "axios";
import {
  fetchData,
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
  handleToggleExpand,
  obtenerDiaSemana,
  obtenerHoraArgentina,
  distanciaDesdeUsuario,
  distanciaEntreCoordenadas,
} from "./partidoFunciones.js";

const Partidos = ({ onSelect }) => {
  const [partidos, setPartidos] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [partide, selectedPartide] = useState("");
  const [ipInfo, setIpInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState(10); // Valor predeterminado

  useEffect(() => {
    fetchData().then((data) => setPartidos(data));
  }, []);

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

  const handlePostulate = () => {
    if (selectedPartide) {
      const postulationNotification = `Te has postulado para el partido: ${selectedPartide.eventName}`;
      addNotification(postulationNotification);
    } else {
      console.error("No hay un partido seleccionado para postularte.");
    }
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

  useEffect(() => {
    // Obtener valores únicos de remainingPlayers
    const remainingPlayersValues = Array.from(
      new Set(partidos.map((partido) => partido.remainingPlayers))
    );

    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://64.23.159.97:8080/api/event/findAll"
        );
        if (response.ok) {
          const data = await response.json();

          const partidosOrdenados = data.sort((a, b) => {
            const distanciaA = distanciaDesdeUsuario(a);
            const distanciaB = distanciaDesdeUsuario(b);
            return distanciaA - distanciaB;
          });
          setPartidos(partidosOrdenados);
        } else {
          console.error("Error al obtener los datos");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchData();
  }, [ipInfo, partidos, partidos.map((partido) => partido.remainingPlayers)]);
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

  const handleFilterModal = () => {
    setShowModal(true);
  };

  const handleDistanceChange = (value) => {
    setSelectedDistance(value);
  };

  const handleFilterClose = () => {
    setShowModal(false);
    // Aquí puedes aplicar la lógica para filtrar los partidos con la nueva distancia seleccionada
  };

  const postularUser = async (eId) => {
    try {
      const IdUser = sessionStorage.getItem("userId");
      const token = sessionStorage.getItem("jwtToken");

      const response = await axios.post(
        `http://64.23.159.97:8080/api/event/${eId}/join/${IdUser}`,null,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
      } else {
        console.error("Error sin respuesta del servidor:", error.message);
      }
    }
  };
  const handlePostularme = async (eID) => {
    postularUser(eID);
  };

  return (
    <div>
      <NavBar />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Seleccionar distancia</h2>
          <Select
            label="Distancia (en km)"
            value={selectedDistance}
            onChange={(e) => handleDistanceChange(e.target.value)}
          >
            {/* Aquí puedes agregar opciones para la distancia */}
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
            <option value={15}>15 km</option>
            {/* ... otras opciones */}
          </Select>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
            onClick={handleFilterClose}
          >
            Aplicar Filtro
          </button>
        </div>
      </Modal>
      <div className="flex bg-green-600  justify-between">
        <h2 className="text-white font-medium justify-center flex items-center">
          Filtrado por ubicación:
        </h2>

        <button
          className="inline-flex m-2 cursor-pointer bg-green-600 items-center gap-1 rounded border border-white  text-white font-medium text-md"
          onClick={handleFilterModal}
        >
          <span className="m-1">Cambiar</span>
        </button>
      </div>
      <div>
        {partidos.map((partido, index) => (
          <Card
            key={partido.userId || index}
            className={`bg-white p-4 rounded shadow-xl flex flex-col md:flex-row justify-between ${
              hoveredIndex === index ? "border-5 border-green-800" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(index, setHoveredIndex)}
            onMouseLeave={() => handleMouseLeave(setHoveredIndex)}
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
                  distanciaEntreCoordenadas(partido.latitude, partido.longitude)
                )}
                km
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 md:mt-0">
              <button
                onClick={() => {
                  const eId = partido.eventId;
                  console.log("eID", eId);
                  handlePostularme(eId); // Pasar directamente eId en lugar de { eId }
                }}
                className="bg-green-500 text-white py-2 px-4 rounded  block"
              >
                Postularme
              </button>
              <button
                onClick={() =>
                  handleToggleExpand(index, setExpandedIndex, expandedIndex)
                }
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
