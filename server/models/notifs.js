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
    text :{
      type:String,
      trim: true
    },
    imageUrl :{
      type: String
    }
  },
  timeStamp: {
    type: String,
    Required:true
  },
  department : {
    type: String,
    Required:true
  }

});

var Notif = mongoose.model('notif', notifsSchema);
module.exports = {Notif};
