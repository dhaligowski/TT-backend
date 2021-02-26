const express = require("express");
const router = express.Router();

const existingUsers = require("../tickets/users");
const myTickets = require("../tickets/tickets");
const auth = require("../middleware/auth");

router.get("/:id", auth, (req, res) => {
  const userId = parseInt(req.params.id);
  const user = existingUsers.getUserById(userId);
  if (!user) return res.status(404).send();

  

  res.send({
    id: user.id,
    name: user.name,
    email: user.email,
    listings: listings.length
  });
});

module.exports = router;
