var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var index = require("./routes/index");
var bookings = require("./routes/bookings");
var viewtrip = require("./routes/viewtrip");
var loginrider = require("./routes/loginrider");
var logout = require("./routes/logout");
var signup = require("./routes/signup");
var logindriver = require("./routes/logindriver");
var driverLocation = require("./routes/driverLocation");
var drivers = require("./routes/drivers");
var activate = require("./routes/activate");
var forgotpassword = require("./routes/forgotpassword");
var resetpassword = require("./routes/resetpassword");
var completeBook = require("./routes/completeBook");
var alltrip = require("./routes/alltrips");
var historytrip = require("./routes/historytrip");
var trippaid = require("./routes/trippaid");
var paymentHistory = require("./routes/paymentHistory");
var payfast = require("./routes/payfast");

var app = express();

var port = 3000;

// var socket_io = require("socket.io");

// var io = socket_io();


//views

app.set("views",  path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);


//Body parser MW

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Make our db accessible to our router
// app.use(function(req,res,next){
//     req.connDB = connDB,
//     next()
// });

//Routes

app.use("/", index);
app.use("/api", bookings);
app.use("/api", loginrider);
app.use("/api", logout);
app.use("/api", viewtrip);
app.use("/api", signup);
app.use("/api", logindriver);
app.use("/api", driverLocation);
app.use("/api", drivers);
app.use("/api", activate);
app.use("/api", forgotpassword);
app.use("/api", resetpassword);
app.use("/api",completeBook);
app.use('/api',alltrip);
app.use("/api",historytrip)
app.use('/api',trippaid);
app.use("/api",paymentHistory);
app.use("/api",payfast);

app.listen(app.listen(port, function(){
	console.log("Server running on port", port);
}));

// app.io = io.on("connection", function(socket){
// 	console.log("Socket connected: " + socket.id);
// });
