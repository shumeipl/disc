const config = {
  mysql:{
    host     : '8.210.176.15',
    user     : 'fengmi_qust',
    password : 'CMjEkHyheKCfSX74',
    port: '3306',
    database: 'fengmi_qust'
  },
  server:{
    port: 8092,
    host:'127.0.0.1'
  },
  'userName': 'admin',
  'password': 'ab123456'
};

module.exports = config;
 // mysql -h 8.210.130.30 -u character_quest -p -P 3306

 // mysql -h 8.210.130.30 -u character_quest -p -P 3306
// mysql -h rm-j6c28qs9a46jm8jxb.mysql.rds.aliyuncs.com -P 3306 -u job_quest_user -p
// mysql -h 8.210.176.15 -P 3306 -u job_quest_user -p
// mysql –u job_quest_user –p
// set password for ‘job_quest_user’@‘localhost’=password('fengmi123');
// flush privileges;
// update user set authentication_string=password("fengmi123") where user="job_quest_user";
