// Homework -> Understand about REST APIs
const express = require("express");
const cors = require("cors");

// config
const config = require("./config/config");

// routes
const routes = require("./api/v1/routes");

// database
const connect = require("./database/mongoConnect");

// express app
const app = express();

// connect to MongoDB
connect();

// cors
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// health check
app.get("/", (_, res) => {
  console.log("Hello world!");
  res.send("Hello world!");
});

// api routes -> /api/v1
app.use("/api/v1", routes);

// start the server
app.listen(config.port, (error) => {
  if (error) {
    console.log("Error in starting the server", error);
    return;
  }
  console.log("Server started successfully");
});
