const express = require("express");
const api = express.Router();
const jwt = require("jsonwebtoken");

api.use(express.json());

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(403).json({ message: "Bro we need token" });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "U failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

const validateOptionalJWT = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token !== "null") {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.json({ message: "U failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } else {
    req.userId = null;
    next();
  }
};

const {
  getUserNameById,
  addMoney,
  postSignup,
  postLogin,
  getCurrentUser,
} = require("../controllers/authentication.js");

const { addItem, getItems, buyItem } = require("../controllers/items.js");

// Authentication Endpoints
api.get("/user", validateOptionalJWT, getCurrentUser);
api.patch("/user/addMoney", verifyJWT, addMoney);
api.get("/user/:id", getUserNameById);
api.post("/signup", postSignup);
api.post("/login", postLogin);

// Items Endpoints
api.get("/items", getItems);
api.patch("/item/:id/buy", verifyJWT, buyItem);
api.post("/item", verifyJWT, addItem);

// export the routes
module.exports = api;
