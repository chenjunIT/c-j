var express = require('express');
var router = express.Router();
var mgdb = require('../../common/mgdb')

router.get('/',function(req, res, next) {
  
  if(req.session['username']){
    mgdb({
      collection:'user'
    },({collection,client,ObjectID})=>{
      collection.find({
        username:req.session['username']
      }).toArray((err,result)=>{
        if(!err){
          res.send({error:0,msg:'自动登录',data:result[0]})
        }else{
          res.send({error:1,msg:'未登录'})
        }
        client.close();
      })
    })
  }else{
    res.send({error:1,msg:'未登录'})
  }
  
  

});


module.exports=router;