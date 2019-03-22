'use strict';

let mongoose = require("mongoose");
let Schema = mongoose.Schema; 

// the user schema is being creates to sructure and require specific parameters.
var UserSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    emailAddress: { type: String, required: true,
    match: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/}, // spcific requirements needed for thr email address
    password: { type: String, required: true}
});

var User = mongoose.model("User", UserSchema);

// the course schema is being creates to sructure and require specific parameters.
var CourseSchema = new Schema({
    user: {type:Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    description: {type: String, required: true},
    estimatedTime: String,
    materialsNeeded: String
});

var Course = mongoose.model("Course", CourseSchema);
 
module.exports = { User, Course };
