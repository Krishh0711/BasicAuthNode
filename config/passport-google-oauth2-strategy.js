const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const passwordHash = require('password-hash');

const User = require('../models/user');
require('dotenv').config();


//use google startegy....
passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALL_BACK_URL
     },
     function(accessToken, refreshToken, profile, done){
         User.findOne({email:profile.emails[0].value}).exec(function(err, user){
             if(err){
                 console.log('error in google startegy', err);
                 return;
             }

             if(user){
                 return done(null, user);
             }else{
                let hashedPassword = passwordHash.generate(crypto.randomBytes(20).toString('hex')); 
                 User.create({
                     name:profile.displayName,
                     email:profile.emails[0].value,
                     password: hashedPassword
                 }, function(err, user){
                    if(err){
                        console.log('error in creating user google startegy', err);
                        return;
                    }
                    return done(null, user);
                 })
             }
         })
     }

));

module.exports = passport;