const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('../config/passport-local-strategy');

router.get('/sign-up',usersController.signUp);
router.post('/create',usersController.create);
router.get('/create-session', passport.authenticate('local', { failureRedirect: '/users/sign-up' }), usersController.createSession);

//  route for sign up or sign in the user via google
router.get('/auth/google',passport.authenticate('google',{scope:['email','profile']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),usersController.createSession);

router.get('/profile',usersController.userProfile);



module.exports = router;