require('./configs/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./mongoose/mongoose');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
  res.send('Initial setup');
});

app.listen(process.env.PORT, ()=>{
  console.log(`server is up on port ${process.env.PORT}`);
});
