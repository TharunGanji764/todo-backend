const express = require("express");
const router = express.Router();

const authControlles = require("../controllers/UserController");
router.post("/register", authControlles.register);
router.post("/login", authControlles.login);

module.exports = router;
