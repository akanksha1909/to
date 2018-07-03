const express         = require( "express" );
const userRouter  = express.Router();


const config          = require( "../config" );

//Include required models
userModel       = require( "../models/userSchema");

//Include required controller
userController = require("../controllers/userController");





//user Login
userRouter.post("/login",function(req,res){
	userController.login(req,res);
});


module.exports = userRouter;