/* <----------------------- MODULOS --------------------------> */
import axios from "./root.service.js";
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
      const { username, role, id } = await jwtDecode(data.data.accessToken);
      //  Usuario localstorage
      const user = { username, role, id };
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.data.accessToken}`;
      // Cookies
      return user;
    }
    console.log("[INFO] Sesion iniciada con exito");
  } catch (error) {
    console.log("[ERROR]: No se pudo iniciar sesion: ", error);
    return false;
  }
};

export const logout = async () => {
  try {
    await axios.post("auth/logout");
  } catch (error) {
    console.error("Error cerrando sesión en backend:", error);
  }
  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem("user");
};
