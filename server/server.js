const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
  res.send('Initial setup');
});

app.listen(3000, ()=>{
  console.log("server is up on port 3000");
});
