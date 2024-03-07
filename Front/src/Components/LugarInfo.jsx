
import React from 'react';
import { IoCalendarOutline, IoTimeOutline, IoLocationOutline, IoCashOutline } from 'react-icons/io5';
import {Map} from './Map/Map';
const LugarInfo = ({ partido }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {partido ? (
        <div className="flex space-x-2">
          <Card icon={<IoCalendarOutline />} text={partido.startEvent} />
          <Card icon={<IoTimeOutline />} text={partido.eventDescription} />
          {/* <Card icon={<IoLocationOutline />} text={partido.location} /> */}
          <Card icon={<IoCashOutline />} text={partido.price} />
          <>
          <Map></Map>
          </>
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