var express = require("express");
var router = express.Router();
var connection = require("./connectDB");

//it will send the bookings request
router.get("/viewtrip", function(req,res,next){
    connection.query('select * from trips',function(err,trips){
        if(err){
            res.send(errr)
        }
        res.json(trips)
    })
    // res.send("Bookingsz");
});
module.exports = router;