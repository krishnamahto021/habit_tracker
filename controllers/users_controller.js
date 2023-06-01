const User = require('../models/users');
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:'User SignUp'
    })
}

// to fetch data from signUp form
module.exports.create = async function(req,res){
    try{
    if(req.body.password != req.body.confirm_password){
        console.log('Password not matched!!');
        return res.redirect('back');
    }
    else {
        const user = await User.findOne({email:req.body.email});
        if(user){
            return res.redirect('/');
        }else{
        const newUser = await User.create({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            });
            return res.redirect('/');
        }
    }
}catch(err){
    console.log('error in creating user');
}
}

// to create seesion of the user
module.exports.createSession = function(req,res){
    console.log('user logged in!!');
    return res.redirect('/users/profile');
}

// to render profile page
module.exports.userProfile = function(req,res){
    return res.render('user_profile',{
        title:'User Profile'
    });
};