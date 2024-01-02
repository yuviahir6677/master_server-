require('dotenv').config()
const mongooes = require('mongoose');

const dbconnnect=()=>{

    mongooes.connect(process.env.MONGODB).then(() => {
        console.log("connection success")

    }).catch((err) => {
        console.log(err);
    });
}
module.exports=dbconnnect;