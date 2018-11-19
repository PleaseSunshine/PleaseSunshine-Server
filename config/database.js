var mysql = require('mysql');

// var connection=mysql.createConnection({
//     host:'root.cpgtkojuz64e.ap-northeast-2.rds.amazonaws.com',
//     user:'root',
//     password:'HEaaFCG7mrsUc6c',
//     port: 3306,
//     database:'root',
//     minInterval : 200,
//   });
  
//   connection.connect(function(error){
//     if(!!error){
//       console.log(error);
//     }else{
//       console.log('Connected!:)');
//     }
//   });
// module.exorts=connection;

module.exports = {
  host        : 'root.cpgtkojuz64e.ap-northeast-2.rds.amazonaws.com',
  port        : 3306,
  user        : 'root',
  password    : 'HEaaFCG7mrsUc6c',
  database    : 'innodb',
  serverId    : 256,
  minInterval : 200,
  acquireTimeout: 300,
  connectionLimit: 100,
  connectTimeout: 2000,
  queueLimit: 0,
  debug: true,
  waitForConnection: true,
  dateStrings: true
}; 


