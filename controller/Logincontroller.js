const Login = require('../model/sign_up')
var jwt = require('jsonwebtoken');
const Auth = require('../middlewar/Auth');

var message = "Invalid request";
var status = 0;

const GetLogindata = async (req, res) => {
    try {
                
        const { username, password } = req.body;
        let userdata = await Login.findOne({  
            username:username,
            password:password
        });


        if(userdata !=null){
            const token = jwt.sign({ id: userdata._id }, process.env.PRIVATE_KEY,);
            res.cookie("token", token);
            console.log(token);
            res.status(200).json({ 
                "token":token,
                "message":"Login Succesful",
                "status":1
            });
        }else{
            res.status(403).json({ 
                "message":"Invalid Username or Password",
            });
        }
    }catch (e) {
            res.status(500).json({ error: e.message });
        }
    };

    module.exports = {

        GetLogindata
     }
