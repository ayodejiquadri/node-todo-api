//process.env.NODE_ENV is set by heroku. We set it to 'test' when running unit test to use testdb
var env = process.env.NODE_ENV || 'development';
console.log("env *******",env);

if(env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}else if(env === 'test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}