var express = require("express");
var router = express.Router();
var connection = require("./connectDB");
var Base64 = require('js-base64').Base64;

//it will send the bookings request
router.get("/signup", function(req,res,next){
    connection.query('select * from users',function(err,users){
        if(err){
            res.send(errr)
        }
        res.json(users)
    });

});

router.post("/signup", function(req,res,next){
    var username = req.body.username;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var password = req.body.password;
    // var pass = Base64.encode(password);

    //check if username exist
    connection.query('SELECT * FROM users WHERE username=?',
        [username],function(error,results,fields){
        if(error){
            console.log(error);
            res.send({'success':false,'message':'could not connect to the database'});
        }
        if(results.length > 0){
            res.send({'success':false,'message':'this username is already exist'});
        }
    });

    //check if mobile exist
    connection.query('SELECT * FROM users WHERE mobile=?',
    [mobile],function(error,results,fields){
        if(error){
            console.log(error);
            res.send({'success':false,'message':'could not connect to the database'});
        }
        if(results.length > 0){
            res.send({'success':false,'message':'this mobile number is already exist'});
        }
        // else{
        //     res.send({'success':false,'message':'User not found'});
        // }
    });

    //check if email exist
    connection.query('SELECT * FROM users WHERE email=?',
        [email],function(error,results,fields){
        if(error){
            console.log(error);
            res.send({'success':false,'message':'could not connect to the database'});
        }
        if(results.length > 0){
            res.send({'success':false,'message':'this email is already exist'});
        }
        // else{
        //     res.send({'success':false,'message':'User not found'});
        // }
    });

     //Insert into the data base
     connection.query('INSERT INTO users SET username=?, mobile=?, email=?, password=?, role=?, verify=?',
        [username,mobile,email,password,'rider',1],function(error,results,fields){
         if(error){
             console.log(error);
             res.send({'success':false,'message':'could not connect to the database'});
         }
         res.send({'success':true,'message':'Account created successfully'});
     });
   
});

module.exports = router;