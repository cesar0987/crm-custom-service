const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  User.create({ username, email, password })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(err));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
        res.json({ token });
      });
    })
    .catch((err) => res.status(400).json(err));
};
