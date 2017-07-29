const mongoose = require('mongoose');
const mongodb = require('mongodb');

var notifsSchema = new mongoose.Schema({
  creatorDetails: {
    creatorName: {
      type: String,
      trim: true,
      minLength: 1
    },
    creatorPhotoUrl: {
      type: String
    }
  },
  notifDetail :{
    title :{
      type: String,
      minLength: 1,
      trim: true
    },
    text :{
      type:String,
      trim: true
    },
    imageUrl :{
      type: String
    },
  },
  timeDetails : {
    createdAt : {
      type: Date,
      default: Date.now
    }
  },
  department : {
    type: String,
    Required:true
  }

});

var Notif = mongoose.model('notif', notifsSchema);
module.exports = {Notif};
