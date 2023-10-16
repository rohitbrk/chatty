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
        placeholder="Enter Name"
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          Create
        </button>
        <button
          onClick={() => {
            joinRoom(socket, name, password, room);
            navigate("/chat");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Room;
