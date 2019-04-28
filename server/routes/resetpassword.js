var express = require("express");
var router = express.Router();

var connection = require("./connectDB");

//it will send the bookings request
router.get("/resetpassword", function(req,res,next){
    connection.query('select * from users',function(err,users){
        if(err){
            res.send(errr)
        }
        res.json(users)
    });

});

router.post("/resetpassword", function(req,res,next){
    var mobile = req.body.mobile;
    var password = req.body.password;
    connection.query('UPDATE users SET `password`=? WHERE mobile=?',
    [password,mobile],function(error,results,fields){
        if(error){
            console.log(error);
            res.send({'success':false,'message':'could not connect to the database'});
        }
        else{
            res.send({'success':true,'message':'successfully'});
        }

    });
   
});


module.exports = router;