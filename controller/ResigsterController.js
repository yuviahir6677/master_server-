const Register = require('../model/sign_up')

var message = "Invalid request";
var status = 0;


const PostResigterData = async (req, res) => {
    const users_table = new Register({
        'username': req.body.username,
        'email': req.body.email,   
        'password': req.body.password,   

    });
    users_table.save().then(() => {
        message = "Data Saved";
        status = 1;
        res.json({
            message: message,
            status: status
        });
    
    }).catch((err) => {
        console.log(err._message);
        message = err._message;
        res.json({
            message: message,
            status: status
        });
    })
}
module.exports = {

   PostResigterData
}
