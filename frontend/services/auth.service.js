/* <----------------------- MODULOS --------------------------> */
import axios from './root.service.js';
import cookies from "js-cookie";

/* <----------------------- FUNCIONES --------------------------> */
import { jwtDecode } from "jwt-decode";

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post("auth/login", {
      username,
      password,
    });
  
    const { status, data } = response;

    if (status === 200) {
        const { username, role , id } = await jwtDecode(data.data.accessToken);
        localStorage.setItem('user', JSON.stringify( {username, role, id}));
        axios.defaults.headers.common['Authorization'] = `Bearer ${ data.data.accessToken }`;
        cookies.set('jwt-auth', data.data.accessToken, {path: '/'});
        return true;
    };
    console.log("[INFO] Sesion iniciada con exito");
    
  } catch (error) {
    console.log("[ERROR]: No se pudo iniciar sesion: ", error);
    return false;
  }
};

export const logout = () => {
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    cookies.remove('jwt-auth');
};
