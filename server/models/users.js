const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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
  },
  tokens:[{
    access: {
      type: String,
      required:true,
      minlength:1
    },
    token: {
      type:String,
      required: true,
      minlength: 1
    }
  }
  ]
});

user.pre('save', function(next){
  var user = this;
  if(user.isNew){
    bcrypt.genSalt(10, (err,salt)=>{
      bcrypt.hash(user.password, salt, (err,hash)=>{
        user.password = hash;
        next();
      });
    });
  }
  else
    next();
});

user.statics.findByCredentials = function(email, password){
  return new Promise((resolve, reject)=>{
    this.findOne({email}).then((result)=>{
      if(!result){
        reject("Email Doesnot Exist");
      }
      bcrypt.compare(password, result.password, (err, res)=>{
        if(res == true)
          resolve(result);
        else {
          reject("Incorrect password");
        }
      });
    });
  });
};
user.statics.getDepartment = function(id){
  return new Promise((resolve, reject)=>{
    this.findOne({_id: id}).then((result)=>{
      if(!result){
        reject('Something wrong happened, Contact developers');
      }
      resolve(result.department);
    });
  });
};
user.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  // var _id = user._id;
  // var email = user.email;

  return new Promise((resolve, reject) =>{
      var token = jwt.sign({_id: user._id, email: user.email}, 'somesecret');
      user.tokens.push({access,token});
      user.save().then(()=>{
        resolve(token);
      }, (err)=>{
        reject(err);
      });
  });
}

var User = mongoose.model('user', user);

module.exports = {User};
