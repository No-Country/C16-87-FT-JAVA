import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { useEffect, useState, useRef } from "react";

export const Map = ({ selectedLatLng }) => {
  // console.log({ selectedLatLng });
  const [centerMap, setCenterMap] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (selectedLatLng && mapRef.current) {
      const map = mapRef.current;

      // Obtener los límites de los puntos actual y anterior
      const bounds = L.latLngBounds({}, [
        selectedLatLng.lat,
        selectedLatLng.lng,
      ]);

      // Ajustar los límites del mapa para abarcar ambos puntos
      map.fitBounds(bounds);
    }

    if (
      selectedLatLng?.lat !== centerMap?.lat &&
      selectedLatLng?.lng !== centerMap?.lng
    ) {
      setCenterMap({
        lat: selectedLatLng.lat,
        lng: selectedLatLng.lng,
      });
    }

    // Actualizar el centro del mapa
    // setCenterMap(
    //   setCenterMap((prevCenterMap) => ({
    //     lat: selectedLatLng.lat,
    //     lng: selectedLatLng.lng,
    //   }))
    // );
  }, [selectedLatLng, centerMap]);

  return (
    <div className="flex items-center justify-center">
      <MapContainer
        ref={mapRef}
        center={centerMap || [-31.42008329999999, -64.1887761]}
        zoom={5}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {selectedLatLng && (
          <Marker position={selectedLatLng}>
            <Popup>Your Selected Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};
