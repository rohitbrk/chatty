// @ts-nocheck
import { useCusNavigate } from "../hooks/useCusNavigate";
import { createRoom, joinRoom } from "../utils/socket.js";

type AppProps = {
  socket: null;
  name: string;
  setName: (name: string) => void;
  password: string;
  setPassword: (password: string) => void;
  room: string;
  setRoom: (room: string) => void;
};

const Room = ({
  socket,
  name,
  setName,
  password,
  setPassword,
  room,
  setRoom,
}: AppProps) => {
  const navigate = useCusNavigate();

  const handleCreateRoom = () => {
    const response: boolean = createRoom(socket, name, password, room);
    console.log(response);
    if (!response) return;
    navigate("/chat");
  };

  const handleJoinRoom = () => {
    const response: boolean = joinRoom(socket, name, password, room);
    console.log(response);
    if (!response) return;
    navigate("/chat");
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-lg hover:shadow-black/30">
      <input
        type="text"
        value={name}
        placeholder="Enter Name (Please don't use spaces)"
        onChange={(e) => setName(e.target.value)}
        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <br />
      <input
        type="password"
        value={password}
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <br />
      <input
        type="text"
        placeholder="Enter Room name"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <br />
      <div className="flex justify-evenly">
        <button
          onClick={handleCreateRoom}
          className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
        <button
          onClick={handleJoinRoom}
          className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Room;
