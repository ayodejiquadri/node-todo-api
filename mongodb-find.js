//const MongoClient = require('mongodb').MongoClient;
//this is es6 object destructuring
const {MongoClient,ObjectID} = require('mongodb');

//we can generate the id ourself
// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    
    var db = client.db('TodoApp');

    // db.collection('Todos')
    //     //.find({completed:false})
    //     .find({_id:new ObjectID('5c59d31f75e6c129c8c8b15e')})
    //     .toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Unable to fetch Todos',err);
    // });
    // db.collection('Todos').find().count().then((count)=>{
    //     console.log( `Todos count:${count}`);
    // },(err)=>{
    //     console.log('Unable to fetch Todos',err);
    // });

    db.collection('Users')
        .find({name:'Andrew'})
        .toArray().then((docs)=>{
        console.log('Users');
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('Unable to fetch Users',err);
    });
    client.close();
});