const User = require('../models/user');
const passwordHash = require('password-hash');

//render the sign up page
module.exports.signUp = function(request,response){
    if(request.isAuthenticated()){
      return response.redirect('back');
    }
    return response.render('user_sign_up',{
      title:"NodeJsAuth | Sign Up"
    });
 }
 
 //render the sign in page
 module.exports.signIn = function(request,response){
    if(request.isAuthenticated()){
      return response.redirect('back');
    }
    return response.render('user_sign_in',{
       title:"NodeJsAuth | Sign In"
    });
 }

 //reset password page load
 module.exports.resetPassword = function(request,response){
  if(!request.isAuthenticated()){
    return response.redirect('back');
  }
  return response.render('reset_password',{
    title: "NodeJsAuth"
  })
}

//update password function
module.exports.updatePassword = async function(request,response){

  try {
    if(request.isAuthenticated()){
      if(request.body.newPassword!=request.body.confirmNewPassword){
        request.flash('error', 'Password and Confirm password did not match!!');
        return response.redirect('back');
      } 
  
      let user = await User.findByIdAndUpdate(request.body.userId);
        if(user){
           if(!passwordHash.verify(request.body.oldPassword, user.password)){
              request.flash('error', 'Old password is incorrect');
              return response.redirect('back');
           }
           user.password = passwordHash.generate(request.body.newPassword);
           user.save();
           request.flash('success', 'Password updated successfuly!');
           return response.redirect('/');  
        }else{
          request.flash('error', 'User not found');
           return response.redirect('/');
        }
  
    }else{
      return response.redirect('back');
    } 
    
  } catch (error) {
     console.log(error);
     return response.redirect('/');
  }
} 

//create new user
module.exports.create = async function(request,response){
  
    if(request.body.password !=  request.body.confirm_password){
      request.flash('error', 'Password and Confirm password did not match!!');
       return response.redirect('back');
    }

    try {
       let user = await User.findOne({email: request.body.email});
  
       if(!user){
        let hashedPassword = passwordHash.generate(request.body.password); 
        let newUser = await User.create({
              email: request.body.email,
              password:hashedPassword,
              name:request.body.name
          });
          request.flash('success', 'User Created Successfully! Log in to continue');
        return response.redirect('/users/sign-in');
       }else{
         request.flash('error', 'Email id already exists!!');  
        return response.redirect('back');
       }
        
    } catch (error) {
        console.log("Error in creating user",error);
        return response.redirect('back');
    }
  }

  // create session
  module.exports.createSession = function(request,response){
    request.flash('success', 'Logged in Successfully');
    return response.redirect('/');
 }
 
 //destroy session
 module.exports.destroySession = function(request,response){
    request.logout();
    request.flash('success', 'Logged out Successfully');
    return response.redirect('/');
 }
  