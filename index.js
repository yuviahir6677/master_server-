require('dotenv').config()
const express = require('express');
const cors = require('cors');

const dbconnnect=require("./db");
dbconnnect();

const app = express();
app.use(cors());
// app.use(bodyParser.json());
// app.use("/",require("./routes/Country.js"));

const dependencyRoute = require('./routes/dependencyRoute');
const stateRoute = require('./routes/stateRoute');
const cityRoute = require('./routes/cityRoute');

app.use("/",dependencyRoute);
app.use("/",stateRoute);
app.use("/",cityRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}`);
})