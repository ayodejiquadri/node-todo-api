var mongoose = require('mongoose');
const validator = require("validator");
const jwt =  require('jsonwebtoken'); 
const _ = require("lodash");

var UserSchema =  new mongoose.Schema({
    email:{
        type:'string',
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            //validator: validator .isEmail(value)
            validator:(value)=>{
                return validator.isEmail(value);
            },
            message: "{VALUE} is not a valid email"
        }
    },
    password:{
        type: String,
        required: true,
        minlength : 6
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token : {
            type:String,
            required:true 
        }
    }]

});

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject,['_id','email']);
};  
//we use regular functions and not arrow function because we are using the this keyword
UserSchema.methods.generateAuthToken = function (){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    //add the token to the user's token array
    user.tokens = user.tokens.concat([{access,token}]);

    return user.save().then(()=>{
        return token;
    });
};
var User = mongoose.model('User',UserSchema);

module.exports = {User};