require('./configs/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./mongoose/mongoose');
const _ = require('lodash');
const app = express();


const {Notif} = require('./models/notifs');
const {Admin} = require('./models/admins');
const {User} = require('./models/users');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const{AuthenticateUser} = require('./middleware/authenticateUser');
const {AuthenticateAdmin} = require('./middleware/authenticateAdmin');


// app.get('/notifs', (req,res)=>{
//   res.send('Initial setup');
// });

app.post('/notif', AuthenticateAdmin, (req,res)=>{
  var notif = new Notif({
    creatorDetails :{
      creatorName: req.body.adminName,
      creatorPhotoUrl: req.body.adminPhotoUrl
    },
    notifDetail:{
      text:req.body.text,
      imageUrl: req.body.url
    },
    department: req.body.department
  });

  notif.save().then((doc)=>{
    res.status(200).send(doc);
  },(error)=>{
    res.status(400).send(error);
  });
});

app.get('/', (req,res)=>{
  res.send('App is live');
});

app.get('/notifs', AuthenticateUser, (req,res)=>{
  console.log(req.body.department);
  Notif.find({department: req.body.department}).then((doc)=>{
    var response = {};
    var key = "notifs";
    response[key] = doc;
    res.status(200).send(response);
  }, (error)=>{
    res.status(400).send();
  });
});

app.post('/admin', (req,res)=>{
  var admin = new Admin({
    name : req.body.name,
    email :req.body.email,
    department: req.body.department,
    admin_photo: req.body.admin_photo_url,
    password: req.body.password
  });

  admin.save().then((doc)=>{
    res.status(200).send(doc);
  }, (error)=>{
    res.status(400).send();
  });
});

app.post('/user', (req, res)=>{
  var user = new User({
    name : req.body.name,
    email : req.body.email,
    password: req.body.password,
    department : req.body.department
  });
  user.save().then((doc)=>{
    res.status(200).send(doc);
  }, (err)=>{
    res.status(400).send();
  });
});

app.post('/userlogin', (req,res)=>{
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user)=>{
    // console.log(user);
    user.generateAuthToken().then((token)=>{
      //console.log(token);
      var resObject = {
        name : user.name,
        email: user.email,
        department: user.department,
        token: token
      };
      res.setHeader('x-auth', token);
      res.status(200).send(resObject);
    });

  }, (error)=>{
    console.log(error);
    res.status(401).send({msg: error});
  });
});

app.post('/adminlogin', (req,res)=>{
  var body = _.pick(req.body, ['email', 'password']);
  Admin.findByCredentials(body.email, body.password).then((user)=>{
    // console.log(user);
    user.generateAuthToken().then((token)=>{
      //console.log(token);
      var resObject = {
        name : user.name,
        email: user.email,
        department: user.department,
        token: token,
        photoUrl : user.admin_photo
      };
      res.setHeader('x-auth', token);
      res.status(200).send(resObject);
    });

  }, (error)=>{
    console.log(error);
    res.status(401).send({msg: error});
  });
});


app.listen(process.env.PORT, ()=>{
  console.log(`server is up on port ${process.env.PORT}`);
});
