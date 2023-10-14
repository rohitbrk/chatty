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
    const result = false;
    for (const member in room.members) {
      bcrypt.compare(
        password,
        room.members[member].password,
        (err, response) => {
          if (response) {
            result = true;
          }
        }
      );
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
  const result = bcrypt.hash(data.password, SALT_ROUNDS, (err, hash) => {
    if (err) console.log(err);
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
  });
  console.log(result);
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

  foundRoom.members.push({ name: data.name, password: data.password });
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
