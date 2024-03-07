import React from 'react';
import { connect } from 'react-redux';
import { postulateAction, addNotificationAction } from '../redux/actions.js';
import PartidoInfo from './PartidoInfo.jsx';
import LugarInfo from './LugarInfo.jsx';
import PostulacionButton from './PostulacionesBotton.jsx';
import Navbar from './Navbar.jsx';

const VistaPartido = ({ selectedPartido, postulate, addNotification }) => {
  const handleClick = (partido) => {
    postulate(partido);
  };

  const handlePostulate = () => {
    if (selectedPartido) {
      const postulationNotification = `Te has postulado para el partido: ${selectedPartido.eventName}`;
      addNotification(postulationNotification);
    } else {
      console.error('No hay un partido seleccionado para postularte.');
    }
  };

  return (
    <div>
      <Navbar />
      <PartidoInfo onSelect={handleClick} />
      <LugarInfo partido={selectedPartido} />
      <PostulacionButton onPostulate={handlePostulate} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedPartido: state.selectedPartido,
});

const mapDispatchToProps = (dispatch) => ({
  postulate: (partido) => dispatch(postulateAction(partido)),
  addNotification: (notification) => dispatch(addNotificationAction(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VistaPartido);