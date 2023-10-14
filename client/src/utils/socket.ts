const createRoom = (socket, name, password, room) => {
  socket.emit("create-room", { name, password, room });
};

const joinRoom = (socket, name, password, room) => {
  socket.emit("join-room", { name, password, room });
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
  if (data.status === "invalid credentials") {
    setMsgs([data.status]);
    return;
  }
  if (data.status === "room not found") {
    setMsgs([data.status]);
    return;
  }
  if (data.status === "room already exists") {
    setMsgs([data.status]);
    return;
  }
  setMsgs(data.msgs);
  setMembers(data.members);
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
