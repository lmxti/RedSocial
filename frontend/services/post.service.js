/* <----------------------- MODULOS --------------------------> */
import { Suspense } from "react";
import axios from "./root.service.js";

export const getPosts = async () => {
  try {
    const response = await axios.get("post/getPosts");
    return response.data?.data?.data;
  } catch (error) {
    console.log("Error en frontend/services/post.service -> getPosts: ", error);
  }
};

export const createPost = async (FormData) => {
  try {
    console.log(FormData);

    const response = await axios.post(`post/create`, FormData);

    return {
      success: true,
      data: response.data.data,
      message: "Publicacion creada con exito.",
    };
  } catch (error) {
    console.log(
      "Error en frontend/services/post.service -> createPost: ",
      error
    );
    return {
      success: false,
      message: error.response?.data?.message,
      status: error.response?.status || 500,
    };
  }
};

export const getUserPosts = async (id) => {
  try {
    const response = await axios.get(`post/getUserPosts/${id}`);

    return {
      success: true,
      data: response.data.data,
      message: "Publicaciones de usuario obtenidas.",
    };
  } catch (error) {
    console.log(
      "Error en frontend/services/post.service -> getUserPosts: ",
      error
    );
    return {
      success: false,
      message: error.response?.data?.message,
      status: error.response?.status || 500,
    };
  }
};

export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`post/deletePost/${id}`);
    return {
      success: true,
      data: response.data.data,
      message: "Publicacion eliminada correctamente.",
    };
  } catch (error) {
    console.log(
      "Error en frontend/services/post.service -> deletePost: ",
      error
    );
    return {
      success: false,
      message: error.response?.data?.message,
      status: error.response?.status || 500,
    };
  }
};

export const likePost = async (postId) => {
  try {
    const response = await axios.post(`post/like/${postId}`);
    return {
      success: true,
      data: response.data.data,
      message: "Interacción de like realizada correctamente.",
    };
  } catch (error) {
    console.log(
      "Error en frontend/services/post.service -> likePost: ",
      error
    );
    return {
      success: false,
      message: error.response?.data?.message,
      status: error.response?.status || 500,
    };
  }
};

