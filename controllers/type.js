var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql =require('mysql');

var db = require.main.require ('./models/db_controller');

var con = mysql.createConnection({

    host : 'localhost',
    user : 'root',
    password : 'root',
   database : 'bookingsystem'
 });

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());


router.post('/addroom',(req,res,next)=>{
    let type=req.body;
    query="insert into type(name)values(?)";
     con.query(query,[type.name],(err,results)=>{
         if(!err){
            req.flash('success', 'user succesfulyl registered')
            res.locals.mess = req.flash();
            res.redirect('/getroom')
           // res.render('admin/room.ejs',{list : results})
        }
         else{
            res.render('admin/room.ejs',{list : results})
        }
    })
})

router.get('/getroom',(req,res,next)=>{
    var query="select * from type order by id";
    con.query(query,(err,results)=>{
        if(!err){
            res.render('admin/room.ejs',{list : results})
       }
        else{
            return res.status(500).json(err);
       }
})
})
router.get('/edit_room/:id',function(req,res){
    var id = req.params.id;
    var query = "select * from type where id ='" +id+"'";
    con.query(query,[id],(err,results)=>{
    res.render('admin/editroom.ejs' ,{list : results});
        });
  });

router.post('/update_room/:id',(req,res,next)=>{
    let type=req.body;
    var query="update type set name=?where id=?";
    con.query(query,[type.name,type.id],(err,results)=>{
        if(!err){
           req.flash('success', 'user succesfulyl registered')
            res.locals.caden = req.flash();
            res.redirect('/getroom')
        }
            else{
                return res.status(500).json(err);
            }
})
    })   
    router.get('/delete_room/:id',function(req,res){
        var id = req.params.id;
        var query="delete from type where id=" + id;
    con.query(query,[id],(err,results)=>{
        req.flash('success', 'user succesfulyl registered')
        res.locals.cad = req.flash();
      //  res.render('admin/room.ejs',{list : results})
          res.redirect('/getroom')
           // res.render('admin/admin.ejs',{list:result})
        });
      });                          

 module.exports=router;   