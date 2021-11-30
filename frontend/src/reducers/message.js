import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/type";

const initialState = {};

const messageReducer = (state = initialState, action) => {
    const {type, payload} = action;
    
    const cases = {
        [SET_MESSAGE]: {message: payload},
        [CLEAR_MESSAGE]: {message: ""}
    };

    return cases[type] ? cases[type] : state
};

export default messageReducer;