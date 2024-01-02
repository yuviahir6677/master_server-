const State = require('../model/stateModel')
const Country = require('../model/countryModel')


var message = "Invalid request";
var status = 0;


const getCountries = async (req, res) => {
    try {
        const countries = await Country.find({})
        res.status(200).send({ success: true, msg: 'countries data', data: countries });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });

    }
}
const postStates = async (req, res) => {

    if (req.body.id != '') {
        let result = await
            State.updateOne({
                _id: req.body.id
            },
                {
                    $set: {
                        'state_name': req.body.state_name,
                        'country_Id': req.body.country_Id


                    }
                }
            );


        if (await result.acknowledged == true) {
            res.json({
                message: "Data Updated Success",
                status: 1
            });
        } else {
            res.json({
                message: message,
                status: status
            });
        }




    } else {

        const users_table = new State({
            state_name: req.body.state_name,
            country_Id: req.body.country_Id


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

const getStates = async (req, res) => {
   
    try {
        var final_data = [];

        if (req.query.id != null) {

            filter = {
                '_id': req.query.id
                }
         final_data = await State.find(filter).exec();
         res.json({
            'status': 1,
            'data': final_data,
        })
        } else {

            State.aggregate([
                {
                    $lookup: {
                        from: "countries",
                        localField: "country_Id",
                        foreignField: "_id",
                        as: "countries"
                    },
                }

            ]).then((data) => {

                data.forEach(element => {
                    if (element.countries.length > 0) {
                        var tmp = {
                            "_id": element._id,
                            "state_name": element.state_name,
                            "country_name": element.countries[0].country_name,
                        }
                        final_data.push(tmp);
                    }



                });

                res.json({
                    'status': 1,
                    'data': final_data,
                })
            });
        }

    } catch (error) {
        console.log(`database fetch error${error} `);
    }
}
const putstate = async (req, res) => {
    let filter = {};
    if (req.query.id != null) {
        filter = {
            '_id': req.query.id
        }
        try {
            let data = await State.deleteOne(filter).exec();
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



module.exports = {

    getCountries,
    postStates,
    getStates,
    putstate
}