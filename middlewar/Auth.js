var jwt = require('jsonwebtoken');
const Auth= (req,res,next)=>  { 
    
    const token= req.headers['krm-token']
    // const   token = req.body.token;
    if(token !=null){
        var data=  jwt.verify(token,process.env.PRIVATE_KEY)
        if(!data){
            res.status(403).json({ 
                "message":"Accsess Denaid",
            });
        }else{
            req._id=data.id;
            next();
        }
    }else{
        res.status(403).json({ 
            "message":"Accsess Denaid",
        });
    }


}
module.exports=Auth;