const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const postOrder = async (req, res) => {
  const data = {
    user_id: req.userId,
    restaurant_id: req.body[0].restaurant_id,
  };

  try {
    const order = await prisma.orders.create({
      data,
    });

    const dataEntryes = [];

    req.body.forEach((entry) => {
      const newEntry = {
        order_id: order.orders_id,
        meal_id: entry.meal_id,
        product_quantity: entry.cartQuantity,
      };

      dataEntryes.push(newEntry);
    });

    const entryes = await prisma.order_entry.createMany({
      data: dataEntryes,
    });
    res.status(200).json(entryes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getRestaurantOrders = async (req, res) => {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        restaurant_id: req.params.restaurantId,
      },
    });

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { postOrder, getRestaurantOrders };
