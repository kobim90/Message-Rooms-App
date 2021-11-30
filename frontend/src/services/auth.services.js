import axios from "axios";
import authHeader from "./auth-header";

const URL = "http://localhost:8080/auth/";

const register = async (username, email, password) => {
    console.log("services");
    const response = await axios.post(URL + "signup", {
        username,
        email,
        password
    });
    return response.data;
};

const login = async (username, password) => {
    const response = await axios.post(URL + "signin", {
        username,
        password
    });

    if (response.data.accessToken){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
}

const getRooms = async () => {
    const response = await axios.get(URL + "rooms", {headers: authHeader()});
    return response.data;
};

const AuthServices = {
    register,
    login,
    logout,
    getRooms
}
export default AuthServices;