var dbHelper = require("../helpers/database-helper.js");
var express = require("express");
cookie_parser = require("cookie-parser");
var middleware_factory = {
    
    getCookieParserMiddleware:function(){
        cookieParserMiddleware = function(req,res,next){
        //call cookie parser to populate the req.cookie with key values of the cookie
        cookie_parser();
        console.log("Cookies Parsed");
        next();
    }
        return cookieParserMiddleware;
    },
    
    getVulnerabilityCheckerMiddleware:function(){
        vulnerabilityCheckerMiddleware = function(req,res,next){
            //check for injections in the form data
            console.log("checked");
            next();
        }
        return vulnerabilityCheckerMiddleware;
    },
    
    getStaticFileLoaderMiddleware:function(){
        staticFileLoaderMiddleware = function(req,res,next){
            //load the static htmls,csses,jses i.e the form for questions
            console.log("Deliver");
            express.static("public");
            next();
        }
        return staticFileLoaderMiddleware;
    },
    
    ifBrowserExistsMiddleware:function(req,res,next){
        if(req.cookies){
//            console.log("hello"); wont need these most probably as the cookies arent null i.e. its set with something
//        post_id = req.params.id;
//        browser_id = ""+req.body.browser_id;
//        model.find({_id:post_id,browserIds:[browser_id]},function(err,response){
//           if(err) throw err;
//            if(response.browserIds == browser_id)
                dbHelper.sendPostDetails(post_id,client,false); //cant vote request response ends here
//        });
        }
        console.log("Bye");
        next();
    }
};

module.exports = middleware_factory;