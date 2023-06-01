const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
const bcrypt = require('bcrypt');

// serializing user to decide which key is to be set in cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing user from the key in the cookie
passport.deserializeUser(async function(id,done){
    try{
        const user = await User.findById(id);
        return done(null,user);
    }catch(err){
        console.log('error in finding user --> passport',err);
        return done(err);
    }
});

// authenticatin using passport
passport.use(new LocalStrategy(
    {
    usernameField:'email',
    // passReqToCallback:true
    },
    async function(email,password,done){
        try{
            const user = await User.findOne({email:email});
            console.log(user);
            const isMatch = await bcrypt.compare(password,user.password);
            console.log(isMatch);
            if(!user){
                console.log('Email not registered!');
                return done(null,false);
            }else if(!isMatch){
                console.log('Invalid password!!');
                return done(null,false);
            }
            return done(null,user);

        }catch(err){
            console.log('error in passport local strategy establishing the user!');
        }
    }
));

// check if the user is authenticated 
passport.checkAuthenticaion = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        return res.redired('/');
    }
}

// stet the authenctaiated user
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;