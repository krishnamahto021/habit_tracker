const mongoose = require('mongoose');
const bcrypt =require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

// store hashed password in database
userSchema.pre('save',async function(next){
    if(this.isModified()){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

const User = mongoose.model('User',userSchema);
module.exports = User;