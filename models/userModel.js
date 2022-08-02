const mongoose = require('mongoose');
const valid = require('email-validator');

const db_link='mongodb+srv://foodme:he%40q5arZzmiM6vi@cluster0.oakel4t.mongodb.net/?retryWrites=true&w=majority';

const bcrypt = require('bcrypt');

mongoose.connect(db_link)
.then(function(db){
    console.log('user db connected');
})
.catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return valid.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type: String,
        required:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword==this.password;
        }
    },
    role:{
       type:String,
       enum:['admin','user','restaurantowner','deliveryboy'],
       default:'user' 
    },
    profileImage:{
       type:String,
       default:'img/users/default.jpeg'
    },
    resetToken:String
});

//don't save the confirme password
userSchema.pre('save',function(){
    this.confirmPassword=undefined;
});

userSchema.methods.createResetToken=function(){
    //creating unique token using npm i crypto
    const resetToken=crypto.randomBytes(32).toString("hex");
    this.resetToken=resetToken;
    return resetToken;
}
  
userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
    this.password=password;
    this.confirmPassword=confirmPassword;
    this.resetToken=undefined;
}

//model
const userModel = mongoose.model('userModel',userSchema);
module.exports=userModel;