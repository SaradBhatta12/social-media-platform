import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "todo-new",
      useNewUrlParser: true,
      socketTimeoutMS: 30000,
    });

    console.log("successfully connected to db ");
  } catch (error) {
    console.log("error to connect db" + error);
  }
};

export default connectDB;
