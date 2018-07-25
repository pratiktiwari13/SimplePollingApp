var express = require('express');
var database_helper = require('../helpers/database-helper.js');

var get_router = express.Router();

get_router.get("/:id/:status",function(req,res){ //client should check if the id is in the local storage                                                             and then make the get request with status accordingly
    console.log("Helllo");
    database_helper.sendPostDetails(req.params.id,res,req.params.status);
    //adding a new group
});

module.exports  = get_router;