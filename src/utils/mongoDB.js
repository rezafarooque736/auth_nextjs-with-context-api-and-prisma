import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database Connected");
  } catch (err) {
    console.log("Database Connection Failed", err.message);
  }
}

export const disconnectFromMongoDB = mongoose.disconnect()

export default connectToMongoDB