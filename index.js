const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://adhouse28:HaqQuxBWpZqme8vB@cluster0.beq68us.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true },
);
/*let personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});*/
let exerciseSchema = new mongoose.Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: String, required: true },
});

let userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userId: { type: String, required: true },
});

let logSchema = new mongoose.Schema({
  username: { type: String, required: true },
  count: { type: Number, required: true },
  userId: { type: String, required: true },
  log: { type: Array, required: true },
});

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", function (req, res) {
  let username = req.body.username;
  let userId = req.body.userId;
  let newUser = new User({ username: username, userId: userId });
  newUser.save(function (err, data) {
    if (err) return console.error(err);
    res.json({ username: data.username, _id: data.userId });
  });
});

app.post("/api/users/:_id/exercises", function (req, res) {
  let userId = req.params._id;
  let description = req.body.description;
  let duration = req.body.duration;
  let date = req.body.date;
  let newExercise = new Exercise({
    username: userId,
    description: description,
    duration: duration,
    date: date,
  });
});

app.get("/api/users", function (req, res) {
  User.find({}, function (err, data) {
    if (err) return console.error(err);
    res.json(data);
  });
});

app.get("/api/users/:_id/logs", function (req, res) {
  let userId = req.params._id;
  let from = req.query.from;
  let to = req.query.to;
  let limit = req.query.limit;
  let log = [];
  Exercise.find({ userId: userId }, function (err, data) {
    if (err) return console.error(err);
    data.forEach(function (exercise) {
      log.push({
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date,
      });
    });
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

