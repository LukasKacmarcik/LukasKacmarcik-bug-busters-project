const express = require('express');
const api = express.Router();
const jwt = require('jsonwebtoken');

api.use(express.json());

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    res.status(403).json({ message: 'Bro we need token' });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'U failed to authenticate' });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

const validateOptionalJWT = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token !== 'null') {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.json({ message: 'U failed to authenticate' });
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
  getRestaurants,
  getOwnerRestaurants,
  addRestaurant,
  updateRestaurant,
  getRestaurantById,
  deleteRestaurantById,
} = require('../controllers/restaurants.js');

const {
  getMeals,
  getMealsByRestaurantId,
  addMeal,
  updateMeal,
  getMealById,
  deleteMealById,
} = require('../controllers/meals.js');

const { getUsers, postSignup, postLogin, getCurrentUser } = require('../controllers/authentication.js');

const { postOrder, getRestaurantOrders } = require('../controllers/orders.js');

// Restaurant Endpoints
api.get('/restaurants', getRestaurants);
api.get('/owner/restaurants', verifyJWT, getOwnerRestaurants);
api.post('/restaurant', verifyJWT, addRestaurant);
api.put('/restaurant/:id', verifyJWT, updateRestaurant);
api.get('/restaurant/:id', getRestaurantById);
api.delete('/restaurant/:id', verifyJWT, deleteRestaurantById);

// Meals Endpoints
api.get('/meals', getMeals);
api.post('/meal', verifyJWT, addMeal);
api.get('/meals/:restaurantId', validateOptionalJWT, getMealsByRestaurantId);
api.put('/meal/:id', verifyJWT, updateMeal);
api.get('/meal/:id', getMealById);
api.delete('/meal/:id', verifyJWT, deleteMealById);

// Authentication Endpoints
api.get('/user', validateOptionalJWT, getCurrentUser);
api.get('/users', getUsers);
api.post('/signup', postSignup);
api.post('/login', postLogin);

// Orders Endpoints
api.post('/order/new', verifyJWT, postOrder);
api.get('/restaurant/:restaurantId/orders', verifyJWT, getRestaurantOrders);

// export the routes
module.exports = api;
