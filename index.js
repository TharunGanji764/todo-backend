const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/authRoutes");

mongoose
  .connect(
    "mongodb+srv://tharun:tharun@tharun.qtg8wns.mongodb.net/?retryWrites=true&w=majority&appName=Tharun"
  )
  .then(() => console.log("DB connected....."))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use("https://todo-backend-ee4y.onrender.com/todo/", todoRoutes);
app.use("https://todo-backend-ee4y.onrender.com/todo/auth", userRoutes);

app.listen(5000, () => {
  console.log("Server running....");
});
