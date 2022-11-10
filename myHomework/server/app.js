const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// import api routes
const api = require("./routers/api");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// serve static files
app.use(express.static("build"));

// use api routes
app.use("/api", api);

module.exports = app;
