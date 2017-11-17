const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

var admin = new mongoose.Schema({
  name :{
    type: String,
    required: true,
    minlength : 5,
    maxlenght: 20
  },
  email :{
    type:String,
    validate: {
      isAsync: true,
      validator : validator.isEmail,
      message: `{value} is not a valid email`
    },
    required: true,
    minglenght: 1,
    unique: true
  },
  department: {
    type:String,
    required:true,
    minlength: 1,
    maxlength: 10
  },
  
  admin_photo :{
    type:String,
    required:true,
    minlength: 1
  },
  password:{
    type:String,
    required:true,
    minlength:8
  },
  tokens: [{
    access: {
      type:String,
      required:true
    },
    token :{
      type:String,
      required:true
    }
  }]
});
admin.pre('save', function(next){
  var admin = this;
  bcrypt.genSalt(10, (err,salt)=>{
    bcrypt.hash(admin.password, salt, (err,hash)=>{
      admin.password = hash;
      next();
    });
  });
});
admin.statics.getDepartment = function(id){
  return new Promise((resolve, reject)=>{
    this.findOne({_id: id}).then((result)=>{
      if(!result){
        reject('Something wrong happened, Contact developers');
      }
      resolve(result.department);
    });
  });
};

admin.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  // var _id = user._id;
  // var email = user.email;

  return new Promise((resolve, reject) =>{
      var token = jwt.sign({_id: user._id, email: user.email}, 'somesecret');
      admin.tokens.push({access,token});
      admin.save().then(()=>{
        resolve(token);
      }, (err)=>{
        reject(err);
      });
  });
};
var Admin = mongoose.model('admin', admin);

module.exports = {Admin};
