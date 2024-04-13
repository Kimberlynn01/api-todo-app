const express = require("express");
const app = express();
const admin = require("firebase-admin");
const route = require("./router");

app.use(express.json());

const serviceAccount = require("./todo-apps-b2edc-firebase-adminsdk-x93ri-44aeb7dc88.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://todo-apps-b2edc-default-rtdb.firebaseio.com/",
});

const Middleware = (req, res, next) => {
  const { auth } = req.query;

  if (auth === "0001") {
    next();
  } else {
    res.status(403).json({ error: "Access Denied" });
  }
};

app.use("/api/v1", Middleware);
app.use("/api/v1", route);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
