const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const buyItem = async (req, res) => {
  const itemId = req.params.id;
  const buyerId = req.userId;

  let isValid = true;
  let message = {
    buyItemErrors: "",
  };

  try {
    const item = await prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });
    if (!item) {
      isValid = false;
      message.buyItemErrors += "Item is not found. ";
    } else {
      if (item.buyer_id) {
        isValid = false;
        message.buyItemErrors += "Item can't be bought. ";
      }
    }
    const buyer = await prisma.user.findUnique({
      where: {
        id: buyerId,
      },
    });

    if (buyer.cash < item.price) {
      isValid = false;
      message.buyItemErrors += "Come back when u have enough $$$. ";
    }

    if (buyer.id === item.owner_id) {
      isValid = false;
      message.buyItemErrors +=
        "OMG u can't buy your own item STOP DRINKING SO MUCH. ";
    }

    if (!isValid) {
      res.status(400).json(message);
      return;
    }

    //Paying for item
    await prisma.user.update({
      where: {
        id: buyerId,
      },
      data: {
        cash: (buyer.cash -= item.price),
      },
    });

    //Setting buyers id to item
    await prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        buyer_id: buyerId,
      },
    });

    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const addItem = async (req, res) => {
  let isValid = true;
  let message = {
    addItemNameError: "",
    addItemDescriptionError: "",
    addItemImageUrlError: "",
    addItemPriceError: "",
  };

  if (!req.body.name.trim()) {
    message.addItemNameError += "The item name field is required.\n";
    isValid = false;
  }

  if (!req.body.description.trim()) {
    message.addItemDescriptionError += "The description field is required.\n";
    isValid = false;
  }

  if (!req.body.img_url.trim()) {
    message.addItemImageUrlError += "The image url field is required.\n";
    isValid = false;
  }

  if (
    !/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/.test(
      req.body.img_url.trim()
    )
  ) {
    message.addItemImageUrlError += "The image url is not valid.\n";
    isValid = false;
  }

  if (!req.body.price) {
    message.addItemPriceError += "The price field is required.\n";
    isValid = false;
  }

  if (
    parseInt(req.body.price) < 0 ||
    parseInt(req.body.price).isNaN ||
    !Number.isInteger(parseInt(req.body.price))
  ) {
    message.addItemPriceError += "The number must be positive whole number!\n";
    isValid = false;
  }

  if (!isValid) {
    res.status(400).json(message);
    return;
  }

  const data = {
    owner_id: req.userId,
    name: req.body.name.trim(),
    description: req.body.description.trim(),
    img_url: req.body.img_url.trim(),
    price: parseFloat(req.body.price),
  };

  try {
    const newItemData = await prisma.item.create({
      data,
    });
    console.log(newItemData);
    res.status(200).json(newItemData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// export the functions
module.exports = {
  getItems,
  addItem,
  buyItem,
};
