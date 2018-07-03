const express         = require( "express" );
const _               = require( "lodash" );




const remindervalidation = {

   
    postreminder : function(req,res,next){
        if(!req.body.title || !req.body.type || !req.body.description || !req.body.time){
            res.status(500).json({message:"Requested parameters not found"}); return false
        }
        next();
    }
}

module.exports = remindervalidation;