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
    var token = booking.token;

    connection.query('SELECT user_id FROM users WHERE mobile=? AND token=?',
        [mobile,token],function(err,results){
        if (err) {
            res.status(400);
            res.json({
                error: "Bad data!"
            });
        }
            
            res.send(results);

    });

});


module.exports = router;