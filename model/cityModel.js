const mongooes = require('mongoose');

const cityModel= mongooes.model('city',
    mongooes.Schema({
        name: String,
        city_name: String,  
        state_ID: mongooes.Schema.Types.ObjectId,
        country:mongooes.Schema.Types.ObjectId  

    })
);

module.exports=cityModel;