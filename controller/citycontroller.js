const City = require('../model/cityModel')
const State = require('../model/stateModel')


var message = "Invalid request";
var status = 0;


const getState = async (req, res) => {
    try {
        console.log(req.params.id);
        const states = await State.find({
            country_Id: req.params.id,
        });
        console.log(states);
        res.status(200).send({ success: true, msg: 'states data', data: states });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });

    }
}


const postcities = async (req, res) => {

    if (req.body.id != '') {
        let result = await
            City.updateOne({
                _id: req.body.id
            },
                {
                    $set: {
                        'city_name': req.body.city_name,
                        'state_ID': req.body.state_ID,
                        'country': req.body.country


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

        const users_table = new City({
            city_name: req.body.city_name,
            state_ID: req.body.state_ID,
            country: req.body.country



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

const getCities = async (req, res) => {
    try {
        var final_data = [];
        if (req.query.id != null) {
            filter = {
                '_id': req.query.id
            }

            let final_data = await City.find(filter).exec();
            res.json({
                'status': 1,
                'data': final_data,
            })
        } else {

            City.aggregate([
                {
                    $lookup: {
                        from: "countries",
                        localField: "country",
                        foreignField: "_id",
                        as: "countries"
                    },
                },
                {
                    $lookup: {
                        from: "states",
                        localField: "state_ID",
                        foreignField: "_id",
                        as: "states"
                    },
                },



            ]).then((data) => {

                data.forEach(element => {
                    if (element.countries.length !== 0) {
                        var tmp = {
                            "_id": element._id,
                            "city_name": element.city_name,
                            "state_name": element.states[0].state_name,
                            "country_name": element.countries[0].country_name,
                        }
                        final_data.push(tmp);
                        console.log(tmp);
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


// try {
//     var final_data = [];

//     if (req.query.id != null) {

//         filter = {
//             '_id': req.query.id
//             }
//      final_data = await State.find(filter).exec();
//      res.json({
//         'status': 1,
//         'data': final_data,
//     })
//     } else {

//         State.aggregate([
//             {
//                 $lookup: {
//                     from: "countries",
//                     localField: "country_Id",
//                     foreignField: "_id",
//                     as: "tabledata"
//                 },
//             }

//         ]).then((data) => {

//             data.forEach(element => {
//                 if (element.tabledata.length > 0) {
//                     var tmp = {
//                         "_id": element._id,
//                         "state_name": element.state_name,
//                         "country_name": element.tabledata[0].country_name,
//                     }
//                     final_data.push(tmp);
//                 }



//             });

//             res.json({
//                 'status': 1,
//                 'data': final_data,
//             })
//         });
//     }

// } catch (error) {
//     console.log(`database fetch error${error} `);
// }

const putcities = async (req, res) => {
    let filter = {};
    if (req.query.id != null) {
        filter = {
            '_id': req.query.id
        }
        try {
            let data = await City.deleteOne(filter).exec();
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

    getState,
    postcities,
    getCities,
    putcities
}