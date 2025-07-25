// <-------------------------- MODULOS -------------------------->
import { io } from "socket.io-client";

const API_URL = "http://localhost:3001";

export const socket = io(API_URL, {
    transports: ["websocket"]
});

socket.on("connect", () => console.log("✅ Conectado al servidor Socket.IO"));
socket.on("disconnect", () => console.log("❌ Desconectado del servidor"));
socket.on("connect_error", (err) => console.log("[ERROR]-> socket.service: ", err));