const express = require('express');
const city_route = express();
const bodyParser = require('body-parser');



city_route.use(bodyParser.json());
city_route.use(bodyParser.urlencoded({extended:true}));

const cityController = require('../controller/citycontroller')

city_route.get('/state/:id',cityController.getState)
city_route.post('/post-city',cityController.postcities)
city_route.get('/get-city',cityController.getCities)
city_route.put('/put-city',cityController.putcities)



module.exports=city_route;