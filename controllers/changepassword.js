var express = require('express');

var cookieParser = require('cookie-parser');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require ('./models/db_controller');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.post('/changePassword', function(req, res){
    let oldpassword=req.body.oldpassword;

   let newpassword=req.body.newpassword;


 //con.query("select * FROM user WHERE name=? AND password=?", [name, oldpassword], function (error, results, fields) {
    db.checkpassword(oldpassword,function(err, results) {
        if (results.length > 0) {
          
          var id =results[0].id;
              db.setpassword(id,newpassword,function(err,result1) {
if (!err) {
   req.flash('success', 'user succesfulyl registered')
   res.locals.cad = req.flash();
                 res.render('user',{list:results});
               }
                 else {
                  return res.status(500).json(err);
                    }
                });
           }
    else {
      req.flash('success', 'user succesfulyl registered')
      res.locals.mess = req.flash();
      res.render('user',{list:results});
    }

            });
})
router.post('/change', function(req, res){
  let oldpassword=req.body.oldpassword;

 let newpassword=req.body.newpassword;
 //var id = req.params.id;

  db.checkpassword(oldpassword, function(err, results) {
      if (results.length > 0) {
     
        var id =results[0].id;
            db.setpassword(id,newpassword,function(err,result1) {
if (!err) {
 req.flash('success', 'user succesfulyl registered')
 res.locals.cad = req.flash();
 db.getallbook(function(err,result){
  if(err)
   throw err;
   res.render('admin/admin.ejs',{list : result,res:results})
});
             }
               else {
                return res.status(500).json(err);
                  }
              });
         }
  else {
    req.flash('success', 'user succesfulyl registered')
    res.locals.mess = req.flash();
    db.getAllDoc(function(err,result){
      if(err)
       throw err;
       res.render('admin/admin.ejs',{list : result,res:results})
   });
  }

          });
})
module.exports =router;
