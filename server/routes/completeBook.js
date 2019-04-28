var express = require("express");
var router = express.Router();

var connection = require("./connectDB");

//it will send the bookings request
router.get("/completeBook", function(req,res,next){
    connection.query('select * from trips WHERE user_id=?',[],function(err,users){
        if(err){
            res.send(errr)
        }
        res.json(users)
    });

});

router.post("/completeBook", function(req,res,next){
    var booking = req.body;
    var mobile = booking.mobile;
    var username = booking.username;
    var email = booking.email;
    var pickuplocation = booking.pickup;
    var amountofrider = booking.amountofrider;
    var nameofrider = booking.nameofrider;
    var datePicker = booking.datePicker;
    var price = booking.price;
    var dropoff = booking.dropoff;
    var pickuplatitude = booking.pickuplatitude;
    var pickuplongitude = booking.pickuplongitude;
    var dropofflatitude = booking.dropofflatitude;
    var dropofflongitude = booking.dropofflongitude;
    var status = booking.status;

     //Insert into the data base
     connection.query('INSERT INTO trips SET user_id=?, departure=?, departureLatitude=?, departureLongitude=?, destination=?, destinationLatitude=?, destinationLongitude=?, amountofriders=?, nameofonerider=?, price=?, mobile=?, status_pay=?, date=?',
     [
        mobile,
        pickuplocation,
        pickuplatitude,
        pickuplongitude,
        dropoff,
        dropofflatitude,
        dropofflongitude,
        amountofrider,
        nameofrider,
        price,
        mobile,
        status,
        datePicker
     ],function(error,results,fields){
     if(error){
         console.log(error);
         res.send({'success':false,'message':'could not connect to the database'});
     }
    if(results.affectedRows > 0){
        // res.send({'success':true,'price':results[0].price,'date':results[0].date,'status':results[0].status_pay,'mobile':results[0].mobile});
        res.send({'success':true,'results':results});
    }
     }); 

});


module.exports = router;