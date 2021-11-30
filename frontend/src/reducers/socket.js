import { SET_SOCKET } from "../actions/type";

const initialState = {};

const socketReducer = (state = initialState, action) => {
    const {type, payload} = action;
    const cases = {
        [SET_SOCKET]: {...state, socket: payload ? payload.socket : null},
    }

    return cases[type] ? cases[type] : state;
}

export default socketReducer;