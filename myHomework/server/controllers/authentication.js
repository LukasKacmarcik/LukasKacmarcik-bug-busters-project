const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { isLongEnough, areEnglishChars } = require("../functions");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
};

const getUserNameById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const addMoney = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: req.userId,
      },
      data: {
        cash: {
          increment: 100,
        },
      },
    });
    res.status(200).json({ username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getCurrentUser = async (req, res) => {
  if (req.userId === null) {
    return res.status(200).json({ userId: null });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });

    if (user == null) {
      return res.status(400).json({ message: "cannot find user" });
    }

    res
      .status(200)
      .json({ userId: user.id, cash: user.cash, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const postSignup = async (req, res) => {
  let isValid = true;
  const message = {
    signupUsernameError: "",
    signupPasswordError: "",
  };

  if (!req.body.username.trim()) {
    message.signupUsernameError += "The  username field is required. \n";
    isValid = false;
  } else {
    const userExists = await prisma.user.count({
      where: {
        username: req.body.username,
      },
    });
    if (userExists !== 0) {
      message.signupUsernameError +=
        "This username already exists, please choose a different username. \n";
      isValid = false;
    }
  }

  if (!areEnglishChars(req.body.username.trim())) {
    message.signupUsernameError +=
      "Please use english alphabet letters only. \n";
    isValid = false;
  }

  if (!req.body.password.trim()) {
    message.signupPasswordError += "The password field is required. \n";
    isValid = false;
  }

  if (req.body.password && !isLongEnough(req.body.password)) {
    message.signupPasswordError +=
      "The password must be minimum 6 characters long. \n";
    isValid = false;
  }

  if (!isValid) {
    res.status(400).json(message);
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const data = {
      username: req.body.username,
      password: hashedPassword,
    };
    const user = await prisma.user.create({ data });

    const accessToken = createToken(user.id);

    res.status(201).json({ accessToken: accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const postLogin = async (req, res) => {
  let isValid = true;
  const message = {
    loginUsernameError: "",
    loginPasswordError: "",
  };

  if (!req.body.username.trim()) {
    message.loginUsernameError += "The username field is required.\n";
    isValid = false;
  }

  if (!req.body.password.trim()) {
    message.loginPasswordError += "The password field is required.\n";
    isValid = false;
  }

  if (req.body.password && !isLongEnough(req.body.password)) {
    message.loginPasswordError +=
      "The password must be minimum 6 characters long.\n";
    isValid = false;
  }

  const user = await prisma.user.findFirst({
    where: {
      username: req.body.username,
    },
  });

  if (user == null) {
    message.loginUsernameError += "Cannot find user with the given username.\n";
    isValid = false;
  }

  if (!isValid) {
    res.status(400).json(message);
    return;
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = createToken(user.id);
      res.status(201).json({ accessToken: accessToken });
    } else {
      message.loginPasswordError += "Incorrect password.\n";
      res.status(405).json(message);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUserNameById,
  addMoney,
  postSignup,
  postLogin,
  getCurrentUser,
};
