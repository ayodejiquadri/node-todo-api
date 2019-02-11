var {ObjectID} = require('mongodb');
var {mongoose} = require('../server/db/mongoose');
var {Todo} = require('../server/models/todo');
var {User} = require('../server/models/user');

var id = '5c5d79f9ff0d744e58f3d71f';
var userId = '5c5c058caaf4d254949c512e';

if(!ObjectID.isValid(id)){
   return console.log('ID not valid');
}
// Todo.find({
//     _id:id
// }).then((todos)=>{
//     console.log('Todos',todos);
// });

// Todo.findOne({
//     _id:id
// }).then((todo)=>{
    
//     console.log('Todo',todo);
// });

// Todo.findById(id)
//     .then((todo)=>{
//         if(!todo){
//             return console.log('Id not found');
//         }
//         console.log('Todo By Id',todo);
// }).catch((e)=>console.log(e));

User.findById(userId)
    .then((user)=>{
        if(!user){
            return console.log('User Id not found');
        }
        console.log('User By Id',user);
}).catch((e)=>console.log(e));