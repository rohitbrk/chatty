import Room from "../models/chat.model.js";

const findRoom = async (room) => {
  const foundRoom = await Room.findOne({ room: room }).populate().exec();
  return foundRoom;
};

const deleteRoom = async (room) => {
  const response = await Room.findOneAndDelete({ room: room });
  if (response) return { status: "ok" };
};

const auth = (room, name, password) => {
  const newMembers = room.members.map((item) => item["name"]);

  if (newMembers.includes(name)) {
    for (const member in room.members) {
      if (
        room.members[member].name === name &&
        room.members[member].password === password
      )
        return true;
    }
    return false;
  }

  return true;
};

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

  if (!foundRoom) return { status: "room not found" };

  const ans = auth(foundRoom, data.name, data.password);
  if (!ans) return { status: "invalid credentials" };

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
};

export { createRoomDb, joinRoomDb, findRoom, deleteRoom };
