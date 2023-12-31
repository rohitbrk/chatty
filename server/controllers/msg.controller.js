import Room from "../models/chat.model.js";

const updateMsgs = async (data) => {
  try {
    const foundRoom = await Room.findOne({ room: data.room }).populate().exec();
    if (!foundRoom) return;
    foundRoom.msgs.push(`${data.name}: ${data.msg}`);
    await foundRoom.save();
    return { status: "ok" };
  } catch (err) {
    return { status: "error" };
  }
};

export { updateMsgs };
