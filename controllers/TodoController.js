const User = require("../models/User");
const TodoSchema = require("../models/todo-model");

const addTodo = async (req, res) => {
  try {
    const { name, edit, priority } = req.body;
    const { username } = req;
    const user = await User.findOne({ username });
    if (user) {
      const newTodo = new TodoSchema({
        userId: user._id,
        name,
        edit,
        priority,
      });
      const savedTodo = await newTodo.save();
      return res.status(200).json(savedTodo);
    } else {
      return res.status(400).json({ error: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTodo = async (req, res) => {
  try {
    const { username } = req;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const todos = await TodoSchema.find({ userId: user._id });
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, priority } = req.body;
    const getTodo = await TodoSchema.findById({ _id: id });
    if (!getTodo) {
      return res.status(404).json({ error: "Todo item not found" });
    }

    getTodo.name = name;
    getTodo.priority = priority;
    await getTodo.save();
    return res.status(200).json(getTodo);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await TodoSchema.findByIdAndDelete({ _id: id });
    if (deleteTodo) {
      return res.status(200).json({ message: "Todo deleted successfully" });
    } else {
      return res.status(404).json({ error: "Todo item not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
