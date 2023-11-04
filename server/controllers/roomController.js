import { auth } from "../middleware/auth.js";
import Room from "../models/chat.model.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const findRoom = async (req, res) => {
  try {
    const foundRoom = await Room.findOne({ room: req.params.room })
      .populate()
      .exec();
    res.status(200).json(foundRoom);
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error retrieving data" });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const response = await Room.findOneAndDelete({ room: req.params.room });
    if (response) res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error retrieving data" });
  }
};

const createRoomDb = async (data) => {
  try {
    const foundRoom = await Room.findOne({ room: data.room }).populate().exec();
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
  } catch (err) {
    return { status: "error" };
  }
};

const joinRoomDb = async (data) => {
  try {
    const foundRoom = await Room.findOne({ room: data.room }).populate().exec();

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
  } catch (err) {
    return { status: "error" };
  }
};

export { createRoomDb, joinRoomDb, findRoom, deleteRoom };
