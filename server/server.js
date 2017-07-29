require('./configs/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./mongoose/mongoose');
const app = express();

const {Notif} = require('./models/notifs');
const {Admin} = require('./models/admins');

app.use(bodyParser.json());

// app.get('/notifs', (req,res)=>{
//   res.send('Initial setup');
// });

app.post('/notif',  (req,res)=>{
  var notif = new Notif({
    creatorDetails :{
      creatorName: "Creator1",
      creatorPhotoUrl: "creatorUrl"
    },
    notifDetail:{
      title: req.body.title,
      text:req.body.text,
      imageUrl: req.body.url
    },
    department: "Computer"
  });
  notif.save().then((doc)=>{
    res.status(200).send(doc);
  },(error)=>{
    res.status(400).send(error);
  });
});
app.get('/notifs', (req,res)=>{
  Notif.find({department: "Computer"}).then((doc)=>{
    res.status(200).send(doc);
  }, (error)=>{
    res.status(400).send();
  });
});

app.post('/admin', (req,res)=>{
  var admin = new Admin({
    name : req.body.name,
    email :req.body.email,
    department: req.body.department,
    organization: req.body.organization,
    org_img_url: "ORG_IMG",
    admin_img_url: "ADMIN_IMG",
    password: req.body.password,
    tokens: [{access: "x-auth", token: "adadaidhakbakdahgkd"}]
  });
  admin.save().then((doc)=>{
    res.status(200).send(doc);
  }, (error)=>{
    res.status(400).send();
  });
});
app.listen(process.env.PORT, ()=>{
  console.log(`server is up on port ${process.env.PORT}`);
});
