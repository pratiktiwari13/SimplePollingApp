# Simple Polling App
A simple polling app based on the mean stack.

Default domain:- localhost.
Default port:- 3000.

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
1.  Response JSON for the GET request for the post details.
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
<code><script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.dev.js"></script></code>

<code>var socket = io.connect('http://localhost:3000'); //client socket reference</code>

<code>function broadcast(innerhtml){ //onClick of the option should call this method by providing option's innerHTML</code>   
        <code>let data={};<code/>
        <code>data["post_id"]=recieved_post_id;</code>
        <code>data["option"]=innerhtml;</code>
        <code>data = JSON.stringify(data);</code>
        <code>data = JSON.parse(data);</code>
        <code>socket.emit("join",data["post_id"]);</code>
        <code>socket.emit("vote",data);</code>
    <code>}</code>
    <code>socket.on("updateUI",function(data){</code>  
        <code>console.log("Server gave="+data);</code> //update the UI when a vote has been registered in server<code>
    <code>});</code>
    <code>socket.on("create-cookie",function(cookie){ //create the localhost file with post_id:hash key value object</code>
        <code>console.log("create cookie for "+cookie.post_id+"for browser id"+cookie.browser_id);</code>
    <code>});<code/>   
-------------------------------------------------------------------------------------------------------
    PLEASE REFER TESTS FOLDER FOR EXAMPLES BY ROUTING TO /TESTS/<INSERTEXAMPLENAME.HTML>
-------------------------------------------------------------------------------------------------------
