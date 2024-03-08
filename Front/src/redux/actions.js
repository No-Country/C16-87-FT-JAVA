import axios from 'axios';

export const CREATE_EVENT = 'CREATE_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

export const createEvent = (event) => {
  const token = sessionStorage.getItem("jwtToken");
  const endpoint = 'http://64.23.159.97:8080/api/event/create';
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, JSON.stringify(event), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      });

      if (!data) throw Error('No se pudo crear el evento');

      console.log(data);

      dispatch({
        type: CREATE_EVENT,
        payload: data
      });

    } catch (error) {
      console.log('Error:', error.response);
    }
  }
};

export const updateEvent = (eventId, event) => {
    const token = sessionStorage.getItem("jwtToken");
    const endpoint = `http://64.23.159.97:8080/api/event/update/${eventId}`;
  
    return async (dispatch) => {
      try {
        const { data } = await axios.put(endpoint);
  
        if (!data) throw Error('No se pudo actualizar el evento');
  
        console.log(data);
  
        dispatch({
          type: UPDATE_EVENT,
          payload: { eventId, event: data },
        });
  
      } catch (error) {
        console.log('Error:', error.response);
      }
    };
  };

export const addNotificationAction = (notification) => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});