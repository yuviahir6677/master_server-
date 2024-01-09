const express = require('express');
const dependency_route = express.Router();
const Auth = require('../middlewar/Auth');

// const bodyParser = require('body-parser');



// dependency_route.use(bodyParser.json());
// dependency_route.use(bodyParser.urlencoded({extended:true}));

const dependencyController = require('../controller/dependencyController');

dependency_route.post('/post-countries',Auth,dependencyController.postCountries)
dependency_route.get('/get-countries',Auth,dependencyController.getCountries)
dependency_route.put('/put-countries',Auth, dependencyController.putCountries)


module.exports=dependency_route;