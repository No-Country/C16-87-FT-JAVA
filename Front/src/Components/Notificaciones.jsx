// Notificaciones.jsx
import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';

const Notificaciones = ({ notifications }) => {
  return (
    <>   
    <Navbar></Navbar>
    <div>
      <h2>Notificaciones</h2>
      {notifications && notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-md">
            <p className="text-black">{notification}</p>
          </div>
        ))
      ) : (
        <p>No hay notificaciones disponibles.</p>
      )}
    </div>
    </>
 
  );
};

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps)(Notificaciones);



