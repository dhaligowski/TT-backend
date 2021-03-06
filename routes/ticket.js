const auth = require("../middleware/auth");
const express = require("express");
const Joi = require("joi");
const router = express.Router();
let tickets = require("../tickets/tickets");

router.get("/:id", (req, res) => {
  if (req.params.id === "Reset") {
    while (tickets.length != 1) {
      tickets.pop();
    }
    tickets[0].status = "Open";
    tickets[0].description = "Description Ticket 1";

    return res.send(tickets);
  }

  if (req.params.id === "Open") {
    const ticketStatus = tickets.filter((c) => c.status === req.params.id);
    return res.send(ticketStatus);
  }

  if (req.params.id === "Closed") {
    const ticketStatus = tickets.filter((c) => c.status === req.params.id);
    return res.send(ticketStatus);
  }

  let ticket = tickets.find((c) => c.id === parseInt(req.params.id));

  if (!ticket)
    return res.status(404).send("The ticket with the given ID was not found.");
  ticket = [ticket];

  res.send(ticket);
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

module.exports = router;
