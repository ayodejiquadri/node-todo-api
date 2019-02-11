var {ObjectID} = require('mongodb');
var {mongoose} = require('../server/db/mongoose');
var {Todo} = require('../server/models/todo');
var {User} = require('../server/models/user');

//remove all documents
Todo.remove({}).then((result)=>{

});
//Todo.findByIdAndRemove
//Todo.findOneAndRemove

Todo.findOneAndRemove({_id:'5c6162ea2adc514214a80f31'}).then(()=>{

});

Todo.findByIdAndRemove('5c6162ea2adc514214a80f31').then(()=>{

});