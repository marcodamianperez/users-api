import express from "express";
import { readFileSync } from "node:fs";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(cors());
app.set("json spaces", 4);

const users = JSON.parse(
  readFileSync("./public/users.json", { encoding: "utf-8" })
);

// root route redirect
app.get("/", (req, res) => {
  res.redirect("/api/users");
});

// route redirect
app.get("/api", (req, res) => {
  res.redirect("/api/users");
});

// get all users
app.get("/api/users", (req, res) => {
  try {
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// get a single user
app.get("/api/users/:id", (req, res) => {
  try {
    const userId = req.params.id;
    const user = users.find((user) => user.id == userId);
    userId <= 0 || userId > 50 || isNaN(userId)
      ? res.status(404).send({ message: "User not found" })
      : res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// other routes
app.get("*", (req, res) => {
  res.status(404).send({ message: "Resource not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server listening and running on port 3000");
});
