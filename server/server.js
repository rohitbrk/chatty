import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { connectDb } from "./config/db.js";
import { router as room } from "./routes/room.route.js";
import { createRoom, joinRoom, sendMsg } from "./utils/socket.js";

const PORT = 8080;
const app = express();
app.use(cors());
app.use(express.json());
connectDb();

const httpServer = http.createServer(app);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "hey !" });
});

app.use("/room", room);

const io = new Server(httpServer, {
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("create-room", (data) => createRoom(socket, data));
  socket.on("join-room", (data) => joinRoom(socket, data));
  socket.on("send-msg", (data) => sendMsg(socket, data));
});

httpServer.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
