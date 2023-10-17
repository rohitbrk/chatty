import { useCusNavigate } from "../hooks/useCusNavigate";

type AppProps = {
  socket: null;
  name: string;
  setName: (name: string) => void;
  password: string;
  setPassword: (password: string) => void;
  room: string;
  setRoom: (room: string) => void;
  createRoom: (
    socket: null,
    name: string,
    password: string,
    room: string
  ) => void;
  joinRoom: (
    socket: null,
    name: string,
    password: string,
    room: string
  ) => void;
};

const Room = ({
  socket,
  name,
  setName,
  password,
  setPassword,
  room,
  setRoom,
  createRoom,
  joinRoom,
}: AppProps) => {
  const navigate = useCusNavigate();
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
          onClick={() => {
            createRoom(socket, name, password, room);
            navigate("/chat");
          }}
          className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
        <button
          onClick={() => {
            joinRoom(socket, name, password, room);
            navigate("/chat");
          }}
          className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Room;
