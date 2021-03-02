const auth = require("../middleware/auth");
const express = require("express");
const Joi = require("joi");
const router = express.Router();
const tickets = require("../tickets/tickets");

router.put("/", auth, (req, res) => {
  const ticket = tickets.find((c) => c.id === parseInt(req.body.id));
  if (!ticket)
    return res.status(404).send("The ticket with the given ID was not found.");

  const { error } = validateTicket(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  tickets[ticket.id - 1].status = "Closed";
  res.send(tickets[req.body.id - 1]);
});

function validateTicket(ticket) {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().min(1).required(),
    value: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    status: Joi.string().min(1).required(),
  });
  return schema.validate(ticket);
}

function validateDescription(description) {
  const schema = Joi.object({
    description: Joi.string().min(1).required(),
  });
  return schema.validate(description);
}

const ShowCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  return month + "-" + date + "-" + year + "\n";
};

module.exports = router;
