/* <----------------------- MODULOS --------------------------> */
import axios from './root.service.js';


export const getProfile = async (id) => {
  try {
    const response = await axios.get(`user/getUserByID/${id}`);
    return {
      success: true,
      data: response.data.data.data,
      message: "Perfil de usuario obtenido con éxito",
    };
  } catch (error) {
    console.error("Error en user.service -> getProfile:", error);
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || "Error al obtener perfil",
    };
  }
};

export const toggleFollow = async (targetUserId) =>{
  try {
    const response = await axios.post(`/user/toggleFollow/${targetUserId}`)
    return response.data
  } catch (error) {
    console.error("Error en user.service -> toggleFollow:", error);
  }
}
