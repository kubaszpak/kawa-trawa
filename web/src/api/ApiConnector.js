import axios from "axios";
import Cookies from "js-cookie";

const getAccessToken = () => {
    const accessToken = Cookies.get("accessToken")
    return accessToken;
};

const API = axios.create({
    baseURL: process.env.REACT_APP_BE_ADDRESS,
    timeout: 5000
});

export const authHeader = () => ({
    headers: {
        authorization: `Bearer ${getAccessToken()}`
    }
});


export default API;
