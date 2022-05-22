var express = require('express');
//var con = require('../models/db_controller');
//const { home } = require('nodemon/lib/utils');
var mysql =require('mysql');
var router = express.Router();
var bodyParser = require('body-parser');
//var con=require('../models/db_controller');
var ejs = require('ejs');
var session = require ('express-session');
//var bcrypt = require('bcrypt');
var db = require.main.require ('./models/db_controller');


router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

//let router = express.Router();
router.get('/', function(req ,res){
    res.render('login.ejs');
});

var con = mysql.createConnection({

   host : 'localhost',
   user : 'root',
   password : 'root',
  database : 'bookingsystem'
});
router.use(session({

    secret: 'secret',
    resave : true ,
    saveUninitialized : true 

}));

router.post('/login', function (req, res) {
    let id = req.body.id;
    let password = req.body.password;
    con.query("select * FROM user WHERE id=? AND password=?", [id, password], function (error, results, fields) {
        req.session.userId = results[0].id;
            console.log(results[0].id);
         if (results.length <= 0 || results[0].password != password) {
            req.flash('success', 'user succesfulyl registered')
            res.locals.messag = req.flash();
            res.render('login');
        }
        else if (results[0].role == 'user') {
            
            res.render('user',{list:results});
            //return res.status(401).json({ message: "Wait for admin approval" });
        }
        else if (results[0].password == password) {
           // req.session.loggedin = true ; 
           // req.session.name = name;
           // res.cookie('name' , name);
            //res.render('admin/admin.ejs',{list : results});
            db.getallbook(function(err,result){
                if(err)
                 throw err;
                 res.render('admin/admin.ejs',{list : result,res:results})
             });
        }
        else {
            return res.status(400).json({ message: "Something went wrong,please try again later" });
        }


    })
})

router.get("/logout", (req, res) => {
    res.redirect("/");
});




module.exports = router;