const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/TodoController");
const authenticate = require("../middleware/authenticate");

router.post("/todos", authenticate, TodoController.addTodo);
router.get("/todos", authenticate, TodoController.getTodo);
router.put("/todos/:id", authenticate, TodoController.updateTodo);
router.delete("/todos/:id", authenticate, TodoController.deleteTodo);

module.exports = router;
