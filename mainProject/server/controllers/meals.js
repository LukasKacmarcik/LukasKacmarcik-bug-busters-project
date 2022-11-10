const { PrismaClient } = require('@prisma/client');
const { uploadMeals } = require('../../middleware/uploadMiddleware');
const prisma = new PrismaClient();

// get all meals
const getMeals = async (req, res) => {
  try {
    const meals = await prisma.meals.findMany();
    res.status(200).json(meals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getMealsByRestaurantId = async (req, res) => {
  const restaurantId = req.params.restaurantId;

  try {
    const meals = await prisma.meals.findMany({
      where: {
        restaurant_id: restaurantId,
      },
    });
    res.status(200).json(meals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// add a new meal
const addMeal = async (req, res) => {
  try {
    await uploadMeals(req, res);
  } catch (err) {
    res.status(400).json({ message: err.message });
    return;
  }

  let isValid = true;
  let message = '';

  if (!req.body.meal_name.trim()) {
    message += 'The meal name field is required. ';
    isValid = false;
  }

  if (!req.body.restaurant_id.trim()) {
    message += 'The restaurant id field is required. ';
    isValid = false;
  }

  if (!req.body.price.trim()) {
    message += 'The price field is required. ';
    isValid = false;
  }

  if (isNaN(req.body.price.trim())) {
    message += 'The price must be number. ';
    isValid = false;
  }

  if (!isValid) {
    res.status(400).json({ message });
    return;
  }

  // Validate if user that is adding meal owns the restaurant Can be changed in future when other validation is applied.
  const validateOwner = await prisma.restaurant.findFirst({
    where: {
      id: req.body.restaurant_id,
      owner_id: req.userId,
    },
  });

  if (!validateOwner) {
    res.status(404).json({ message: "User does not own this restaurant and can't add meal to it" });
    return;
  }

  const data = {
    meal_name: req.body.meal_name.trim(),
    restaurant_id: req.body.restaurant_id,
    price: parseInt(req.body.price),
    img_url: Math.floor(Date.now() / 10000) + req.file.originalname.replace(/\s/g, '_'),
  };
  try {
    const meal = await prisma.meals.create({
      data,
    });
    res.status(200).json(meal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// update a meal by id
const updateMeal = async (req, res) => {
  try {
    await uploadMeals(req, res);
  } catch (err) {
    res.status(400).json({ message: err.message });
    return;
  }

  let isValid = true;
  let message = '';

  const validateOwner = await prisma.restaurant.findFirst({
    where: {
      id: req.body.restaurant_id,
      owner_id: req.userId,
    },
  });

  if (!validateOwner) {
    message += "User does not own this restaurant and can't update meal to it. ";
    isValid = false;
  }

  if (!req.body.meal_name.trim()) {
    message += 'The meal name field is required. ';
    isValid = false;
  }

  if (!req.body.restaurant_id.trim()) {
    message += 'The restaurant id field is required. ';
    isValid = false;
  }
  if (!req.body.price.trim()) {
    message += 'The price field is required. ';
    isValid = false;
  }

  if (isNaN(req.body.price.trim())) {
    message += 'The price must be number. ';
    isValid = false;
  }

  if (!isValid) {
    res.status(400).json({ message });
    return;
  }

  try {
    const meal = await prisma.meals.findUnique({
      where: {
        meal_id: parseInt(req.params.id),
      },
    });
    if (meal) {
      const updatedMeal = await prisma.meals.update({
        where: {
          meal_id: parseInt(req.params.id),
        },
        data: {
          meal_name: req.body.meal_name,
          restaurant_id: req.body.restaurant_id,
          price: parseInt(req.body.price),
          img_url: Math.floor(Date.now() / 10000) + req.file.originalname.replace(/\s/g, '_'),
        },
      });
      res.status(200).json(updatedMeal);
    } else {
      res.status(404).json({ message: 'Meal not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// get a meal by id
const getMealById = async (req, res) => {
  try {
    const meal = await prisma.meals.findUnique({
      where: {
        meal_id: parseInt(req.params.id),
      },
    });
    if (meal) {
      res.send(meal);
    } else {
      res.status(404).json({ message: 'Meal not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const deleteMealById = async (req, res) => {
  const validateOwner = await prisma.restaurant.findFirst({
    where: {
      id: req.body.restaurant_id,
      owner_id: req.userId,
    },
  });

  if (!validateOwner) {
    res.status(404).json({ message: "User does not own this restaurant and can't delete meal from it" });
    return;
  }

  try {
    const verifyExistence = await prisma.meals.findUnique({
      where: {
        meal_id: parseInt(req.params.id),
      },
    });
    if (!verifyExistence) {
      res.status(404).json({ message: 'Meal Not Found' });
      return;
    }
    const removedMeal = await prisma.meals.delete({
      where: {
        meal_id: parseInt(req.params.id),
      },
    });
    if (removedMeal) res.status(200).json({ message: 'Meal deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// export the functions
module.exports = {
  getMeals,
  getMealsByRestaurantId,
  addMeal,
  updateMeal,
  getMealById,
  deleteMealById,
};
