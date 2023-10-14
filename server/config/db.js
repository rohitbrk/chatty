import mongoose from "mongoose";

const MONGO_URI =
  "mongodb+srv://cluster1:cluster1@cluster0.47nh2.mongodb.net/?retryWrites=true&w=majority";

const connectDb = async () => {
  await mongoose.connect(MONGO_URI);
};

export { connectDb };
