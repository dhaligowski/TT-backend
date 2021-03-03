const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const { validate, user } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const currentUsers = require("../tickets/users");

router.get("/me", auth, (req, res) => {
  const user = currentUsers.getUserById(req.user.id);
  res.send({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { name, email, password } = req.body;
  if (currentUsers.getUserByEmail(email))
    return res
      .status(400)
      .send({ error: "A user with the given email already exists." });
  const user = { id: 0, name, email, password };
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  currentUsers.addUser(user);

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    config.get("jwtPrivateKey")
  );
  //console.log("USERS TOKEN", token);  //Verify JWT token https://jwt.io/

  res.header("x-auth-token", token).send({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

router.get("/", (req, res) => {
  res.send(currentUsers.getUsers());
});

module.exports = router;
