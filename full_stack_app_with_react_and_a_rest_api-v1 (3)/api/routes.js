'use strict';
// reqiuring the neccesary modules
const { User, Course } = require("./models");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('basic-auth');



// giving the users an ID category unique to courses.
router.param("uID", function(req, res, next, id){
    User.findById(id, function(err, doc){
        if(err) return next(err);
        if(!doc) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        }
        req.user = doc; 
        return next();
    });
});

// giving the courses an ID category unique to users.
router.param("cID", function(req, res, next, id){
    Course.findById(id, function(err, doc){
        if(err) return next(err);
        if(!doc) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        }
        req.course = doc; 
        return next();
    });
});

//-----------------------------------------------------------------------


// function/varibale for user authentication
  const authenticateUser = (req, res, next) => {
    const credentials = auth(req);
    if (!credentials.name && !credentials.pass) {
        var error = new Error("An Email and password is required");
        error.status = 401;
        return next(error);
     }
    if(credentials) {
        User.findOne({emailAddress: credentials.name})
        .exec(function(error, user){
            if (error){
                throw new Error;
            } else if (!user) {
                var error = new Error("Wrong email");
                error.status = 401;
                return next(error);
            } 
         // Using the bycrpt module to compare the password inputed in postman to the password used by the user
            bcrypt.compare(credentials.pass, user.password, function(error, result){
                if (result === true) { // if the the email and password in is correct then the user can then access and utilize the route
                    console.log(`Authentication successful`);
                   req.currentUser = user;
                    return next();
                } else {
                var error = new Error("Wrong password");
                error.status = 401;
                return next(error);
                }
             });

            });

    }

};


//GET /users
// Route for users collection
router.get("/api/users", authenticateUser,  function(req, res){ 
    var authedUser = auth(req); // The credentials of the authenticated user has been ploaced in a variable
    User.find({emailAddress: authedUser.name}) // locating the user with the email of the authenticated user
    .exec()
    .then((data) => {
        res.status(200);
        res.json(data); //returns the user 
        console.log(authedUser);
    })
    .catch(err=> {
        console.log(err);
        res.status(401).json({
            error: err
        });
    });
 
});

//POST /users
// Route for creating users
router.post("/api/users", (req, res, next) => {
    User.find({ emailAddress: req.body.emailAddress }) // searches for the email with in the database
    .exec()
    .then(user => {
        if (user.length >= 1) { //if the
            return res.status(422).json({
                message: "This email already exists"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => { // the password is hashed upon creation
                if (err) {
                    return next(err) && res.status(401)
                    
                } else {
                    
                    var user = new User({ // once user is created then these structure/parameters will be required
                        firstName:req.body.firstName,
                        lastName:req.body.lastName,
                        emailAddress: req.body.emailAddress,
                        password:  hash
                });
                user.save() // the user is saved to the database
                .then(result => {
                    console.log(result)
                    res.sendStatus(201) //.json({
                 res.location = '/';
                })

            }
        })   
        }
    })
    
    });


//________________________________________________________________________


// Returns a list of courses (including the user that owns each course)
router.get("/api/courses", function(req, res, next){
    Course.find()
    .populate('user') // the user parameter will be populated with users
    .exec()
    .then(
        (data) => {
            console.log(JSON.stringify(data, null, 2));
            res.status(200)
            return res.send(data)
        });
});

// GET /courses/:id
// Route for specific course
router.get("/api/courses/:id", function(req, res, next){
   const {id} = req.params;
    Course.findById(id) // the course will be searched with its unique ID
    .populate('user')
    .exec()
    .then((data) => {
        console.log(JSON.stringify(data, null, 2));
        res.status(200).json(data);
        res.location = 'api/courses/id'
    });
   
});

//POST /users
// Route for creating courses
router.post("/api/courses", /*authenticateUser,*/ function(req, res, next){

const user = req.currentUser;
    var course = new Course({
        user: user._id,
        title: req.body.title,
        description:req.body.description,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded: req.body.materialsNeeded
    }) // the new course is created with its specified parameters
    if (course.title && course.description){
    
    course.save(function (err, result) {
        if(err) { 
            res.status(401);
            return next(err).json({
                error: err
            });
        } else {
            console.log("Course has successfully been created")
            res.status(201).json(result)
            
        }
        
    });
} else {
    var error = new Error("Title and Description reqiured");
    error.status = 401;
    return next(error);
}
});

  
router.put("/api/courses/:cID", authenticateUser, function(req, res){
    const id = req.params.cID;
    Course.updateOne({_id: id}, req.body) // the course information will be updated based on the ID of the course the Put request is being sent to
    .exec()
    .then(result => {
        console.log(result);
        res.status(204).json(result);
    })
    .catch(err=> {
        console.log(err);
        result.status(401).json({
            error: err
        });
    });
});
 
//Deletes a course and returns no content
router.delete("/api/courses/:cID", authenticateUser, function(req, res){
    const id = req.params.cID
    Course.deleteOne({_id: id}) // the course would be deleted based on the ID of the course the DELETE request is being sent to
    .exec()
    .then(result => {
        res.status(204).json(result)
        console.log("Course has been successfully deleted")
    })
    .catch(err=> {
        console.log(err);
        res.status(401).json({
            error: err
        });
    });
});


///// Course Routes

// GET /api/courses 200 - Returns a list of courses (including the user that owns each course) +


// GET /api/courses/:id 200 - Returns a the course  +
//      (including the user that owns the course) for 
//      the provided course ID


// POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content+


// PUT /api/courses/:id 204 - Updates a course and returns no content +


// DELETE /api/courses/:id 204 - Deletes a course and returns no content +






module.exports = router;




