import axios from 'axios';


export const CREATE_EVENT = 'CREATE_EVENT';

export const createEvent = (event) => {
    const endpoint = 'http://64.23.159.97:8080/api/event/create'; 
    return async (dispatch) => {
        try {
            const {data} = await axios.post(endpoint, JSON.stringify(event), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!data) throw Error('No se pudo crear el evento')

            console.log(data);

            return dispatch({
                type: CREATE_EVENT,
                payload: data
            })

        } catch (error) {
            console.log(error.message);
        }
    }
}