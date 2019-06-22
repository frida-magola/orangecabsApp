var express = require("express");
var router = express.Router();

var connection = require("./connectDB");

//it will send the bookings request
router.get("/historytrip", function(req,res,next){
    connection.query('SELECT * FROM trips',function(error,results,fields){
    if(error){
        console.log(error);
        res.send({'success':false,'message':'could not connect to the database'});
    }
    res.send(results);
    });

});

// 

router.post("/historytrip", function(req,res,next){
    var booking = req.body;
    var mobile = booking.mobile;
    var token = booking.token;

     //Insert into the data base
     connection.query('SELECT * FROM trips WHERE mobile=? AND access_token=? AND date < DATE(NOW()) AND is_delete="0"  ORDER BY trip_id DESC',
     [mobile,token],function(error,results,fields){
        if(error){
            console.log(error);
            res.send({'message':'could not connect to the database'});
        }
        if(results.length > 0){
            res.send({'success':true,'results':results});
            
        }
        else{
            res.send({'message':'You have not any history trip yet.'});
        }

     }); 

});


module.exports = router;