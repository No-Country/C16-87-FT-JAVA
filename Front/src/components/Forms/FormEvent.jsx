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

const dataEvent = {
  eventId: 1,
  eventName: "Partido Futtbol 5, Picadito",
  price: 2000.0,
  startEvent: "2024-03-25T12:30:00",
  eventHours: 1,
  eventDescription: "Partido de 22hs a 23hs el 25 de marzo",
  playersQuantity: 10,
  location: "Rivadavia",
  available: true,
  user: {
    userId: 1,
    userName: null,
    lastName: null,
    email: "aguslorca.12@gmail.com",
    password:
      "$argon2id$v=19$m=1024,t=1,p=1$bz7jm7FSFhpmTvHEVAxwjA$a2Gc67xxWT+LGnufzHRihhy8i4otigrVuEFaLc8/dS0",
    age: 0,
    description: null,
    position: null,
    location: null,
    createdOn: "2024-03-04",
    active: true,
  },
};

const formEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  const [selectedDate, setSelectedDate] = useState(null);

  const [createEvnt, setCreateEvnt] = useState({
    eventName: "",
    price: "",
    startEvent: "",
    eventDescription: "",
    playersQuantity: "",
    location: {
      lat: "",
      lng: "",
    },
    available: true,
  });

  const [createdEvent, setCreatedEvent] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [errors, setErrors] = useState({
    startEvent: "",
    playersQuantity: "",
    location: "",
  });

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

    setErrors({
      ...errors,
      [name]: error,
    });

    setCreateEvnt({
      ...createEvnt,
      [name]: value,
    });
  };

  const handleCreateEvent = async (event) => {
    event.preventDefault();

    if (!createEvnt.startEvent) {
      setErrors({
        ...errors,
        startEvent: "Fecha y hora del evento son requeridos",
      });
    }
    if (!createEvnt.playersQuantity) {
      setErrors({
        ...errors,
        playersQuantity: "Cantidad de jugadores que faltan son requeridos",
      });
    }
    if (!createEvnt.location) {
      setErrors({ ...errors, location: "Lugar del evento es requerido" });
    }

    // Si no hay errores crea el evento
    if (!errors.startEvent && !errors.playersQuantity && !errors.location) {
      try {
        await dispatch(createEvent(createEvnt));

        // Restablece el formulario y los errores
        setCreateEvnt({
          eventName: "",
          price: "",
          startEvent: "",
          eventDescription: "",
          playersQuantity: "",
          location: "",
          lat: "",
          lng: "",
          available: true,
        });
        setErrors({
          startEvent: "",
          playersQuantity: "",
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
    console.log(date);
  };

  const token = sessionStorage.getItem("jwtToken");

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
      {console.log("soy session", sessionStorage.getItem("jwtToken"))}
      <Navbar />
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16 bg-green-600">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Crear nuevo evento
          </h2>
          <form action="#" onSubmit={handleCreateEvent}>
            <div class="sm:col-span-2">
              <label
                for="eventName"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nombre del evento
              </label>
              <input
                type="text"
                name="eventName"
                value={createEvnt.eventName}
                onChange={handleChange}
                id="eventName"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2"
                placeholder="Nombre evento"
                required=""
              />
            </div>
            <div class="sm:w full w-full z-10">
              <label
                for="startEvent"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Hora y fecha del evento
              </label>
              <DatePicker
                name="startEvent"
                selected={selectedDate}
                onChange={handleDate}
                dateFormat={"dd/MM/yyyy ; HH:mm"}
                showTimeSelect
                timeIntervals={30}
                timeFormat="HH:mm"
                locale="es"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 z-10"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div class="sm-col-span-2">
                <label
                  for="playersQuantity"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Jugadores que faltan
                </label>
                <input
                  type="number"
                  name="playersQuantity"
                  id="playersQuantity"
                  value={createEvnt.playersQuantity}
                  onChange={handleChange}
                  class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-800 block w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="1, 2, 3..."
                  required=""
                />
              </div>
              <div class="sm-col-span-2">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Precio por persona
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={createEvnt.price}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2500"
                  required=""
                />
              </div>
            </div>
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 mt-3">
              <div class="sm:col-span-2">
                <label
                  for="eventDescription"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="eventDescription"
                  name="eventDescription"
                  value={createEvnt.eventDescription}
                  onChange={handleChange}
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Descripcion adicional del evento"
                ></textarea>
              </div>
              <div class="sm:col-span-2">
                <label
                  for="location"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Direccion del evento
                </label>
                <div>
                  <PlacesAutocomplete
                    name="location"
                    value={createEvnt.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Crear Evento
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default formEvent;
