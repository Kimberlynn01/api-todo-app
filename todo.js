const express = require("express");
const app = express();
const admin = require("firebase-admin");

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const todoRef = admin.database().ref("todo");

    const snapshot = await todoRef.once("value");
    const todoList = snapshot.val();

    const todoArray = Object.keys(todoList || {}).map((keys) => ({
      id: keys,
      ...todoList[keys],
    }));

    res.status(200).json(todoArray);
  } catch (error) {
    res.status(500).json({ error: "terjadi kesalahan saat ingin memuat data" });
  }
});
