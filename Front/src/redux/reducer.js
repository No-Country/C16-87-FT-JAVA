import { CREATE_EVENT, POSTULATE, ADD_NOTIFICATION } from "./actions";

const initialState = {
  events: [],
  eventsCopy: [],
  selectedPartido: null,
  notifications: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
      };

    case POSTULATE:
      return {
        ...state,
        selectedPartido: payload,
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