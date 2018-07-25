# Simple Polling App
A RESTful simple polling app based on the mean stack.

Default domain:- localhost
Default port:- 3000

":" indicates variable names. 
"()" contains data-type.

URL Formats:- 
-------------
1. http://domain:port/home :- GET all the static files.
2. http://domain:port/api/:post_id/:(true or false) :- GET request for the post details and the status.
3. http://domain:port/home/api/question :- POST the post details along with the options. 
4. http://domain:port :- The socket.io server location.

JSON Data Formats according to request response scenarios. 
----------------------------------------------------------
1.  Response JSON for the GET request for the post details
        1.1. object.topic_name :- topic name(String).
        1.2. object.options :- options(Array of String keyed and Number Valued pairs).
        1.3. object.status :- true or false(String).
        1.4. object.options[someoptionName] :- Vote Count i.e. by default 0(Number).
        
NOTE :- Object.keys(res.options[i])[0] is to be done to get particular key names from the options array while iterating through it, where i is the current option key value object.
        
2. POST question details.
    2.1. object.value:- Topic Name(String).
    2.2. object.options:- Options(Array).

3. Socket events and request parameters's format table:-
-------------------------------------------------------------------------------------------------
    eventname parameter(s)  objectvars                               Emitted By
    ----------------------------------------------------------------------------
    join      post_id      post_id(String)                             Client
    vote      object       post_id(String),option(String)              Client
    updateUI  object       post_id(String),option(String),vote(Number) Server
create-cookie object       post_id(String),browser_id(String)          Server
        
Client Script for socket event handling.
----------------------------------------
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.dev.js"></script>

var socket = io.connect('http://localhost:3000'); //client socket reference

function broadcast(innerhtml){ //onClick of the option should call this method by providing option's innerHTML     
        let data={};
        data["post_id"]="5b55db15378aec11c0198fa9";
        data["option"]=innerhtml;
        data = JSON.stringify(data);
        data = JSON.parse(data);
        socket.emit("join",data["post_id"]);
        socket.emit("vote",data);
    }
    socket.on("updateUI",function(data){  
        console.log("Server gave="+data); //update the UI when a vote has been registered in server
    });
    socket.on("create-cookie",function(cookie){ //create the localhost file with post_id:hash key value object
        console.log("create cookie for "+cookie.post_id+"for browser id"+cookie.browser_id);
    });
    
-------------------------------------------------------------------------------------------------------
    PLEASE REFER TESTS FOLDER FOR EXAMPLES BY ROUTING TO /TESTS/<INSERTEXAMPLENAME.HTML>
-------------------------------------------------------------------------------------------------------