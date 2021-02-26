const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = {
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required().min(5).max(255),
  password: Joi.string().required().min(5).max(1024),
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

exports.validate = validateUser;
