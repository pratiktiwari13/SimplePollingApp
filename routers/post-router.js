var express = require('express');
var dbHelper = require("../helpers/database-helper.js");
var connection = dbHelper.dbConnectionObj;
var post_router = express.Router();

post_router.post("/",function(req,res){
    //get form data for submission of new questions.  
    dbHelper.setPostDetails(req.body,res);
});

module.exports = post_router;