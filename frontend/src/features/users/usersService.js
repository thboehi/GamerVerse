import axios from "axios";

const API_URL = '/api/users' //Route vers notre API (backend) (server.js)


const getAllUsers = async (userData) => {
    const response = await axios.get(API_URL, userData)
    return response.data
}

const getUserById = async (id, userData) => {
    const response = await axios.get(API_URL + "/" + id, userData)
    return response.data
}

const userService = {
    getAllUsers,
    getUserById
}

export default userService