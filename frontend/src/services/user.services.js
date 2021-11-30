import axios from "axios";
import authHeader from "./auth-header";

const URL = "http://localhost:8080/user/";

const getUser = async (username) => {
    const response = await axios.get(URL, {
        username,
    });
    return response;
};

const getUsers = async () => {
    const response = await axios.get(URL + "users");
    return response;
};

const deleteUser = async (username) => {
    const response = await axios.delete(URL, {
        username,
    });
    return response;
};

const getRooms = async () => {
    const response = await axios.get(URL + "rooms");
    return response;
};

export {
    getUser,
    getUsers,
    deleteUser,
    getRooms
}
