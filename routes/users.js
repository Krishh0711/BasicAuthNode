const express = require('express');

const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);
router.get('/reset-password',usersController.resetPassword);
router.post('/update-password',usersController.updatePassword);

//create session 
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) , usersController.createSession);

//destroy session
router.get('/sign-out',usersController.destroySession);

//google auth
router.get('/auth/google', passport.authenticate('google',{
    scope:['profile','email']
}));

//callback url
router.get('/auth/google/callback',passport.authenticate('google', 
{failureRedirect: '/users/sign-in'}
),usersController.createSession);

module.exports = router;