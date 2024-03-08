import { CREATE_EVENT, UPDATE_EVENT, ADD_NOTIFICATION } from "./actions";

const initialState = {
  events: [],
  eventsCopy: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
      };

    case UPDATE_EVENT:
        const updatedEvents = state.events.map(event => {
        if (event.id === payload.eventId) {
            return payload.event;
        }
            return event;
        });
    
        return {
            ...state,
            events: updatedEvents,
        };

    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, payload],
      };

    default:
      return { ...state };
  }
};

export default reducer;