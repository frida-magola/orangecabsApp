var express = require("express");
var router = express.Router();

var connection = require("./connectDB");

//it will send the bookings request
router.get("/forgotpassword", function(req,res,next){
    connection.query('select * from users',function(err,users){
        if(err){
            res.send(errr)
        }
        res.json(users)
    });

});

router.post("/forgotpassword", function(req,res,next){
    var mobile = req.body.mobile;
    connection.query('SELECT * FROM users WHERE mobile=? AND role=? AND verify=?',
    [mobile,'rider',1],function(error,results,fields){
        if(error){
            console.log(error);
            res.send({'success':false,'message':'could not connect to the database'});
        }
        if(results.length > 0){
            res.send({'success':true,'mobileS':results[0].username});
        }
        else{
            res.send({'success':false,'message':'This number does not exist'});
        }

    });
   
});


module.exports = router;