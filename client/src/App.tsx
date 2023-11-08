// @ts-nocheck
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Room from "./components/Room";
import Chat from "./components/Chat";
import Msgs from "./components/Msgs";
import Members from "./components/Members";
import { populateMsgs, handleMsgs } from "./utils/socket.js";
import Profile from "./components/Profile";
import MsgsProvider from "./context/MsgsContext.js";
import { UserInfoContext } from "./context/UserInfoContext.js";

const App = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const { name, password, room } = useContext(UserInfoContext);

  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(URL));
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("found-room", (data) => populateMsgs(data));
    socket.on("receive-msg", (data) => handleMsgs(data));
  }, [socket]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Room socket={socket} />} />
          <Route
            path="chat"
            element={
              <MsgsProvider>
                <Profile />
                <Msgs />
                <Chat
                  socket={socket}
                  msg={msg}
                  setMsg={setMsg}
                  file={file}
                  setFile={setFile}
                />
                <Members />
              </MsgsProvider>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
