# BasicAuthNode

## NodeJsAuth is an authentication system which can be used as a starter code for creating any new application. This project is built using Node.js 

### Steps to use this application for your own project
1) npm init --> Do the required configuration
2) install mongoDB
3) As it uses many dependencies so you have to install required dependencies.
   Go to project folder and type in terminal --> npm install package_name 
   #### package_name are as follows -->
    "connect-flash",
    "connect-mongo",
    "crypto",
    "ejs",
    "express",
    "express-ejs-layouts",
    "express-session",
    "mongoose",
    "node-sass-middleware",
    "passport",
    "passport-google-oauth",
    "passport-local",
    "password-hash"
 4) Type in terminal npm start . 
 Following this steps you will be good to go

 ### Functionalities 
 1) User can register themselves.
 2) Login in with their email and password.
 3) They can reset their password.
 4) Flash messages on completion or termination of each task.

 ###### Note-> 
 1) If you want to store additional details of user then add additional fields in models/user.js.
 2) Change the required ClientId and ClientSecret values in config/passport-google-oauth.js

