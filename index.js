var express =require('express');
var session = require('express-session');
var cookie = require('cookie-parser');
var path = require('path');
var ejs = require( 'ejs');
var flush=require('connect-flash');
//var multer =require('multer');
//var async =require('async');
//var nodemailer = require('nodemailer');
//var crypto = require('crypto');
//var expressValidator = require('express-validator');
//var sweetalert = require('sweetalert2');
var bodyParser = require('body-parser');
const http =require('http');
var db=require('./models/db_controller');
var change=require('./controllers/changepassword')
var user=require('./controllers/user');
var view_list = require('./controllers/viewlist');
var admin=require('./controllers/admin');
var type=require('./controllers/type');
var app=express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const server=http.createServer(app);






//app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookie());

app.use(session({
    secret: 'secret',
    cookie: { maxAge : 60000},
    resave: false,
    saveUninitialized: false
    }));
app.use(flush());

const PORT = process.env.PORT || 3000
server.listen (PORT, ()=>console.log(`server running on port ${PORT}`))

app.use('/',user);
app.use('/',change);
app.use('/', view_list);
app.use('/',admin);
app.use('/',type);

module.exports = app;