const express = require('express');
const dependency_route = express();
const bodyParser = require('body-parser');



dependency_route.use(bodyParser.json());
dependency_route.use(bodyParser.urlencoded({extended:true}));

const dependencyController = require('../controller/dependencyController');

dependency_route.post('/post-countries',dependencyController.postCountries)
dependency_route.get('/get-countries',dependencyController.getCountries)
dependency_route.put('/put-countries',dependencyController.putCountries)
dependency_route.post('/get-cities',dependencyController.getCities)


module.exports=dependency_route;