var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require ('express-session');
var mysql =require('mysql');

var db = require.main.require ('./models/db_controller');
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());
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


router.post('/add_book',function(req,res){
  //db.findOne(req.body.email,function(err,results){
   // var id =results[0].id;
   // var id=req.body.id;
   //var id = req.params.id;
  //let startdate=req.body.start_date;
  // let starttime=req.body.start_time;
  // var starttime=req.body.starttime;
    
  //   query=`select * from book where start_date=? `;
  //  con.query(query,[startdate],(err,results,fields)=>{
   // db.checkbook(startdate, function(err, results) {
            // console.log(results)
            //  //if(results[0].id='1'){
            //   if(results.length >=0){
            //     console.log(results)
            //   return res.status(200).json({message:"Successfully Registered"})
            //  }
            //  else{
            //   return res.status(200).json({message:"already Registered"})
            //  }
                  
 // con.query("select * FROM book WHERE start_date=? AND start_time=?", [startdate,starttime], function (error, results, fields) {
    //if (results[0].start_date== startdate && results[0].start_time== starttime){
      //db.checkbook(start_date, function(err, results) {
      // if (results[0].start_date == startdate && results[0].start_time== starttime) {
      // req.flash('success', 'user succesfulyl registered')
      // res.locals.instal = req.flash();
      // console.log(results)
     // res.render('user.ejs',{list:res});
    //}else{
      var userid=req.session.userId
 db.addbook(req.body.type,req.body.start_date,req.body.end_date,req.body.start_time,req.body.end_time,req.body.reason,req.body.status,userid);
if(db.addbook){
    req.flash('success', 'user succesfulyl registered')
    res.locals.inst = req.flash();
    console.log('1 book inserted');
     res.render('user.ejs',{list:res});
}
    
});
//});



router.get('/view_list',function(req,res){
  //db.getDocBy(function(err, result1) {

    // db.getbookbyuser(function(err,result){
    //   if(err)
    //   throw err;
    //     res.render('view_list.ejs',{list : result})  
    
    var userid=req.session.userId
   // db.checkbook(userid, function(err, results) {
    con.query("select * FROM book WHERE userid='"+userid+ "'", function (error, results, next){
      res.render('view_list.ejs',{list : results})  
     //con.query("select * FROM book WHERE userid='"+userid+ "'  
  });
});

router.post('/search',function(req,res){
    var key = req.body.search;
   db.searchbook(key,function(err,result){
     console.log(result);
     if(err)
     throw err;
       // if(req.cookies['name'] == null){
          res.render('view_list.ejs',{list : result});
   //     }else{
       //   res.render('admin/admin.ejs',{list : result})
      //  }
   });
});
router.get("/back", (req, res) => {
  res.render("user",{list:res,res:res});
});   

module.exports = router;