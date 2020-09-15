const mysql  = require('mysql');
const config = require('../config.js');
const dataBase = 'test';
let connection = mysql.createConnection(config.mysql);
const sql = {
  createData: `CREATE TABLE ${dataBase}(
                       id INT NOT NULL AUTO_INCREMENT,
                       name VARCHAR(100) NOT NULL,
                       tel VARCHAR(100) NOT NULL,
                       gender VARCHAR(100) NOT NULL,
                       education VARCHAR(100) NOT NULL,
                       nationality VARCHAR(100) NOT NULL,
                       paypalAccount VARCHAR(100) NOT NULL,
                       birthday DATE,
                       creatTime DATETIME,
                       schData MEDIUMTEXT NOT NULL,
                       headerImg MEDIUMTEXT NOT NULL,
                       working MEDIUMTEXT NOT NULL,
                       language MEDIUMTEXT NOT NULL,
                       motivation VARCHAR(100) NOT NULL,
                       expectation VARCHAR(100) NOT NULL,
                       email VARCHAR(100) NOT NULL,
                       disc_d VARCHAR(100) NOT NULL,
                       disc_i VARCHAR(100) NOT NULL,
                       disc_s VARCHAR(100) NOT NULL,
                       disc_c VARCHAR(100) NOT NULL,
                       PRIMARY KEY ( id ))ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
  create: `INSERT INTO ${dataBase}(name,tel,gender,education,nationality,paypalAccount,birthday,creatTime, schData,headerImg,working,language,motivation,expectation,email, disc_d,disc_i,disc_s,disc_c)
           VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  deleteTable: `DROP TABLE ${dataBase}`,
  select: `SELECT * FROM ${dataBase}
          WHERE DATE_FORMAT(creatTime,'%Y%m%d%H%i%S') BETWEEN ? and ?
          LIMIT ? OFFSET ?;`,
  selectXlsx: `SELECT * FROM ${dataBase}
          WHERE DATE_FORMAT(creatTime,'%Y%m%d%H%i%S') BETWEEN ? and ?;`,
  selectXlsx0: `SELECT * FROM ${dataBase} WHERE to_days(creatTime) = to_days(now());`,
  selectXlsx1:`SELECT * FROM ${dataBase} WHERE to_days(NOW()) - TO_DAYS(creatTime) <= 2;`,
  selectXlsx2:`SELECT * FROM ${dataBase} WHERE date_sub(CURDATE(),INTERVAL 7 DAY) <= DATE(creatTime)`,
  selectXlsx3:`SELECT * FROM ${dataBase} WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= date(creatTime);`,
  selectXlsx4: `SELECT * FROM ${dataBase}`,
  selectXlsx5: `SELECT * FROM ${dataBase} WHERE ID = ?;`,
  selectToal: `SELECT COUNT(id) FROM ${dataBase};`
}

const __ = {
  testDelete(){
    connection = mysql.createConnection(config.mysql);
    connection.connect();
    connection.query(sql.deleteTable, function(err, results, fields) {
      if (err) {
        console.log(err)
      }else{
        console.log(results);
      }
    });
    connection.end();
  },
  initDataBase(success, fail){
    connection = mysql.createConnection(config.mysql);
    connection.connect();
    connection.query(sql.createData, function(err, results, fields) {
      if (err) {
        fail(err)
      }else{
        success(results);
      }
    });
    connection.end();
  },
  insetData(data, success, fail){
    connection = mysql.createConnection(config.mysql);
    connection.connect();
    // let todo = ['title', uilts.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")];
    connection.query(sql.create, data, function(err, results, fields) {
      if (err) {
        return fail(err)
        // console.log(err.message);
      }
      success(results);
    });
    connection.end();
  },
  catData(success, fail){
    connection = mysql.createConnection(config.mysql);
    connection.connect();
    connection.query(sql.selectXlsx4, function(err, results, fields) {
      if (err) {
        return fail(err);
        // console.log(err.message);
      }
      success(results);
      // console.log(results);
    });
    connection.end();
  },
  catDataPage(querySql, query ,success, fail){
    connection = mysql.createConnection(config.mysql);
    connection.connect(res=>{
    });
    connection.query(sql[querySql],query, function(err, results, fields) {
      if (err) {
        return fail(err);
        // console.log(err.message);
      }
      success(results);
      // console.log(results);
    });
    connection.end();
  },
  getCount(success ,fali){
    connection = mysql.createConnection(config.mysql);
    connection.connect();
    connection.query(sql.selectToal, function(err, results, fields) {
      if (err) {
        return fail(err);
        // console.log(err.message);
      }
      success(results);
      // console.log(results);
    });
    connection.end();
  }
}

module.exports = __;
