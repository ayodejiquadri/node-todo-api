var mongoose = require('mongoose');
var User = mongoose.model('User',{
    email:{
        type:'string',
        minlength:1,
        required:true,
        trim:true
    }
})

module.exports = {User};