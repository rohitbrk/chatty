import { createToken } from "../middleware/jwt.js";
import { createHash, verifyLogin } from "../middleware/auth.js";
import Room from "../models/chat.model.js";

const getSuggestions = (req, res) => {
  try {
    res.status(200).json({
      status: "ok",
      popularRooms: ["Travel", "Food", "Culture"],
      tips: ["Use png/ jpg", "Strong pass"],
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error retrieving data" });
  }
};

const findRoomMembers = async (req, res) => {
  try {
    const foundRoom = await Room.findOne({ room: req.user.room })
      .populate()
      .exec();
    const members = foundRoom.members.map((member) => member.name);
    res.status(200).json({ status: "ok", members });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error retrieving data" });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { room } = req.user;
    const response = await Room.findOneAndDelete({ room: room });
    if (response) return res.status(200).json({ status: "ok" });
    res.status(400).json({ status: "error" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Error retrieving data" });
  }
};

const createRoomDb = async (data) => {
  try {
    const foundRoom = await Room.findOne({ room: data.room }).populate().exec();
    if (foundRoom)
      return {
        status: "error",
        message: "room already exists",
      };

    const hash = createHash(data.password);

    const room = new Room({
      room: data.room,
      members: [{ name: data.name, password: hash }],
      msgs: [],
    });
    room.save();

    const token = createToken(data.name, data.room);
    if (!token) return { status: "error" };
    return {
      room: room.room,
      msgs: room.msgs,
      token,
      status: "ok",
    };
  } catch (err) {
    return { status: "error" };
  }
};

const joinRoomDb = async (data) => {
  try {
    const foundRoom = await Room.findOne({ room: data.room }).populate().exec();
    if (!foundRoom) return { status: "error", message: "room not found" };

    const isVerified = verifyLogin(foundRoom, data.name, data.password);
    if (!isVerified) return { status: "error", message: "invalid credentials" };

    const token = createToken(data.name, data.room);
    if (!token) return { status: "error" };
    const hash = createHash(data.password);

    const members = foundRoom.members.map((item) => item["name"]);
    if (!members.includes(data.name))
      foundRoom.members.push({ name: data.name, password: hash });

    await foundRoom.save();
    return {
      room: foundRoom.room,
      msgs: foundRoom.msgs,
      token,
      status: "ok",
    };
  } catch (err) {
    return { status: "error" };
  }
};

export {
  getSuggestions,
  createRoomDb,
  joinRoomDb,
  findRoomMembers,
  deleteRoom,
};
