var express = require('express');
var router = express.Router();
var mgdb = require('../../common/mgdb')

router.post('/', function(req, res, next) {
  // console.log(req.body)
  let {username,password} = req.body;

  mgdb(
    {collection:'user'},
    ({collection,client})=>{
      collection.find(
        {username,password}
        // {
        //   projection:{_id:0}
        // }
      ).toArray((err,result)=>{
        if(!err && result.length>0){
          //种cookie , 留session
          req.session['username']=result[0].username
          res.send({error:0,msg:'登录成功',data:result[0]});
        }else{
          res.send({error:1,msg:'登录失败,用户或者密码有误'})
        }
      })
    }
  )


});
module.exports = router;
