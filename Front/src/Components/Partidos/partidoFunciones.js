// partidosFunctions.js
export const fetchData = async () => {
  try {
    const response = await fetch("http://64.23.159.97:8080/api/event/findAll");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error al obtener los datos");
      return [];
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return [];
  }
};

export const handleMouseEnter = (index, setHoveredIndex) => {
  setHoveredIndex(index);
};

export const handleMouseLeave = (setHoveredIndex) => {
  setHoveredIndex(null);
};

export const handleClick = (index, onSelect, partidos) => {
  if (onSelect) {
    onSelect(partidos[index]);
  }
};

export const handleToggleExpand = (index, setExpandedIndex, expandedIndex) => {
  setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
};

export const obtenerDiaSemana = (fechaString) => {
  const diasSemana = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];

  const fecha = new Date(fechaString);
  const diaSemana = diasSemana[fecha.getUTCDay()];
  return diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
};

export const obtenerHoraArgentina = (fechaString) => {
  const fecha = new Date(fechaString);
  const opciones = {
    timeZone: "America/Argentina/Buenos_Aires",
    hour: "numeric",
    minute: "numeric",
  };
  return fecha.toLocaleTimeString("es-AR", opciones);
};

export const toRadians = (grados) => {
  return grados * (Math.PI / 180);
};

export const calcularDistancia = (lat1, lon1, lat2, lon2) => {
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

export const distanciaDesdeUsuario = (partido, ipInfo) => {
  if (ipInfo && ipInfo.loc) {
    const userLat = parseFloat(ipInfo.loc.split(",")[0]);
    const userLon = parseFloat(ipInfo.loc.split(",")[1]);

    const distancia = calcularDistancia(
      userLat, // Latitud de la IP
      userLon, // Longitud de la IP
      parseFloat(partido.latitude), // Latitud del partido
      parseFloat(partido.longitude) // Longitud del partido
    );

    return distancia;
  }

  return null;
};

export const distanciaEntreCoordenadas = (lat1, lon1, lat2, lon2) => {
  const toRadians = (grados) => grados * (Math.PI / 180);

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
