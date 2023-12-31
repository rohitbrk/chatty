import { msgsDispatch } from "../context/MsgsContext";
import { userInfoDispatch } from "../context/UserInfoContext";
import { dataDispatch } from "../context/DataContext";
import { cookies } from "../App";

const URL = import.meta.env.VITE_BACKEND_URL;

const populateMsgs = (data, setErr) => {
  if (data.status === "ok") {
    msgsDispatch({ type: "SET_MSGS", payload: data.msgs });
    cookies.set("chatty_jwt", data.token);
    return;
  }
  setErr({ error: true, msg: data.message });
};

const createRoom = (socket, userInfo) => {
  const { name, password, room } = userInfo;
  if (!name || !password || !room) {
    window.alert("Please enter details");
    return false;
  }
  if (name.includes(" ")) {
    window.alert("Please don't use spaces in the name");
    return false;
  }
  socket.emit("create-room", { name, password, room });
  return true;
};

const joinRoom = (socket, userInfo) => {
  const { name, password, room } = userInfo;
  if (!name || !password || !room) {
    window.alert("Please enter details");
    return false;
  }
  if (name.includes(" ")) {
    window.alert("Please don't use spaces in the name");
    return false;
  }
  socket.emit("join-room", { name, password, room });
  return true;
};

const sendMsg = (socket, name: string, room: string, data) => {
  if (data.text) {
    socket.emit("send-msg", { name, room, msg: data.text });
    msgsDispatch({ type: "ADD_MSG", payload: { name, msg: data.text } });
    dataDispatch({ type: "TEXT_RESET" });
    return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(data.file);
  reader.onload = () => {
    socket.emit("send-msg", { msg: reader.result, room, name, type: "file" });
    msgsDispatch({ type: "ADD_MSG", payload: { name, msg: reader.result } });
  };
  dataDispatch({ type: "FILE_RESET" });
};

const getMembers = async (room) => {
  try {
    const response = await fetch(URL + `room/${room}`, {
      method: "GET",
      headers: { authorization: `Bearer ${cookies.get("chatty_jwt")}` },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

const handleMsgs = (data) => {
  msgsDispatch({
    type: "ADD_MSG",
    payload: { name: data.name, msg: data.msg },
  });
};

const deleteRoom = async () => {
  try {
    const response = await fetch(URL + "room", {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${cookies.get("chatty_jwt")}`,
      },
    });
    const data = await response.json();

    if (data.status === "ok") {
      msgsDispatch({ type: "RESET" });
      userInfoDispatch({ type: "RESET" });
      cookies.remove("chatty_jwt");
    }
  } catch (err) {
    console.log(err.message);
  }
};

export {
  createRoom,
  joinRoom,
  sendMsg,
  populateMsgs,
  handleMsgs,
  deleteRoom,
  getMembers,
};
