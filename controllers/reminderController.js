const express = require("express");
const config  = require("../config");
const _       = require("lodash");
const mongoose = require("mongoose");


const reminderModel  = require("../models/reminderSchema.js");


class remindercontroller {


    addoreditreminder(req,res){
        let reminderid = "";
        if(req.body._id != ""){
            reminderid = req.body._id;
        }
        else{
            reminderid = new mongoose.mongo.ObjectID();
        }
        console.log(req.body.location)
        reminderModel.update({"$and":[{_id:reminderid},{user_id : req.authenticated.user }]},{
            "$set":{
                user_id : req.authenticated.user,
                time : req.body.time,
                title : req.body.title,
                location:req.body.location,
                description : req.body.description,
                type : req.body.type,
                record_status : req.body.record_status
            }
        },
        {upsert:true,new:true},function(err,result){
            if(err){
                res.status(500).json({message:"Internal Server Error"}); return false;
            }
            res.status(200).json({message:"Reminder Details",data:req.body}); return false;
        })
        
    }
    displayreminder(req,res){
        let userid = req.authenticated.user;
        let reminderdetails = reminderModel.find({user_id:userid}).lean().exec();
        Promise.all([reminderdetails]).then(result=>{
            if(_.size(result) > 0){
                res.status(200).json({message : "Reminder details",data: result[0]})
                return false;
            }else{
                res.status(200).json({message : "No reminder found"}); return false;
            }
        }).catch(err=>{
            console.log(err);
            res.status(500).json({message:"error"}); return false;
        })
    }

    changetaskstatus(req,res){
        let taskstatus;
        // if(req.params.taskstatus == 'completed') taskstatus = 'notcompleted';
        // else taskstatus = 'completed';
        reminderModel.update({_id : req.params.id},{
            "$set" : {
                record_status : req.params.taskstatus
            }
        },function(err,result){
            if(err){
                res.status(500).json({message:"Internal Server Error"}); return false;
            }
            res.status(200).json({message:"Task status Changed Succesfully",data: {reminderid : req.params.id,record_status : taskstatus}}); return false;
        })
    }
}

const reminder = new remindercontroller()
module.exports = reminder;