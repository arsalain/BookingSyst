var mysql = require('mysql');
var express = require('express');
var router= express. Router();

var con = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root',
database: 'bookingsystem'
});

con.connect(function(err) {
if(err) {
throw err;
}else{
console.log('Connected')
}
})
module.exports.adduser = function (
  role,
  id,
  name,
  email,
  password,
  callback
) {
  var query =
    "INSERT INTO `user`(`role`,`id`,`name`,`email`,`password`) values ('" +
    role +
    "','" +
    id +
    "','" +
    name +
    "','" +
    email +
    "','" +
    password +
    "')";
  con.query(query, callback);
  console.log(query);
};
module.exports.checkpassword = function (password, callback) {
    var query = "select *from user where  password='"+password+"'";
    con.query(query, callback);
    console.log(query);
  };
  module.exports.findOne = function (email, callback) {
    var query = "select *from user where email='" + email + "'";
    con.query(query, callback);
    console.log(query);
  };
module.exports.setpassword = function (id, newpassword, callback) {
    var query =
      "update user set password='" + newpassword + "' where id='"+id+"'";
    con.query(query, callback);
    console.log(query);
  };
  module.exports.getuser = function (callback) {
    var query = "select * from user";
    con.query(query, callback);
  };
  module.exports.checkbook = function (userId, callback) {
    var query = "select * from book where  userid='"+userId+"'";
    con.query(query, callback);
    console.log(query);
  };
  module.exports.addbook = function (
    type,
    start_date,
    end_date,
    start_time,
    end_time,
    reason,
    status,
    userid,
    callback
  ) {
    var query =
      "INSERT INTO `book`(`type`,`start_date`,`end_date`,`start_time`,`end_time`,`reason`,`status`,`userid`) values ('"+
      type +
      "','" +
      start_date +
      "','" +
      end_date +
      "','" +
      start_time +
      "','" +
      end_time +
      "','" +
      reason +
      "','"+ 
      status + 
      "','"+
       userid + "')";
    con.query(query, callback);
    console.log(query);
  };

  module.exports.gettype = function (callback) {
    var query = "select * from type";
    con.query(query, callback);
  };
  module.exports.getallbook = function (callback) {
    var query = "select * from book where status!='"+undefined+"'";
    con.query(query, callback);
  };
  module.exports.setstatus = function (id, status, callback) {
    var query =
      "update book set status='" + status + "' where id="+id;
    con.query(query, callback);
    console.log(query);
  };
  module.exports.searchbook = function (key, callback) {
    var query = 'SELECT  *from book where type like "%' + key + '%"';
    con.query(query, callback);
    console.log(query);
  };
  module.exports.getbookbyun = function (callback) {
    var query = "select * from book where status='"+undefined+"'";
    con.query(query, callback);
  };
  module.exports.getbookbyuser = function (callback) {
    var query = "select * from book where isuser='"+true+"'";
    con.query(query, callback);
  };
  module.exports.getBookbyId = function (id, callback) {
    var query = "select * from book where id ='" +id+"'";
    con.query(query, callback);
  };
  module.exports.updatebook = function (
    id,
    type,
    start_date,
    end_date,
    start_time,
    end_time,
    reason,
    callback
  ) {
    var query =
      "update book set type='"+
      type +
      "',start_date='" +
      start_date +
      "',end_date='" +
      end_date +
      "',start_time='" +
      start_time +
      "',end_time='" +
      end_time +
      "',reason='" +
      reason +
      "' where id="+id;
    con.query(query, callback);
    console.log(query);
  };
  module.exports.deletebookbyId = function (id, callback) {
    console.log("i m here");
    var query = "delete from book where id=" + id;
    con.query(query, callback);
  };
  module.exports.getuserbyId = function (id, callback) {
    var query = "select * from user where id ='" +id+"'";
    con.query(query, callback);
  };
  module.exports.updateuser = function (
    role,
    id,
    name,
    email,
    password,
    callback
  ) {
    var query =
      "update user set role='"+
      role +
      "',id='" +
      id +
      "',name='" +
      name +
      "',email='" +
      email +
      "',password='" +
      password +
      "' where id="+id;
    con.query(query, callback);
    console.log(query);
  };
  module.exports.deleteuserbyId = function (id, callback) {
    console.log("i m here");
    var query = "delete from user where id=" + id;
    con.query(query, callback);
  };
//module.exports=con;
//global.db = db;