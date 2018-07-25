var express = require('express');
var home_router = express.Router();

home_router.get("/",function(req,res){
    //get form data for submission of new questions.
    console.log("Hello");
    res.sendFile("C:/Users/Workspace/Desktop/nodeprojects/polling-app/tests/finaltest.html");
});

//TESTS, REMOVE LATER
home_router.get("/form-shit",function(req,res){
    res.sendFile("C:/Users/Workspace/Desktop/nodeprojects/polling-app/public/index2.html");
});

home_router.get("/event-checker",function(req,res){
    //get form data for submission of new questions.
    res.sendFile("C:/Users/Workspace/Desktop/nodeprojects/polling-app/tests/eventchecker.html");
});

module.exports = home_router;