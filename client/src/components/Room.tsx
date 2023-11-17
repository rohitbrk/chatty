import { useContext } from "react";
import { useCusNavigate } from "../hooks/useCusNavigate";
import { createRoom, joinRoom } from "../utils/socket.js";
import {
  UserInfoContext,
  UserInfoDispatchContext,
} from "../context/UserInfoContext.tsx";
import InputField from "./common/InputField.tsx";
import Button from "./common/Button.tsx";

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
        <InputField
          key={item.name}
          name={item.name}
          type={item.type}
          placeholder={item.placeholder}
          onChange={onChange}
        />
      ))}
      <div className="flex justify-evenly">
        <Button name="Create" onChange={handleCreateRoom} />
        <Button name="Join" onChange={handleJoinRoom} />
      </div>
    </div>
  );
};

export default Room;
