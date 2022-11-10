const { PrismaClient } = require('@prisma/client');
const { uploadRestaurant } = require('../../middleware/uploadMiddleware');
const prisma = new PrismaClient();
const { isValidEmail } = require('../functions');

// get all restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.status(200).json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getOwnerRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        owner_id: req.userId,
      },
    });
    res.status(200).json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// add a new restaurant
const addRestaurant = async (req, res) => {
  /*
  input: POST
    - name - text - not empty + unique
    - address - text - not empty
    - email - email - email validation
    - phoneNumber - text - not empty
    - deliveryFee - number - make sure that it's numeric + it's not negative
    - image - image - req.file is falsy

    - keywords - text, space separated words - no validation (effectively making it optional)
  */

  /*
  output:
    - input validation error -> 400
    - DB error -> 500
    - all else -> 200
  */
  try {
    await uploadRestaurant(req, res);
  } catch (err) {
    res.status(400).json({ message: err.message });
    return;
  }

  let isValid = true;
  let message = '';

  if (!req.body.name.trim()) {
    message += 'The Restaurant name field is required. ';
    isValid = false;
  } else {
    const restaurantExists = await prisma.restaurant.count({
      where: {
        name: req.body.name,
      },
    });
    if (restaurantExists !== 0) {
      message += 'This Restaurant name already exists, please choose a different name. ';
      isValid = false;
    }
  }

  if (!req.body.address.trim()) {
    message += 'The address field is required. ';
    isValid = false;
  }

  if (!req.body.email.trim()) {
    message += 'The email field is required. ';
    isValid = false;
  }

  if (req.body.email.trim() && !isValidEmail(req.body.email.trim())) {
    message += 'The email address is not valid. ';
    isValid = false;
  }

  if (!req.body.phone_number.trim()) {
    message += 'The phone number field is required. ';
    isValid = false;
  }

  if (!req.body.delivery_fee.trim()) {
    message += 'The delivery fee field is required. ';
    isValid = false;
  }

  if (isNaN(req.body.delivery_fee.trim())) {
    message += 'The delivery fee must be number. ';
    isValid = false;
  }

  if (!isValid) {
    res.status(400).json({ message });
    return;
  }

  const data = {
    name: req.body.name.trim(),
    description: req.body.description,
    address: req.body.address,
    email: req.body.email,
    phone_number: req.body.phone_number,
    delivery_fee: parseFloat(req.body.delivery_fee),
    img_url: Math.floor(Date.now() / 10000) + req.file.originalname.replace(/\s/g, '_'),
    owner_id: req.userId,
  };

  try {
    const newRestaurantData = await prisma.restaurant.create({
      data,
    });
    res.status(200).json(newRestaurantData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// update a restaurant by id
const updateRestaurant = async (req, res) => {
  try {
    await uploadRestaurant(req, res);
  } catch (err) {
    res.status(400).json({ message: err.message });
    return;
  }

  let isValid = true;
  let message = '';

  if (!req.body.name.trim()) {
    message += 'The Restaurant name field is required. ';
    isValid = false;
  }

  if (!req.body.address.trim()) {
    message += 'The address field is required. ';
    isValid = false;
  }

  if (!req.body.email.trim()) {
    message += 'The email field is required. ';
    isValid = false;
  }

  if (req.body.email.trim() && !isValidEmail(req.body.email.trim())) {
    message += 'The email address is not valid. ';
    isValid = false;
  }

  if (!req.body.phone_number.trim()) {
    message += 'The phone number field is required. ';
    isValid = false;
  }

  if (!req.body.delivery_fee.trim()) {
    message += 'The delivery fee field is required. ';
    isValid = false;
  }

  if (isNaN(req.body.delivery_fee.trim())) {
    message += 'The delivery fee must be number. ';
    isValid = false;
  }

  if (!isValid) {
    res.status(400).json({ message });
    return;
  }
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (restaurant) {
      // Have to use updateMany bc update does not support multiple where conditions.
      const updatedRestaurantData = await prisma.restaurant.updateMany({
        where: {
          id: req.params.id,
          owner_id: parseInt(req.userId),
        },
        data: {
          name: req.body.name,
          description: req.body.description,
          address: req.body.address,
          email: req.body.email,
          phone_number: req.body.phone_number,
          delivery_fee: parseFloat(req.body.delivery_fee),
          img_url: Math.floor(Date.now() / 10000) + req.file.originalname.replace(/\s/g, '_'),
          owner_id: req.userId,
        },
      });
      res.send(updatedRestaurantData);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// get a restaurant by id
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (restaurant) {
      res.send(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const deleteRestaurantById = async (req, res) => {
  try {
    const existenceOfForeignKeys = await prisma.meals.findFirst({
      where: {
        restaurant_id: req.params.id,
      },
    });
    if (existenceOfForeignKeys) {
      res.status(400).json({ message: 'Restaurant have meals and cannot be removed' });
      return;
    }
    const verifyExistence = await prisma.restaurant.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!verifyExistence) {
      res.status(404).json({ message: 'Restaurant not Found' });
      return;
    }

    // Have to use deleteMany bc delete does not support multiple where conditions.
    const removedRestaurant = await prisma.restaurant.deleteMany({
      where: {
        id: req.params.id,
        owner_id: parseInt(req.userId),
      },
    });
    if (removedRestaurant.count === 1) res.status(200).json({ message: 'Restaurant deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// export the functions
module.exports = {
  getRestaurants,
  getOwnerRestaurants,
  addRestaurant,
  updateRestaurant,
  getRestaurantById,
  deleteRestaurantById,
};
