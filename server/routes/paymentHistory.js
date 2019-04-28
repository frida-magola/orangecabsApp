var express = require("express");
var router = express.Router();

var connection = require("./connectDB");

//it will send the bookings request
router.get("/paymentHistory", function(req,res,next){
    connection.query('SELECT * FROM trips',function(error,results,fields){
    if(error){
        console.log(error);
        res.send({'success':false,'message':'could not connect to the database'});
    }
    res.send(results);
    });

});

// 

router.post("/paymentHistory", function(req,res,next){
    var booking = req.body;
    var mobile = booking.mobile;

     //Insert into the data base
     connection.query('SELECT * FROM trips WHERE user_id=? AND status_pay="paid"  AND is_delete="0" AND pay_information!="" ORDER BY trip_id DESC',
     [mobile],function(error,results,fields){
        if(error){
            console.log(error);
            res.send({'message':'could not connect to the database'});
        }
        res.send(results);
        // console.log(results);

     }); 

});


module.exports = router;