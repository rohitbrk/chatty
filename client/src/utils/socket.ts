// @ts-nocheck
import Cookies from "universal-cookie";
import { msgsDispatch } from "../context/MsgsContext";
import { userInfoDispatch } from "../context/UserInfoContext";
import { dataDispatch } from "../context/DataContext";

const cookies = new Cookies();
const URL = import.meta.env.VITE_BACKEND_URL;

const createRoom = (socket, userInfo) => {
  const { name, password, room } = userInfo;
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

const joinRoom = (socket, userInfo) => {
  const { name, password, room } = userInfo;
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

const sendMsg = (socket, name: string, room: string, data) => {
  if (data.type === "text") {
    socket.emit("send-msg", { name, room, msg: data.data });
    msgsDispatch({ type: "ADD_MSG", payload: { name, msg: data.data } });
    dataDispatch({ type: "TEXT_RESET" });
    return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(data.data);
  reader.onload = () => {
    socket.emit("send-msg", { msg: reader.result, room, name, type: "file" });
    msgsDispatch({ type: "ADD_MSG", payload: { name, msg: reader.result } });
  };
  dataDispatch({ type: "FILE_RESET" });
};

const getMembers = async (room, setMembers) => {
  const response = await fetch(URL + `room/${room}`, {
    method: "GET",
    headers: { authorization: `Bearer ${cookies.get("chatty_jwt")}` },
  });
  const data = await response.json();
  if (data.status === "ok") return setMembers(data.members);
  setMembers([data.message]);
};

const populateMsgs = (data) => {
  if (data.status === "ok") {
    msgsDispatch({ type: "SET_MSGS", payload: data.msgs });
    cookies.set("chatty_jwt", data.token);
    return;
  }
  msgsDispatch({ type: "SET_MSGS", payload: [data.status] });
};

const handleMsgs = (data) => {
  msgsDispatch({
    type: "ADD_MSG",
    payload: { name: data.name, msg: data.msg },
  });
};

const deleteRoom = async () => {
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
