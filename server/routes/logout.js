var express = require("express");
var router = express.Router();

var connection = require("./connectDB");

router.get("/logout", function(req,res,next){
    connection.query('select * from users',function(err,users){
        if(err){
            res.send(errr)
        }
        res.json(users)
    });

});

router.post("/logout", function(req,res,next){
    var mobile = req.body.mobile;
    var username = req.body.username;
    var email = req.body.email;

        connection.query('UPDATE users SET `is_connect`=? WHERE mobile=? AND username=? AND email=?',
            [0,mobile,username,email], function(err,results,fields){
                if(err){
                    console.log(err);
                        // res.send({'success':false,'message':'logout failed'});
                }
                if(results.length > 0){
                    res.send({'success':true,'message':'Logout success'});
                }
                else{
                    res.send({'success':true,'message':'logout failed'});
                }
            });
   
});


module.exports = router;