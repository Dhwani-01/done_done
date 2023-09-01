const { Client } = require("pg");
const dbclient = require("./dbConfig/databasepg");


const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());

app.use("/api/v1/user/", userRouter);
