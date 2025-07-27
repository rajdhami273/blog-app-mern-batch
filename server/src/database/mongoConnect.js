const mongoose = require("mongoose");
const config = require("../config/config");

mongoose.set("toJSON", {
  transform: (_, response) => {
    delete response.passwordHash;
    delete response.createdAt;
    delete response.updatedAt;
    delete response.__v;
    response.id = response._id;
    delete response._id;
    return response;
  },
});

async function connect() {
  try {
    await mongoose.connect(config.mongoUri); // connect to MongoDB
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error in connecting to MongoDB", error);
  }
}

module.exports = connect;
