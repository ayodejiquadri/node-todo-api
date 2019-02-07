var mongoose = require('mongoose');

//we configure moongoose to use the builtin Promise library
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};