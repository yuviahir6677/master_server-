const express = require('express');
const state_route = express.Router();
// const bodyParser = require('body-parser');



// state_route.use(bodyParser.json());
// state_route.use(bodyParser.urlencoded({extended:true}));

const stateController = require('../controller/stateController')

state_route.get('/get',stateController.getCountries)
state_route.post('/post-state',stateController.postStates)
state_route.get('/get-state',stateController.getStates)
state_route.put('/put-state',stateController.putstate)



module.exports=state_route;
