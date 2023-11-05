// @ts-nocheck
const createRoom = (socket, name: string, password: string, room: string) => {
  if (name.includes(" ")) {
    window.alert("Please don't use spaces in the name");
    return false;
  }
  if (!name || !password || !room) {
    window.alert("Please enter details");
    return false;
  }
  socket.emit("create-room", { name, password, room });
  return true;
};

const joinRoom = (socket, name: string, password: string, room: string) => {
  if (name.includes(" ")) {
    window.alert("Please don't use spaces in the name");
    return false;
  }
  if (!name || !password || !room) {
    window.alert("Please enter details");
    return false;
  }
  socket.emit("join-room", { name, password, room });
  return true;
};

const sendMsg = (
  socket,
  file,
  name: string,
  room: string,
  msg: string,
  setMsgs,
  setMsg,
  setFile
) => {
  if (msg) {
    socket.emit("send-msg", { name, room, msg });
    setMsgs((prev) => [...prev, `${name}: ${msg}`]);
    setMsg("");
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
  if (data.status === "ok") {
    setMsgs(data.msgs);
    setMembers(data.members);
    return;
  }
  setMsgs([data.status]);
};

const handleMsgs = (data, setMsgs) => {
  setMsgs((prev) => [...prev, `${data.name}: ${data.msg}`]);
};

const deleteRoom = async (
  name: string,
  password: string,
  room: string,
  URL: string,
  setMsgs,
  setName,
  setPassword,
  setRoom
) => {
  const response = await fetch(URL + `room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password, room }),
  });
  const data = await response.json();
  if (data.status === "ok") {
    setMsgs([]);
    setName("");
    setPassword("");
    setRoom("");
  }
};

export { createRoom, joinRoom, sendMsg, populateMsgs, handleMsgs, deleteRoom };
