var databaseHelper = require("./helpers/database-helper");

databaseHelper.establishConnection();
databaseHelper.createModel();
//databaseHelper.addNamespaces();

var express = require("express");

var app = express();
exports.server = require("http").Server(app);

var get_router = require("./routers/get-router.js");
var post_router = require("./routers/post-router.js");
var home_router = require("./routers/home-router");
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var middleware_factory = require("./middlewares/middleware-factory.js");
var socket_io = require("socket.io");
var io = socket_io(exports.server);


app.use("/api",get_router);
app.use("/home/api/question",bodyParser.json(),bodyParser.urlencoded({ extended: true }),upload.array(),middleware_factory.getVulnerabilityCheckerMiddleware(),post_router);
app.use("/home",express.static("public")); //serve static files here
app.use("/home/test/",home_router);

io.on('connection', function(socket){
    console.log('a user connected with id %s', socket.id);

    socket.on('join', function (room) {
        socket.join(room);
        console.log(socket.id+" Joined");
    });
    socket.on('leave', function (room) {
        socket.leave(room);
        console.log(socket.id, "left", room);
    });
    socket.on('vote', function (data) {
        databaseHelper.updateVoteCount(data.post_id,data.option,socket,io);
    });
});

exports.server.listen(3000);