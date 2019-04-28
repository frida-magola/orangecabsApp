var express = require("express");
var router = express.Router();

var connection = require("./connectDB");

//it will send the bookings request
router.get("/activate", function(req,res,next){
    connection.query('select * from users',function(err,users){
        if(err){
            res.send(errr)
        }
        res.json(users)
    });

});

router.post("/activate", function(req,res,next){
    var mobile = req.body.mobile;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE mobile=? AND password=? AND role="rider" AND verify="1"',
    [mobile,password],function(error,results,fields){
        if(error){
            console.log(error);
            res.send({'success':false,'message':'could not connect to the database'});
        }
        if(results.length > 0){
            connection.query('UPDATE users SET `is_connect`=? WHERE mobile=? AND password=?',
            [1,mobile,password], function(err,results,fields){});
            
            res.send({'success':true,'user':results[0].username});
        }
        else{
            res.send({'success':false,'message':'User not found'});
        }

    });
   
});


module.exports = router;