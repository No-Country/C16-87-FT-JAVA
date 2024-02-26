// VistaPartido.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PartidoInfo from './PartidoInfo';
import LugarInfo from './LugarInfo';
import PostulacionButton from './PostulacionesBotton';

const VistaPartido = () => {
  // Datos de ejemplo para pasar a los componentes
  const partidoData = {
    creador: 'Nombre del Creador',
    jugadoresFaltantes: 5,
  };

  const lugarData = {
    fecha: 'Fecha del Partido',
    horario: 'Horario del Partido',
    distancia: 10,
    precio: '$10',
    direccion: 'Dirección de la Cancha',
    complejo: 'Nombre del Complejo',
  };

  return (
    <div>
      <PartidoInfo {...partidoData} />
      <LugarInfo {...lugarData} />
      <PostulacionButton />
    </div>
  );
};

export default VistaPartido;
