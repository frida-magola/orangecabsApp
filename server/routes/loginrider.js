var express = require("express");
var router = express.Router();
var Base64 = require('js-base64').Base64;

var connection = require("./connectDB");

//it will send the bookings request
router.get("/loginrider", function(req,res,next){
    connection.query('select * from users',function(err,users){
        if(err){
            res.send(errr)
        }
        res.json(users)
    });

});

router.post("/loginrider", function(req,res,next){
    var mobile = req.body.mobile;
    var password = req.body.password;
    // var pass = Base64.encode(password);
    connection.query('SELECT * FROM users WHERE mobile=? AND password=? AND role=? AND verify=?',
    [mobile,password,'rider','1'],function(error,results,fields){
        if(error){
            console.log(error);
            res.send({'success':false,'message':'could not connect to the database'});
        }
        if(results.length > 0){
            connection.query('UPDATE users SET `is_connect`=? WHERE mobile=? AND password=?',
            [1,mobile,password], function(err,results,fields){});
            
            res.send({'success':true,'mobile':results[0].mobile,'user_id':results[0].user_id,'name':results[0].username,'email':results[0].email});
        }
        else{
            res.send({'success':false,'message':'Wrong mobile phone or Password!'});
        }

    });
   
});


module.exports = router;