import Room from "../models/chat.model.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

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
    let result;
    for (const member in room.members) {
      if (name === room.members[member].name)
        result = bcrypt.compareSync(password, room.members[member].password);
    }
    return result;
  }
  return true;
};

const createRoomDb = async (data) => {
  const foundRoom = await findRoom(data.room);
  if (foundRoom)
    return {
      status: "room already exists",
    };

  const hash = bcrypt.hashSync(data.password, SALT_ROUNDS);

  const room = new Room({
    room: data.room,
    members: [{ name: data.name, password: hash }],
  });
  room.save();
  const newMembers = room.members.map((item) => item["name"]);
  return {
    room: room.room,
    msgs: room.msgs,
    members: newMembers,
    status: "ok",
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
      status: "ok",
    };
  const hash = bcrypt.hashSync(data.password, SALT_ROUNDS);

  foundRoom.members.push({ name: data.name, password: hash });
  await foundRoom.save();
  const newRoomMembers = foundRoom.members.map((item) => item["name"]);
  return {
    room: foundRoom.room,
    msgs: foundRoom.msgs,
    members: newRoomMembers,
    status: "ok",
  };
};

export { createRoomDb, joinRoomDb, findRoom, deleteRoom };
