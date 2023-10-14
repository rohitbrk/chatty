const createRoom = (socket, name, room) => {
  socket.emit("create-room", { name, room });
};

const joinRoom = (socket, name, room) => {
  socket.emit("join-room", { name, room });
};

const sendMsg = (socket, file, name, room, msg, setMsgs, setMsg, setFile) => {
  if (msg) {
    socket.emit("send-msg", { name, room, msg });
    setMsgs((prev) => [...prev, `${name}: ${msg}`]);
    setMsg((prev) => "");
    return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    socket.emit("send-msg", { msg: reader.result, room, name, type: "file" });
    setMsgs((prev) => [...prev, `${name}: ${reader.result}`]);
  };
  setFile((prev) => null);
};

const populateMsgs = (data, setMsgs, setMembers) => {
  if (data.status === "room not found") {
    setMsgs((prev) => ["Room not found."]);
    return;
  }
  if (data.status === "room already exists") {
    setMsgs((prev) => ["Room already exists. Please choose another name."]);
    return;
  }
  setMsgs((prev) => [...data.msgs]);
  setMembers((prev) => [...data.members]);
};

const handleMsgs = (data, setMsgs) => {
  setMsgs((prev) => [...prev, `${data.name}: ${data.msg}`]);
};

const deleteRoom = async (URL, room, setMsgs) => {
  const response = await fetch(URL + `room/${room}`, { method: "DELETE" });
  const data = await response.json();
  if (data.status === "ok") {
    setMsgs([]);
  }
};

export { createRoom, joinRoom, sendMsg, populateMsgs, handleMsgs, deleteRoom };
