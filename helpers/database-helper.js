var mongodb = require("mongoose");
var createHash = require('hash-generator');

var dbConnectionObj = null;
var polling_db = null;
var polling_db_collection_schema=null;

var server = require("../server").server;

var database_helper = {
    establishConnection:function(){
        mongodb.connect("mongodb://localhost/polling-app-db");
    },
    createModel:function(){
        polling_db_collection_schema = mongodb.Schema({
            options:[],
            browserIds:[],
            topic_name:String
        });
        polling_db = mongodb.model("polling_collection",polling_db_collection_schema);
    },
    sendPostDetails:function(post_id,client,votingStatus)
    {       
        polling_db.findById(post_id,function(err,res){
            if(err) throw err;
            res = res.toObject();
            res["status"] = votingStatus; //true or false 
            client.send(res); 
        });
        
    },
    setPostDetails:function(new_post,client)
    {
        var new_post_data = new polling_db;
        new_post_data.topic_name = new_post.value; //topic_name
        new_post.options.forEach(function(option){
            var new_option = {};
            new_option[option.value] = 0;
            new_post_data.options.push(new_option);
        });
        new_post_data.save(function(err,res){
            if(err) throw err;
            let post_id = {};
            post_id["hash"] = res._id;
            post_id = JSON.stringify(post_id);
            post_id = JSON.parse(post_id);
            client.send(post_id);
         });
    },
    //a helper function to remove the test effects 
    dropRecords:function(){
        polling_db.remove({},function(err,res){
            if(err) throw err;
            console.log("Removed all");
        });
    },
    updateVoteCount:function(post_id,option,socket,io){
        polling_db.findById(post_id,function(err,data){
            
            if(err) throw err;
            var options = data.options;
            console.log(data.options);
            
            //get the index
            let index = 0;
            
            for(index=0;index<options.length;index++)
            {
                console.log(Object.keys(data.options[index]));
                if(Object.keys(data.options[index]) == option)
                    break;
            }
            
            var oldVal = (data.options[index])[option];
            var newVal = oldVal + 1;
            var updateMap = {$set:{}};
            
            updateMap.$set["options."+index+"."+option] = newVal;
            
            polling_db.findByIdAndUpdate(post_id,updateMap,{new:true},function(err,doc){
                if(err) throw err;
                console.log(doc);
                let updatedData = {};
                updatedData["post_id"] = post_id;
                updatedData["option"] = option;
                updatedData["vote"] = doc.options[option];
                updatedData = JSON.stringify(updatedData);
                io.sockets.to(post_id).emit("updateUI",JSON.parse(updatedData)); //sent to everyone except the one who emitted it so the one who emitted has to manage the ui updation after clicking the vote button(things might change for the pooling technique).
                var client = null;
                
                    var hash = createHash(8);
                    var browser_id = hash+"+"+post_id;
                    polling_db.findByIdAndUpdate(post_id,{ "$push": { "browserIds": browser_id }},{ "new": true, "upsert": true },function(err,res){
                    console.log(res);
                });
                    cookie = {}; 
                    cookie["post_id"] = post_id;
                    cookie["browser_id"] = browser_id;
                    socket.emit("create-cookie",cookie);
                    console.log("Cookies Written");
            });
        });
    }
};

module.exports = database_helper;