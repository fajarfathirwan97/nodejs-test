var express = require('express');
var router = express.Router();
var app = express();

router.get('/user',function (req,res){
  res.json(200,'hehe');
});
module.exports = router;