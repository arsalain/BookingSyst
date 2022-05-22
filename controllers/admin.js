var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


var db = require.main.require ('./models/db_controller');


router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get("/login", (req, res) => {
    db.getallbook(function(err,result){
        if(err)
         throw err;
         res.render('admin/admin.ejs',{list : result,res:result})
     });
 // }
});

router.post('/addbook',function(req,res){
 // db.getuser(email,function(err,results){
 // var id =results[0].id;
 //let id = results.id
 //var id = req.params.id;
 var userid=req.session.userId
  db.addbook(req.body.type,req.body.start_date,req.body.end_date,req.body.start_time,req.body.end_time,req.body.reason,userid);
if(db.addbook){
    req.flash('success', 'user succesfulyl registered')
    res.locals.inst = req.flash();
    console.log('1 book inserted');
    db.gettype(function(req,result){
     res.render('admin/add.ejs',{rows:result});
    })
}else{
res.render('admin/add.ejs');
}
});
router.post('/search_all',function(req,res){
  var key = req.body.search;
 db.searchbook(key,function(err,result){
   console.log(result);
     if(err)
     throw err;
        res.render('admin/admin.ejs',{list : result})
 });
});

router.get("/add", (req, res) => {
    db.gettype(function(req,result){
      res.render("admin/add.ejs",{rows:result});
    })
   // res.render("admin/add.ejs");
});

router.get("/update1", (req, res) => {
    db.getbookbyun(function(err,result){
        if(err)
         throw err;
         res.render('admin/confirm.ejs',{list : result})
     });
});
router.post('/update1', function(req, res){
    let status=req.body.status;
  
   db.getbookbyun(function(err, result1) {
       if (result1.length > 0) {
        var id =result1[0].id;
              db.setstatus(id,status,function(err,results) {
  if (!err) {
    db.getbookbyun(function(err, result){
    res.render('admin/confirm.ejs',{list : result})
    console.log(result1);  
    }); 
  }
    else {
        return res.status(500).json(err);
          }
        });
       }
          else{
           res.render('admin/confirm.ejs',{list : result1})
         }
        });
});

router.get('/edit_book/:id',function(req,res){
  var id = req.params.id;

  db.getBookbyId(id,function(err,result){
  res.render('admin/edit_book.ejs' ,{list : result});
      });
});
router.post('/update_book/:id',function(req,res){
  var id=req.params.id;
  db.updatebook(id,req.body.type,req.body.start_date,req.body.end_date,req.body.start_time,req.body.end_time,req.body.reason,req.body.status)
    if (db.updatebook) {
   db.getallbook(function(err,result){
    if(err)
     throw err;
    // res.render('admin/admin.ejs',{list : result})
    res.redirect("/login");
 });
  }
    else{
      return res.status(500).json(err);
    }
    });

    router.get('/delete_book/:id',function(req,res){
      var id = req.params.id;
      db.deletebookbyId(id,function(err,result){
        res.redirect('/login')
         // res.render('admin/admin.ejs',{list:result})
      });
  
       });
 router.get("/add_user", (req, res) => {
        res.render("admin/adduser.ejs");
    });
router.post('/add_user',function(req,res){
      db.adduser(req.body.role,req.body.id,req.body.name,req.body.email,req.body.password);
    if(db.adduser){
        req.flash('success', 'user succesfulyl registered')
        res.locals.insta = req.flash();
        console.log('1 book inserted');
         res.render('admin/adduser.ejs');
    }else{
    res.render('admin/adduser.ejs');
    }
    });
    router.get("/view_user", (req, res) => {
      db.getuser(function(err,result){
        if(err)
         throw err;
         res.render('admin/viewuser.ejs',{list : result,res:result})
     });
    });
    
router.get('/edit_user/:id',function(req,res){
  var id = req.params.id;

  db.getuserbyId(id,function(err,result){
  res.render('admin/edituser.ejs' ,{list : result});
      });
});
router.post('/update_user/:id',function(req,res){
  var id=req.params.id;
  db.updateuser(id,req.body.role,req.body.name,req.body.email,req.body.password)
    if (db.updateuser) {
    // res.render('admin/admin.ejs',{list : result})
    res.redirect("/login");
    }
 });
 
 router.get('/delete_user/:id',function(req,res){
      var id = req.params.id;
      db.deleteuserbyId(id,function(err,result){
        res.redirect('/login')
         // res.render('admin/admin.ejs',{list:result})
      });
    });

module.exports = router;