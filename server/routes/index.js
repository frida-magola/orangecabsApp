var express = require("express");
var router = express.Router();

//it will render our main vues
router.get("/", function(req,res,next){
    res.render("index.html")
});

module.exports = router;