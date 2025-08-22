// <------------------------- SERVICIOS ------------------------->
import axios from "./root.service";
import { socket } from "./socket.service";

export const fetchChats = async () => {
  try {
    const response = await axios.get("conversation/conversations");
    
    return response.data.data;
  } catch (error) {
    console.log("Error ocurrido en chat.service-> fetchChats: ", error);
  }
};

export const fethChatMessages = async (id) => {
  try {
    const response = await axios.get(`conversation/messages/${id}`);
    
    return response.data.data;
  } catch (error) {
    console.log("Error ocurrido en chat.service-> fethChatMessages: ", error);
  }
};

export const getOrCreateConversation = async (receiverId) => {
  try {
    const response = await axios.post("conversation/create", {receiverId});
    return response.data.data;
  } catch (error) {
    console.log("Error ocurrido en chat.service-> getOrCreateConversation: ", error);
  }
}


