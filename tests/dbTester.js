db = require("../helpers/database-helper.js");
app = require("express")();
db.establishConnection();
db.createModel();
 
data = {
        "topic_name":"topic",
        "options":["option1","option2"],
        "browser_id":null
    };
db.setPostDetails(data);
//db.getPostDetails();

app.listen(3000);