// @ts-nocheck
import Cookies from "universal-cookie";

const cookies = new Cookies();

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

const getMembers = async (URL, room, setMembers) => {
  const response = await fetch(URL + `room/${room}`, {
    method: "GET",
    headers: { authorization: `Bearer ${cookies.get("chatty_jwt")}` },
  });
  const data = await response.json();
  if (data.status === "ok") return setMembers(data.members);
  setMembers([data.message]);
};

const populateMsgs = (data, setMsgs) => {
  if (data.status === "ok") {
    setMsgs(data.msgs);
    cookies.set("chatty_jwt", data.token);
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
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${cookies.get("chatty_jwt")}`,
    },
  });
  const data = await response.json();
  if (data.status === "ok") {
    setMsgs([]);
    setName("");
    setPassword("");
    setRoom("");
    cookies.remove("chatty_jwt");
  }
};

export {
  cookies,
  createRoom,
  joinRoom,
  sendMsg,
  populateMsgs,
  handleMsgs,
  deleteRoom,
  getMembers,
};
