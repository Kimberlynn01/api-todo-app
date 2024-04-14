const express = require("express");
const router = express.Router();
const todoRouter = require("./todo");
const userRouter = require("./user");

router.use("/todo", todoRouter);

router.use("/user", userRouter);

module.exports = router;
