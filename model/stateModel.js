const mongooes = require('mongoose');

const stateModel= mongooes.model('state',
    mongooes.Schema({
        state_name: String,
        country_Id: mongooes.Schema.Types.ObjectId,
    })
);

module.exports=stateModel;