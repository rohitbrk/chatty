import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Cookies from "universal-cookie";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Room from "./components/Room";
import Chat from "./components/Chat";
import Msgs from "./components/Msgs";
import { populateMsgs, handleMsgs } from "./utils/socket.js";
import MsgsProvider from "./context/MsgsContext.js";
import DataProvider from "./context/DataContext.js";

const cookies = new Cookies();

const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(import.meta.env.VITE_BACKEND_URL));
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
                <Msgs />
                <DataProvider>
                  <Chat socket={socket} />
                </DataProvider>
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
export { cookies };
