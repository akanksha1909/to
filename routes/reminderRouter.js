const express         = require( "express" );
const reminderRouter  = express.Router();


const config          = require( "../config" );

const auth            = require( "../authController" );

//Include required models
reminderModel       = require( "../models/reminderSchema");

//Include required controller
reminderController = require("../controllers/reminderController");

//Include middleware
remindermiddleware = require("../middleware/reminderRouter.js")





// Add Reminder
reminderRouter.post("/addoredit",[auth.authenticate,remindermiddleware.postreminder],function(req,res){
	reminderController.addoreditreminder(req,res);
});

// Add Reminder
reminderRouter.get("/getreminder",auth.authenticate,function(req,res){
	reminderController.displayreminder(req,res);
});

// Change Task Status
reminderRouter.get("/changetaskstatus/:taskstatus/:id",auth.authenticate,function(req,res){
	reminderController.changetaskstatus(req,res);
})

module.exports = reminderRouter;