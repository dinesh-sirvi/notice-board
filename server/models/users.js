const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

var user = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    required: true
  },
  email: {
    type: String,
    minlength:1,
    required:true,
    unique:true,
    validate: {
      isAsync: true,
      validator : validator.isEmail,
      message: `{value} is not a valid email`
    }
  },
  password: {
    type:String,
    required: true,
    minglength: 8
  },
  department: {
    type: String,
    required: true,
    minlength: 1
  }
});

user.pre('save', function(next){
  var user = this;
  bcrypt.genSalt(10, (err,salt)=>{
    bcrypt.hash(user.password, salt, (err,hash)=>{
      user.password = hash;
      next();
    });
  });
});

var User = mongoose.model('user', user);

module.exports = {User};
