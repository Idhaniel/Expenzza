const express = require("express");
const connectDB = require("./connect");
const User = require("./models/User");
const mockUsers = require("./Users.json");
require("dotenv").config();
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI, "Expenzza");
    console.log("connected");
    await User.create(mockUsers);
    console.log("spammed");
    process.exit(0);
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
    process.exit(1);
  }
};
start();
