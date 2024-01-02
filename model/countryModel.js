const mongooes = require('mongoose');

const countryModel= mongooes.model('country',
    mongooes.Schema({
        country_name: String,
    })
);


module.exports=countryModel;