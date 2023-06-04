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
    },
    diet:{
        type:String,
        enum:['done' , 'not done' , 'none'],
        required:true
    },
    walk:{
        type:String,
        enum:['done' , 'not done' , 'none'],
        required:true
    },
    book:{
        type:String,
        enum:['done' , 'not done' , 'none'],
        required:true
    },
    podcast:{
        type:String,
        enum:['done' , 'not done' , 'none'],
        required:true
    },
    skincare:{
        type:String,
        enum:['done' , 'not done' , 'none'],
        required:true
    },
    token:{
        type:String,
        default:''
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