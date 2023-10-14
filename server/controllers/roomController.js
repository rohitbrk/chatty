import Room from "../models/chat.model.js";

const createRoomDb = async (data) => {
  const foundRoom = await findRoom(data.room);
  if (foundRoom)
    return {
      status: "room already exists",
    };
  const room = new Room({
    room: data.room,
    members: [{ name: data.name, password: data.password }],
  });
  room.save();
  const newMembers = room.members.map((item) => item["name"]);
  return {
    room: room.room,
    msgs: room.msgs,
    members: newMembers,
  };
};

const joinRoomDb = async (data) => {
  const foundRoom = await findRoom(data.room);
  if (foundRoom) {
    const newMembers = foundRoom.members.map((item) => item["name"]);
    if (newMembers.includes(data.name))
      return {
        room: foundRoom.room,
        msgs: foundRoom.msgs,
        members: newMembers,
      };

    foundRoom.members.push({ name: data.name, password: data.password });
    await foundRoom.save();
    const newRoomMembers = foundRoom.members.map((item) => item["name"]);
    return {
      room: foundRoom.room,
      msgs: foundRoom.msgs,
      members: newRoomMembers,
    };
  }
  return { status: "room not found" };
};

const findRoom = async (room) => {
  const foundRoom = await Room.findOne({ room: room }).populate().exec();
  return foundRoom;
};

const deleteRoom = async (room) => {
  const response = await Room.findOneAndDelete({ room: room });
  return { status: "ok" };
};

export { createRoomDb, joinRoomDb, findRoom, deleteRoom };
