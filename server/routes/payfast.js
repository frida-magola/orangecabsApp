var express = require("express");
var router = express.Router();

var connection = require("./connectDB");

//it will send the bookings request
router.get("/payfast", function(req,res,next){
    connection.query('select * from trips WHERE user_id=?',[],function(err,users){
        if(err){
            res.send(errr)
        }
        res.json(users)
    });

});

module.exports = router;