const jwt = require('jsonwebtoken');
const {Admin} = require('../models/admins');

module.exports.AuthenticateAdmin = function(req,res,next){
  console.log(req.body.text);
  try{
    var decoded = jwt.verify(req.body.token, 'somesecret');
    console.log(decoded);
    Admin.getDetail(decoded._id).then((result)=>{
      console.log(result);
      req.body.department = result.department;
      req.body.adminName = result.name;
      req.body.adminPhotoUrl = result.admin_photo;
      console.log(req.body);
      next();
    });
  } catch(err){
    res.status(401).send({msg: 'UNAUTHORIZED', status : 401});
  }
};