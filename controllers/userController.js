const express = require("express");
const config  = require("../config");
const _       = require("lodash");
const mongoose = require("mongoose");
const jwt         = require( "jsonwebtoken" ); //Package used for session validation
const accountKit  = require('../helper/accountKitHelper'); //Helper function to verify OTP from facebook server

const userModel  = require("../models/userSchema.js");


class usercontroller {


    login(req,res){
        let website = req.body.type;
        let user_id,name;
        if(website == 'facebook'){
            user_id = req.body.data.id;
            userModel.findOne({"facebook_id.id" : user_id}).exec(function(err,newuser){
                if(err){
                    res.status(500).json({message:"Internal Server Error"}); return false;
                }
                if(_.size(newuser) == 0){
                    newuser = new userModel;
                    newuser.name = req.body.data.name;
                    newuser.facebook_id.id = req.body.data.id;
                    newuser.facebook_id.time = Date.now();
                }
                newuser.save(function(err,information){
                    let token = jwt.sign( { user : information._id }, config.jwtsecret , { expiresIn: 10000000 } );
                    res.status( 200 ).json( { message : "You have successfully registered with our application", token : token} );

                })

            })
        }
        if(website == 'google'){
            user_id = req.body.data.id;

            userModel.findOne({"google_id.id" : user_id}).exec(function(err,newuser){
                if(err){
                    res.status(500).json({message:"Internal Server Error"}); return false;
                }
                if(_.size(newuser) == 0){
                    newuser = new userModel;
                    newuser.name = req.body.data.name;
                    newuser.google_id.id = req.body.data.id;
                    newuser.google_id.time = Date.now();
                }
                newuser.save(function(err,information){
                    let token = jwt.sign( { user : information._id }, config.jwtsecret , { expiresIn: 10000000 } );
                    res.status( 200 ).json( { message : "You have successfully registered with our application", token : token} );

                })
                
            })
        }

        // let code        = req.body.code; //Facebook account kit auth code.
        // userModel.findOne({phone_number : req.body.phone}).exec(function(err,newuser){
        //     console.log(newuser)
        //     if(err){
        //         res.status(500).json({message : "Internal Server Error"}); return false;
        //     }
        //     if(_.size(newuser) == 0){
        //         newuser = new userModel;
        //         newuser.phone_number = req.body.phone;
        //     }
        //     newuser.save(function(err,information){
        //         accountKit.verifyOtp( code , function( verified ){
        //             console.log(verified);
        //             if( verified.status == 2 ){
        //                 res.status(200).json( { status : 1,message : "Phone number and OTP not verified." } ); return false; 
        //             }
        //             if( ("+91" + req.body.phone) != verified.data ){
        //                 res.status( 200 ).json( { status : 1 ,message : "Phone number you entered and verified are not same." } ); return false;
        //             }
        //             let token = jwt.sign( { user : information._id }, config.jwtsecret , { expiresIn: 10000000 } );
        //             console.log(token)
        //             res.status( 200 ).json( { status : 2 ,message : "You have successfully registered with our application", token : token} );

        //         })
        //     })

        // })
    }
}

const user = new usercontroller()
module.exports = user;