require("./config/config");
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos',authenticate,(req,res)=>{
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get("/todos",authenticate,(req,res)=>{
    Todo.find({
        _creator:req.user._id
    }).then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get("/todos/:id",authenticate,(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Invalid Id');
    }

    Todo.findOne({ _id:id, _creator:req.user._id}).then((todo)=>{
        if(!todo){
           return res.status(404).send();
        }
        res.send({todo});
    },(e)=>{
        res.status(400).send();
    });
});

app.delete("/todos/:id",authenticate,async (req,res)=>{
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Invalid Id');
    }
    try {
       const todo = await Todo.findOneAndRemove({ _id:id, _creator:req.user._id});
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    } catch (e) {
        res.status(400).send()
    }
    // Todo.findOneAndRemove({ _id:id, _creator:req.user._id}).then((todo)=>{
    //     if(!todo){
    //        return res.status(404).send();
    //     }
    //     res.send({todo});
    // }).catch((e)=> res.status(400).send());
});

app.patch("/todos/:id", authenticate, (req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Invalid Id');
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }
    else{
        body.completed = false;
        body.completedAt = null;
    }

    //return the updated todo
    Todo.findOneAndUpdate({_id:id,_creator:req.user._id},{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            res.status(404).send()
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.post("/users",async (req,res)=>{
    try {
        const body = _.pick(req.body,['email','password']);
        const user = new User(body);
        await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth',token).send(user);

    } catch (error) {
        res.status(400).send(error)
    }
    // user.save().then(()=>{
    //     return user.generateAuthToken();
    // }).then((token)=>{
    //     res.header('x-auth',token).send(user);
    // })
    // .catch((e)=>res.status(400).send(e));
});

app.post("/users/login",async (req,res)=>{
    try {
        const body = _.pick(req.body,['email','password']);
        const user = await User.findByCredentials(body.email,body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth',token).send(user);
    } catch (error) {
        res.status(400).send();
    }
});


app.get("/users/me",authenticate,(req,res)=>{
    res.send(req.user);
});

app.delete('/users/me/token',authenticate,async (req,res)=>{
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (error) {
        res.status(400).send();
    }
    
    // req.user.removeToken(req.token).then(()=>{
    //     res.status(200).send();
    // },()=>{
    //     res.status(400).send();
    // });
});
app.listen(port,()=>{
    console.log("Started on port "+port);
});

module.exports={app};


// var newTodo = new Todo({
//     text:'cook dinner'
// });

// newTodo.save().then((doc)=>{
//     console.log('Saved todo', doc);
// },(e)=>{
//     console.log('Unable to save todo');
// });

// var otherTodo = new Todo({
//     text:' do stuff ',
//     //completed:true,
//     //completedAt:123
// });

// otherTodo.save().then((doc)=>{
//     console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//     console.log('Unable to save todo',e);
// });

// var newUser = new User({
//     email:"ayodeji@gmail.com"
// });

// newUser.save().then((doc)=>{
//     console.log(JSON.stringify(doc,undefined,2));
// },(e)=>{
//     console.log('Unable to save user', e);
// });