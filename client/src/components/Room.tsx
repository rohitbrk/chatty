import { useCusNavigate } from "../hooks/useCusNavigate";

const Room = ({
  socket,
  name,
  setName,
  room,
  setRoom,
  createRoom,
  joinRoom,
}) => {
  const navigate = useCusNavigate();
  return (
    <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-lg hover:shadow-black/30">
      <input
        type="text"
        value={name}
        placeholder="Enter name"
        onChange={(e) => setName((prev) => e.target.value)}
        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <br />
      <input
        type="text"
        placeholder="Enter Room name"
        value={room}
        onChange={(e) => setRoom((prev) => e.target.value)}
        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <br />
      <div className="flex justify-evenly">
        <button
          onClick={() => {
            createRoom(socket, name, room);
            navigate("/chat");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
        >
          Create
        </button>
        <button
          onClick={() => {
            joinRoom(socket, name, room);
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
