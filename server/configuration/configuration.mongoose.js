require("dotenv").config();
const mongoose = require("mongoose");
URI = process.env.MONGODB_URI;

if (URI === undefined) {
  console.log("Please define the MONGODB_URI in the .env file");
  process.exit(1);
}

mongoose;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();
