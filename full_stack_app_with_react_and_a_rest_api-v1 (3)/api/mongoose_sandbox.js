'use strict';

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox", {useNewUrlParser: true });

var db = mongoose.connection;

db.on("error", function(err){
    console.error("connection error:", err);
});

db.once("open", function(){
    console.log("db connection successful");
    // All database commucation goes here

    var Schema = mongoose.Schema;
    var UserSchema = new Schema({
        _id: "ObjectId",
        firstName: String,
        lastName: String,
        emailAddress: String,
        password: String
    });

    var User = mongoose.model("User", UserSchema);

    var Dalyn = new User({
        _id: 777,
        firstName: "Dalyn",
        lastName: "Small",
        emailAddress: "Dalynsmall16@gmail.com",
        password: "shadows"
    });

    Dalyn.save(function(err){
        if (err) console.error("Save Failed.", err);
        else console.log("Saved!");
        db.close(function(){
            console.log("db connection closed");
        });
    });

});




  

