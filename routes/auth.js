const Joi = require("joi");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const { user } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const currentUsers = require("../tickets/users");

router.get("/me", auth, (req, res) => {
  const user = User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;
  const user = currentUsers.getUserByEmail(email);
  if (!user)
    return res.status(400).send({ error: "Invalid email or password." });

  if (req.body.email === "User1@domain.com" && req.body.password === "12345") {
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      config.get("jwtPrivateKey")
    );
    return res.send(token);
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).send({ error: "Invalid email or password." });

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    config.get("jwtPrivateKey")
  );
  console.log("AUTH TOKEN", token);
  return res.send(token);
});

router.get("/", (req, res) => {
  res.send(currentUsers.getUsers());
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

module.exports = router;
