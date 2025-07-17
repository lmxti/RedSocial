/* <----------------------- MODULOS --------------------------> */
import axios from "axios";
import cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/";
// const API_URL = process.env.API_URL;

const instance = axios.create({
    baseURL : API_URL,
    withCredentials: true    
});

instance.interceptors.request.use(
    (config) => {

        if (config.data instanceof FormData) {
            config.headers['Content-type'] = 'multipart/form-data';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default instance;