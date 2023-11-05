import { createRoomDb, joinRoomDb } from "../controllers/roomController.js";
import { updateMsgs } from "../controllers/msgController.js";

const createRoom = async (socket, data) => {
  socket.join(data.room);
  const foundRoom = await createRoomDb(data);
  socket.emit("found-room", foundRoom);
};

const joinRoom = async (socket, data) => {
  socket.join(data.room);
  const foundRoom = await joinRoomDb(data);
  socket.emit("found-room", foundRoom);
};

const sendMsg = (socket, data) => {
  if (data.type === "file")
    socket.to(data.room).emit("receive-msg", {
      name: data.name,
      msg: data.msg.toString("base64"),
    });
  else
    socket
      .to(data.room)
      .emit("receive-msg", { name: data.name, msg: data.msg });
  updateMsgs(data);
};

export { createRoom, joinRoom, sendMsg };
