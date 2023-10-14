import Room from "../models/chat.model.js";

const createRoomDb = async (data) => {
  const foundRoom = await findRoom(data.room);
  if (foundRoom)
    return {
      status: "room already exists",
    };
  const room = new Room({
    room: data.room,
    members: [data.name],
  });
  room.save();
  return room;
};

const joinRoomDb = async (data) => {
  const foundRoom = await findRoom(data.room);
  if (foundRoom) {
    if (foundRoom.members.includes(data.name)) {
      return foundRoom;
    }
    foundRoom.members.push(data.name);
    await foundRoom.save();
    return foundRoom;
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
