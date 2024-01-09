const mongoose = require('mongoose')

const  SignUpSchema = mongoose.Schema({
    username: {
        type: String,
    },    
    email: {
        type: String,
    },    
    password: {
        type: String,
    },  
});
const SignUpModel = mongoose.model("register", SignUpSchema );
module.exports = SignUpModel;
