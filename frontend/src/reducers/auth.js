import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../actions/type";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authReducer = (state = initialState, action) => {
    const {type, payload} = action;
    const cases = {
        [REGISTER_SUCCESS]: {...state, isLoggedIn: false},
        [REGISTER_FAIL]: {...state, isLoggedIn: false},
        [LOGIN_SUCCESS]: {...state, isLoggedIn: true, user: payload ? payload.user : undefined},
        [LOGIN_FAIL]: {...state, isLoggedIn: false, user: null},
        [LOGOUT]: {...state, isLoggedIn: false, user: null},
    }

    return cases[type] ? cases[type] : state;
}

export default authReducer;