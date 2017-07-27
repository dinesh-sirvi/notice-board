const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var promise = mongoose.connect(process.env.MONGODB_URI, {useMongoClient:true});

promise.then((db)=>{
  console.log("Successfully connected to database");
}, (error)=>{
  console.log('Some error while connecting to database');
});

module.exports = {mongoose};
