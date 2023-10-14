import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Room from "./components/Room";
import Chat from "./components/Chat";
import Msgs from "./components/Msgs";
import Members from "./components/Members";
import {
  createRoom,
  joinRoom,
  sendMsg,
  populateMsgs,
  handleMsgs,
  deleteRoom,
} from "./utils/socket.js";

const App = () => {
  const URL = "http://localhost:8000/";

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [room, setRoom] = useState("");
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [members, setMembers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(URL));
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("found-room", (data) => populateMsgs(data, setMsgs, setMembers));
    socket.on("receive-msg", (data) => handleMsgs(data, setMsgs));
  }, [socket]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Room
                socket={socket}
                name={name}
                setName={setName}
                password={password}
                setPassword={setPassword}
                room={room}
                setRoom={setRoom}
                createRoom={() => {
                  createRoom(socket, name, password, room);
                }}
                joinRoom={() => {
                  joinRoom(socket, name, password, room);
                }}
              />
            }
          />
          <Route
            path="chat"
            element={
              <>
                <Chat
                  name={name}
                  msg={msg}
                  setMsg={setMsg}
                  setFile={setFile}
                  sendMsg={() =>
                    sendMsg(
                      socket,
                      file,
                      name,
                      room,
                      msg,
                      setMsgs,
                      setMsg,
                      setFile
                    )
                  }
                  URL={URL}
                  room={room}
                  setMsgs={setMsgs}
                  deleteRoom={() => deleteRoom(URL, room, setMsgs)}
                />
                <Members members={members} />
                <Msgs name={name} msgs={msgs} />
              </>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
