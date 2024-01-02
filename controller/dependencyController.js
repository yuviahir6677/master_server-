const Country =require('../model/countryModel')
const State =require('../model/stateModel')
const City =require('../model/cityModel')


var message = "Invalid request";
var status = 0;

const postCountries = async(req,res) => {
    // try {
    //     const countries = await Country.find({})
    //     res.status(200).send({success:true,msg:'countries data',data:countries});

        
    // } catch (error) {
    //     res.status(400).send({success:false,msg:error.message});
        
    // }
    if (req.body.id != '') {
        let result = await
            Country.updateOne({
                _id: req.body.id
            },
                {
                    $set: {
                        'country_name': req.body.country_name

                     
                    }
                }
            );
             

    if(await result.acknowledged==true){
        res.json({
            message: "Data Updated Success",
            status: 1
        });
    }else{
        res.json({
            message: message,
            status: status
        });
    }


    
    
} else {
    const users_table = new Country ({
        country_name: req.body.country_name
        // short_name: String,
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
}

const getCountries = async(req,res) => {
    let filter = {};
    if (req.query.id != null) {
        filter = {
            '_id': req.query.id
        }
    }
    try {
        let data = await Country.find(filter).exec();
        // console.log(data);
        res.json({
            'status':1,
            'data':data,
        })
    } catch (error) {
        console.log(`database fetch error${error} `);
    }
}

const putCountries = async(req,res) => {
    let filter = {};
    if (req.query.id != null) {
        filter = {
            '_id': req.query.id
        }
        try {
            let data = await Country.deleteOne(filter).exec();
            if (data.deletedCount > 0) {
                message = "Data deleted Successfully";
                status = 1
            } else {
                message = "Data has been already exist !!";
                status = 0;
            }
            res.json(
                {
                    message: message,
                    status: status
                }
            )
        } catch (error) {
            console.log(`database fetch error${error} `);
        }
    }
}


const getCities = async(req,res) => {
    try {
        const cities = await City.find({state_name:req.body.state_name})
        res.status(200).send({success:true,msg:'cities data',data:cities});

        
    } catch (error) {
        res.status(400).send({success:false,msg:error.message});
        
    }
}

module.exports = {
    postCountries,
    getCountries,
    putCountries,
    getCities
}