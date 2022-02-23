var express = require('express');
var router = express.Router();
var usermodel = require('../models/usermodel')
/*TO Check users */
router.use((req, res, next) => {
  if(req.session.sunm==undefined || req.session.srole!='user')
  {
    res.redirect('/login');
  }
  else
  {
    next();
  }
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('userhome',{'sunm':req.session.sunm})
});

router.get('/funds', function(req, res, next) {
  var PAYPAL_URL="https://www.sandbox.paypal.com/cgi-bin/webscr"
  var PAYPAL_ID="sb-9qkm58596688@business.example.com"
  console.log(req.session.sunm)
  res.render('funds',{'sunm':req.session.sunm, 'PAYPAL_URL':PAYPAL_URL,'PAYPAL_ID':PAYPAL_ID})
});

router.get('/payment', function(req, res, next) {
  //console.log(req.query)
  usermodel.payment(req.query).then((result)=>{
    res.redirect('/user/success')
  }).catch((err)=>{
    console.log(err);
  })
});

router.get('/success', function(req, res, next) {
  
  res.render('success')
});

router.get('/cancel', function(req, res, next) {
  res.render('cancel',{'sunm':req.session.sunm})
});

module.exports = router;
