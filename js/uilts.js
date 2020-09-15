const config = require('../config.js');
const crypto = require('crypto');
const xlsx = require('node-xlsx')
const path = require('path');
const fs = require('fs')
const word = require('./word.js');
const uilts = {
  token: '',
  formatDate: (date, fmt) => {
    let padLeftZero = (str) => {
      return ('00' + str).substr(str.length);
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  },
  curry: (fn) => {
    return function fn1(...a){
      if(arguments.length >= fn.length)return fn(...a)
      return function(...b){
        return fn1(...a.concat(b))
      }
    }
  },
  compose: (...a) => {
     a.reverse();
     return function(v){
       return f(a, v)()
     }
     function f(arr, v){
       var i = 0;
       var d = v;
       return function c(){
         if(i >= arr.length)return d;
         return (d = arr[i](d),i++, c());
       }
     }
   },
  runOnce: (fn, context) => {
      return function () {
          fn.apply(context || this, arguments);
          runOnce = null;
      }
  },
  CalculationDISC: (arr) => {
     let datas = {
       d: 0,
       i: 0,
       s: 0,
       c: 0
     },
     map = {
       '0': 'd',
       '1': 'i',
       '2': 's',
       '3': 'c'
     }
     arr.forEach(el => {
       datas[map[el]]++;
     });
     return {
       d2: datas,
       d1: [datas.d, datas.i,datas.s, datas.c]
     };
     //
  },
  resumeData: data => {
     let {name, tel, gender, birthday, education, nationality,
       paypalAccount,email, disc, schoolData,headerImg,working,language
      ,motivation,expectation} = data;
     let creatTime = uilts.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
     let arr = [name, tel, gender, education, nationality, paypalAccount, birthday, creatTime,JSON.stringify(schoolData),
              JSON.stringify(headerImg.type),JSON.stringify(working),
              JSON.stringify(language),motivation,expectation,email ];
     let _disc = uilts.CalculationDISC(JSON.parse(disc))
     return {
       d1: arr.concat(_disc.d1),
       d2: _disc.d2,
       img: headerImg.base64
     };
     // JSON.stringify(schoolData)
  },
  creatToken: (name,password) => {
    uilts.token = uilts.createMd5(name) + password + new Date().getTime();
    return uilts.token;
  },
  createMd5: (val)=>{
    const md5 = crypto.createHash('md5');
    return md5.update(val).digest('hex');
  },
  RegLogin: (name, pwd) => {
    let _pwd = uilts.createMd5(pwd);
    let password = uilts.createMd5(config.password)
    if(name != config.userName || _pwd != password) return false;
    return {
      token: uilts.creatToken(name, password)
    }
  },
  writeXls: datas => {
    return new Promise(function(resolve, reject){
      let buffer = xlsx.build([
          {
              name:'sheet1',
              data:datas
          }
      ]);
      fs.writeFile('./down/disc.xlsx',buffer,{'flag':'w'},(res, err) => {
        if(err)reject(err);
        resolve()
      });
    });
  },
  log: str => {
    console.log(str + ' --- ', uilts.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'));
  },
  resxlsxData: rows => {
    let data = []
    let genders = val => {
      if(val == '1') return '男';
      return '女'
    }
    let formatDateTime = time => {
      if (time == null || time === ''|| time === '0000-00-00') {
        return 'N/A';
      }
      let date = new Date(time);
      return uilts.formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
     let title = ['编号','姓名','性别','电话','生日','添加时间','国籍','学历','paypal账号','DISC']
     data.push(title)
     rows.forEach((element) => {
         let arrInner = []
         arrInner.push(element.id)
         arrInner.push(element.name)
         arrInner.push(genders(element.gender))
         arrInner.push(element.tel)
         arrInner.push(formatDateTime(element.birthday))
         arrInner.push(formatDateTime(element.creatTime))
         arrInner.push(element.nationality)
         arrInner.push(element.education)
         arrInner.push(element.paypalAccount)
         arrInner.push(element.disc_d+'|'+element.disc_i+'|'+element.disc_s+'|'+element.disc_c)
         data.push(arrInner)//data中添加的要是数组，可以将对象的值分解添加进数组，例如：['1','name','上海']
     });
     return uilts.writeXls(data)
  },
  paramsInit: params => {
    let {page, size, sdate, edate} = params;
    sdate = uilts.formatDate(new Date(sdate+' 00:00:00'), "yyyyMMddhhmmss");
    edate = uilts.formatDate(new Date(edate+' 23:59:59'), "yyyyMMddhhmmss");
    page = page-1;
    page = page * size;
    size = size-0;
    return [sdate,edate,size,page];
    // sdate = sdate
  },
  resData: (arr, count) => {
    let _listArr = [];
    arr.forEach(el => {
      _listArr.push({
        id: el.id,
        name:el.name,
        tel: el.tel,
        gender: el.gender,
        education:el.education,
        nationality:el.nationality,
        paypalAccount:el.paypalAccount,
        birthday: el.birthday == '0000-00-00'?'':el.birthday,
        creatTime:el.creatTime,
        email:el.email,
        disc_d:el.disc_d,
        disc_i:el.disc_i,
        disc_s:el.disc_s,
        disc_c:el.disc_c
      });
    });
    return {
      list: _listArr,
      count:count
    }
    // {code: 200, data:{list:_listArr,count:count,page:page,size:size}};
  },
  sqlQuery: (fn) => {
    return fn(uilts.paramsInit, uilts.resData);
  },
  getXlsxData: (fn) => {
    return fn(uilts.resxlsxData);
  },
  getlang: lang => {
    let datas = {
      en: {
        work:{
          Title: 'Title',
          Department: 'Department',
          Report:'Report',
          Subordinates:'Subordinates',
          Responsibilities: 'Responsibilities'
        },
        package:{
          Expectation: 'Expectation',
          motivation: 'Job-hopping motivation',
          Language: 'Language Ability'
        },
        list_info:{
          name:'name',
          gender: 'gender',
          Birthday: 'Birthday',
          Education:'Education',
          Nationality:'Nationality',
          Tel: 'Tel',
          Email: 'Email',
          Paypal: 'Paypal Account'
        }
      },
      zh:{
        work:{
          Title: '职称',
          Department: '部门',
          Report:'报告对象',
          Subordinates:'下属',
          Responsibilities: '职责'
        },
        package:{
          Expectation: '期望薪资/月',
          motivation: '离职原因',
          Language: '语言能力'
        },
        list_info:{
          name:'姓名',
          gender: '性别',
          Birthday: '生日',
          Education:'学历',
          Nationality:'国籍',
          Tel: '电话',
          Email: '邮箱',
          Paypal: 'Paypal 账号'
        }
      }
    }

    return datas[lang];
  },
  wordInit: (data, res, err) => {
    let langData = uilts.getlang(data.lang);
    let initWork = work => {
      let arr = [];
      work.forEach((el, idx) => {
         arr.push({
            company:el.e_sTime+'                 '+el.company,
            Title: langData['work']['Title']+': ' + el.title,
            Department: langData['work']['Department']+': ' +el.department,
            Report: langData['work']['Report']+': ' + el.Report,
            Subordinates: langData['work']['Subordinates']+': '+el.subordinates,
            Responsibilities: langData['work']['Responsibilities']+':',
            List: splits(el.responsibilities)
          });
      });
      return arr
    }
    let splits = d => {
      return d.split(';');
    }
    try{
      let project = {
        package: [
          {
             Expectation: langData['package']['Expectation']+': ' + data.expectation,
             motivation: langData['package']['motivation']+'：' + data.motivation,
             Language: langData['package']['Language']+'',
             Language_List: JSON.parse(data.language)
           }
        ],
        list_info: [
         langData['list_info']['name']+' : ' + data.name ,
         langData['list_info']['gender']+' : '+ data.gender,
         langData['list_info']['Birthday']+' : '+ data.birthday,
         langData['list_info']['Education']+' : '+ data.education,
         langData['list_info']['Nationality']+' : '+ data.nationality,
         langData['list_info']['Tel']+' : '+ data.tel,
         langData['list_info']['Email']+' : '+ data.email,
         langData['list_info']['Paypal']+' : '+ data.paypalAccount
        ],
        working: initWork(JSON.parse(data.working)),
        people: JSON.parse(data.schData)
      }
      word({
        data: project,
        name: data.name
      },res, err);
    }catch(e){
      err(e)
    }
    // console.log(project,project.working[0].List)
    return false;
  },
  saveImg: (data, pathUrl, res, err) => {
    var base64Data = data.img.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFile(path.join(__dirname, '../word/'+pathUrl+'/'+data.name+'.png'), dataBuffer, function(err) {
        if(err){
          return err(err)
        }
        res()
    });
  },
  regToken: value => {
    return new Promise(function(resolve, reject){
      if(value.toString() === uilts.token.toString())resolve();
      reject();
    });
  }
}
module.exports = uilts;
