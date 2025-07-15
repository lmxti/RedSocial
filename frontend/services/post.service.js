/* <----------------------- MODULOS --------------------------> */
import axios from "./root.service.js";

export const getPosts = async () => {
  try {
    const response = await axios.get("post/getPosts");
    return response.data;
  } catch (error) {
    console.log("Error en frontend/services/post.service -> getPosts: ", error);
  }
};

export const createPost = async (FormData) => {
  try {

    const response = await axios.post(`post/create`, FormData);

    return {
      success: true,
      data: response.data.data,
      message: "Publicacion creada con exito",
    };

  } catch (error) {
    console.log("Error en frontend/services/post.service -> createPost: ", error);
    return {
      success: false,
      message: error.response?.data?.message,
      status: error.response?.status || 500
    }
  }
};
