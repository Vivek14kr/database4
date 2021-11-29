const express = require('express');

const usersController = require("./controllers/users.controller")
const evaluationController = require("./controllers/evaluation.controller")
const topicController = require("./controllers/topic.controller")
const studentController = require("./controllers/student.controller")



const app = express()
app.use(express.json())

app.use("/user", usersController);
app.use("/topic", topicController);
app.use("/student", studentController)
app.use("/evaluation", evaluationController)

module.exports = app;