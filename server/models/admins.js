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
  organization:{
    type:String,
    required: true,
    minlength:1,
  },
  org_img_url :{
    type:String,
    required:true,
    minlength: 1
  },
  admin_img_url :{
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

var Admin = mongoose.model('admin', admin);

module.exports = {Admin};
