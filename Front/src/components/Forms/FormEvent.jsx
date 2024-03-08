import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PlacesAutocomplete } from "../Map/PlacesAutocomplete";
import es from "date-fns/locale/es";
registerLocale("es", es);
import { createEvent } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Login/Login";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import {
  IoLocationOutline,
  IoTodayOutline,
  IoCashOutline,
  IoPersonOutline,
  IoPersonAddOutline,
} from "react-icons/io5";

const dataEvent = {
  eventId: 1,
  eventName: "Partido Futtbol 5, Picadito 99",
  price: 2000.0,
  startEvent: "2024-03-20T11:47:00",
  eventHours: 1,
  eventDescription: "Partido de 22hs a 23hs el 25 de marzo",
  playersQuantity: 10,
  remainingPlayers: 0,
  location: "rivadavia",
  latitude: null,
  longitude: null,
  available: true,
  user: {
    userId: 2,
    userName: null,
    lastName: null,
    email: "aguslorca.12@gmail.com",
    password:
      "$argon2id$v=19$m=1024,t=1,p=1$7u9arKUgk8cRtLbdXn3o1g$Qha8OY0+wWi+R6VpYXHXrdA1nmt1quSkFX66HkBLUw4",
    age: 0,
    description: null,
    position: null,
    location: null,
    createdOn: "2024-03-06",
    active: true,
  },
};

const formEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  const [selectedDate, setSelectedDate] = useState(null);

  const [eventCreate, setEventCreate] = useState({
    eventName: "",
    price: null,
    startEvent: "",
    eventDescription: "",
    playersQuantity: null,
    remainingPlayers: null,
    location: "",
    latitude: null,
    longitude: null,
    eventHours: null,
    available: true,
    user: {
      userId: "",
    },
  });

  const [locationInfo, setLocationInfo] = useState(null);

  const [createdEvent, setCreatedEvent] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [errors, setErrors] = useState({
    startEvent: "",
    playersQuantity: "",
    location: "",
  });

  const handlePlaceSelect = ({ query, latLng }) => {
    setLocationInfo((prevInfo) => ({ ...prevInfo, query, latLng }));
    console.log("Location Info actualizado:", locationInfo);
  };

  useEffect(() => {
    console.log("Location Info actualizado:", locationInfo);
    if (locationInfo) {
      setEventCreate((prevEventCreate) => ({
        ...prevEventCreate,
        latitude: locationInfo.latLng.lat,
        longitude: locationInfo.latLng.lng,
        location: locationInfo.query,
      }));
    }
  }, [locationInfo]);

  useEffect(() => {
    const idUser = sessionStorage.getItem("userId");
    setEventCreate((prevEventCreate) => ({
      ...prevEventCreate,
      user: {
        ...prevEventCreate.user,
        userId: idUser,
      },
    }));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let error = "";

    switch (name) {
      case "startEvent":
        if (!value) {
          error = "Fecha y hora del evento son requeridos";
        }
        break;
      case "playersQuantity":
        if (!value) {
          error = "Cantidad de jugadores que faltan es requerido";
        }
        break;
      case "location":
        if (!value) {
          error = "Lugar del evento es requerido";
        }
        break;
      default:
        break;
    }

    //   setSelectedDate({
    //     ...createEvent,
    //     [name] : value
    //   })
    // const isoDateString = date.toISOString();
    // console.log(isoDateString);

    // setSelectedDate(isoDateString)

    setErrors({
      ...errors,
      [name]: error,
    });

    setEventCreate({
      ...eventCreate,
      [name]: value,
    });
  };

  const handleCreateEvent = async (event) => {
    event.preventDefault();

    console.log("Contenido de eventCreate antes de la acción:", eventCreate);

    if (!eventCreate.startEvent) {
      setErrors({
        ...errors,
        startEvent: "Fecha y hora del evento son requeridos",
      });
    }
    if (!eventCreate.playersQuantity) {
      setErrors({
        ...errors,
        playersQuantity: "Cantidad de jugadores que faltan son requeridos",
      });
    }
    if (!eventCreate.location) {
      setErrors({ ...errors, location: "Lugar del evento es requerido" });
    }

    // Si no hay errores crea el evento
    if (!errors.startEvent && !errors.playersQuantity && !errors.location) {
      try {
        await dispatch(createEvent(eventCreate));

        // Restablece el formulario y los errores
        setEventCreate({
          eventName: "",
          price: 0,
          startEvent: "",
          eventDescription: "",
          playersQuantity: 0,
          remainingPlayers: 0,
          location: "",
          latitude: 0,
          longitude: 0,
          available: true,
          eventHours: 1,
          user: {
            userId: "",
          },
        });
        setErrors({
          startEvent: "",
          playersQuantity: 0,
          location: "",
        });

        setCreatedEvent(true);

        setTimeout(() => {
          setCreatedEvent(false);
        }, 5000);
      } catch (error) {
        setShowAlert(true);
      }
    } else {
      alert("Por favor, corregir cualquier error para poder crear el evento.");
    }
  };

  const handleDate = (date) => {
    setSelectedDate(date);

    const formattedDate = date.toISOString();

    setEventCreate({
      ...eventCreate,
      startEvent: formattedDate,
    });
  };

  const token = sessionStorage.getItem("jwtToken");
  console.log("Franco:", token);

  useEffect(() => {
    if (!token) {
      navigate("/login?isNotLog=true");

      return () => clearTimeout(timeoutId);
    }
  }, [token, navigate]);

  if (!token) {
    return <div>No estás logueado. Redireccionando a /login...</div>;
  }

  return (
    <>
      <Navbar />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-4 px-4 mx-auto max-w-2xl lg:py-16 bg-gradient-to-b from-green-600 to-green-800">
          <h2 className="flex justify-center mb-4 text-[25px] font-bold text-white">
            CREAR PARTIDO
          </h2>
          <form action="#" onSubmit={handleCreateEvent}>
            <div className="sm:col-span-2">
              <label
                for="eventName"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                NOMBRE
              </label>
              <input
                type="text"
                name="eventName"
                value={eventCreate.eventName}
                onChange={handleChange}
                id="eventName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2"
                placeholder="Nombre"
                required=""
              />
            </div>
            <div className="sm:col-span-2">
              <label
                for="location"
                className="block mb-2 text-sm font-medium text-white"
              >
                DIRECCIÓN
              </label>
              <div className="relative">
                <PlacesAutocomplete
                  onPlaceSelect={handlePlaceSelect}
                  name="location"
                  value={eventCreate.location}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <IoLocationOutline className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label
                    for="startEvent"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    FECHA Y HORA
                  </label>
                  <div className="relative flex w-full">
                    <DatePicker
                      name="startEvent"
                      selected={selectedDate}
                      onChange={handleDate}
                      dateFormat={"dd/MM/yyyy ; HH:mm"}
                      placeholderText="Fecha y hora"
                      showTimeSelect
                      timeIntervals={30}
                      timeFormat="HH:mm"
                      locale="es"
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2"
                    />
                    <div className="absolute inset-y-2 right-0 flex items-center pr-1 pointer-events-none">
                      <IoTodayOutline className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <label
                    for="price"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    PRECIO POR PERSONA
                  </label>
                  <div className="relative flex justify-start w-full">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={eventCreate.price}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2"
                      placeholder="Precio"
                      required=""
                    />
                    <div className="absolute inset-y-0 right-0 bottom-2 flex items-center pr-3 pointer-events-none">
                      <IoCashOutline className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="sm-col-span-2">
                <label
                  for="playersQuantity"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  TOTAL DE JUGADORES
                </label>
                <div className="relative flex justify-start w-full">
                  <input
                    type="number"
                    name="playersQuantity"
                    id="playersQuantity"
                    value={parseInt(eventCreate.playersQuantity)}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-800 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Total de jugadores"
                    required=""
                  />
                  {/* Icono al final del input */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <IoPersonOutline className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="sm-col-span-2">
                <label
                  for="playersQuantity"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  JUGADORES QUE FALTAN
                </label>
                <div className="relative flex justify-start w-full">
                  <input
                    type="number"
                    name="remainingPlayers"
                    id="remainingPlayers"
                    value={eventCreate.remainingPlayers}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-800 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Faltantes"
                    required=""
                  />
                  {/* Icono al final del input */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <IoPersonAddOutline className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="sm-col-span-2 w-full">
              <label
                for="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Precio por persona
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={eventCreate.price}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2"
                placeholder="$2500"
                required=""
              />
            </div> */}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mt-3">
              <div className="sm:col-span-2">
                <label
                  for="eventDescription"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  DESCRIPCIÓN
                </label>
                <textarea
                  id="eventDescription"
                  name="eventDescription"
                  value={eventCreate.eventDescription}
                  onChange={handleChange}
                  rows="2"
                  className="block p-2.5 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Descripcion adicional del evento"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-5 mb-5 cursor-pointer inline-flex items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-4 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
              >
                CREAR PARTIDO
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default formEvent;
