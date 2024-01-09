const express = require('express');
const LoginRoute = express.Router();

const Logincontroller = require('../controller/Logincontroller');

LoginRoute.post('/loginuser',Logincontroller.GetLogindata)


module.exports = LoginRoute;