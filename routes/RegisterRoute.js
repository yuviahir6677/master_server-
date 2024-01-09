const express = require('express');
const RegisterRoute = express.Router();

const ResigsterController = require("../controller/ResigsterController")

RegisterRoute.post('/registration',ResigsterController.PostResigterData)




module.exports = RegisterRoute;
