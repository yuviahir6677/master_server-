require('dotenv').config()
const express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser')

const dbconnnect=require("./db");
dbconnnect();

var bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())


const dependencyRoute = require('./routes/dependencyRoute');
const stateRoute = require('./routes/stateRoute');
const cityRoute = require('./routes/cityRoute');
const RegisterRoute = require('./routes/RegisterRoute.js');
const LoginRoute = require('./routes/LoginRoute.js')

app.use(dependencyRoute);
app.use(stateRoute);
app.use(cityRoute);
app.use(RegisterRoute);
app.use(LoginRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}`);
})