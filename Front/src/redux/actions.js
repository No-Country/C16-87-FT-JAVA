import axios from 'axios';

export const CREATE_EVENT = 'CREATE_EVENT';
export const POSTULATE = 'POSTULATE';
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

export const postulateAction = (partido) => ({
  type: POSTULATE,
  payload: partido,
});

export const addNotificationAction = (notification) => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});