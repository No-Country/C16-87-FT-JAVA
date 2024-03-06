import { CREATE_EVENT } from "./actions";


const initialState = {
    events: [],
    eventsCopy: []
};

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case CREATE_EVENT: 
            return {
                ...state,
                events: [...state.events, payload]
            }
        default:
            return{...state}
    }
};

export default reducer;