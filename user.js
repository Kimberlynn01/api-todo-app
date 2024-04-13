const express = require("express");
const app = express();
const admin = require("firebase-admin");

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const userRef = admin.database().ref("users");
    const snapshot = await userRef.once("value");
    const userList = snapshot.val();

    const usersArray = Object.keys(userList || {}).map((key) => ({
      userId: key,
      ...userList[key],
    }));

    res.status(200).json(usersArray);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat memuat data users" });
  }
});

module.exports = app;
