const jwtToken = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const exist = await User.findOne({ username });
    if (exist) {
      return res.status(400).json({ error: "User already exist" });
    }
    let hashedPassword = await bcrypt.hash(password, 10);

    let newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let exist = await User.findOne({ username });

    if (!exist) {
      return res.status(400).json({ error: "Invalid User" });
    }
    const isPasswordValid = await bcrypt.compare(password, exist.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Password" });
    }
    const payload = {
      username,
    };
    let jwt = jwtToken.sign(payload, "jwt");
    return res.json({ token: jwt });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
};
