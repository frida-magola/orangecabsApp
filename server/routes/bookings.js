var express = require("express");
var router = express.Router();

var connection = require("./connectDB");

//it will send the bookings request
router.get("/bookings", function(req,res,next){
    connection.query('select * from trips WHERE user_id=?',[],function(err,users){
        if(err){
            res.send(errr)
        }
        res.json(users)
    });

});

router.post("/bookings", function(req,res,next){
    var booking = req.body.data;
    var mobile = booking.mobile;
    var username = booking.username;
    var email = booking.email;

    var userId ='';
    var lastInsertId = '';

    connection.query('SELECT user_id FROM users WHERE mobile=? AND username=? AND email=?',
        [mobile,username,email],function(err,results){
        if (err) {
            res.status(400);
            res.json({
                error: "Bad data!"
            });
        }
            userId = results[0].user_id;
            res.send(results);


    });

});


module.exports = router;