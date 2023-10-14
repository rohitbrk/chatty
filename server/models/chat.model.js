import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
  room: { type: String, required: true },
  members: [{ name: String, password: String }],
  msgs: [String],
});

export default mongoose.model("Room", roomSchema);
