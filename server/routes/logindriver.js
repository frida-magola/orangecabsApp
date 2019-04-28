var express = require("express");
var router = express.Router();

var connection = require("./connectDB");

//it will send the bookings request
router.get("/logindriver", function(req,res,next){
    connection.query('select * from users',function(err,users){
        if(err){
            res.send(errr)
        }
        res.json(users)
    });

});

router.post("/logindriver", function(req,res,next){
    var mobile = req.body.mobile;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE mobile=? AND role=? AND verify=?',
    [mobile,'driver',1],function(error,results,fields){
        if(error){
            console.log(error);
            res.send({'success':false,'message':'could not connect to the database'});
        }
        if(results.length > 0){
            connection.query('UPDATE users SET `is_connect`=? WHERE mobile=?',
            [1,mobile], function(err,results,fields){});
            
            res.send({'success':true,'user':results[0].username});
        }
        else{
            res.send({'success':false,'message':'User not found'});
        }

    });
   
});


module.exports = router;