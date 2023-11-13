import { useContext } from "react";
import { useCusNavigate } from "../hooks/useCusNavigate";
import { createRoom, joinRoom } from "../utils/socket.js";
import {
  UserInfoContext,
  UserInfoDispatchContext,
} from "../context/UserInfoContext.tsx";

const Room = ({ socket }) => {
  const userInfoDispatch = useContext(UserInfoDispatchContext);
  const userInfo = useContext(UserInfoContext);
  const navigate = useCusNavigate();

  const handleCreateRoom = () => {
    const response: boolean = createRoom(socket, userInfo);
    if (!response) return;
    navigate("/chat");
  };

  const handleJoinRoom = () => {
    const response: boolean = joinRoom(socket, userInfo);
    if (!response) return;
    navigate("/chat");
  };

  const onChange = (e) =>
    userInfoDispatch({
      type: "SET_VAL",
      payload: { name: e.target.name, value: e.target.value },
    });

  const form = [
    {
      type: "text",
      name: "name",
      placeholder: "Enter Name (Please don't use spaces)",
      onChange: onChange,
    },
    {
      type: "password",
      name: "password",
      placeholder: "Enter Password",
      onChange: onChange,
    },
    {
      type: "text",
      name: "room",
      placeholder: "Enter Room Name",
      onChange: onChange,
    },
  ];

  return (
    <div className="md:w-full sm:w-screen bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 hover:shadow-lg hover:shadow-black/30">
      {form.map((item) => (
        <div key={item.name}>
          <input
            type={item.type}
            name={item.name}
            placeholder={item.placeholder}
            onChange={item.onChange}
            className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <br />
        </div>
      ))}
      <div className="flex justify-evenly">
        <button
          onClick={handleCreateRoom}
          className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Create
        </button>
        <button
          onClick={handleJoinRoom}
          className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Room;
