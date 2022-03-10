
const express = require('express')

const bodyParser = require('body-parser');
const config = require('./config.js');
const sql = require('./js/sql.js');
const url = require('url');
const uilts = require('./js/uilts.js');
const jsonParser = bodyParser.json()
const app = express();
// sql.connection();

const routes = express.Router();
app.use("/web", express.static('web'))
app.use("/link", express.static('down'))
app.use("/admin", express.static('admin/dist'))
app.use("/web", routes);
app.use("/admin", routes);

// sql.testDelete();
sql.initDataBase(res=>{
  console.log('----------已创建表------------')
}, err=>{
  console.log('---------------------表存在-----------------')
});
// const datas_ds = {
//         schoolData: ['wqewq','qweqwe','qweqssa','2020-08-03--2020-08-08'],
//         working: [
//           {
//             company: 'wqewq',
//             title: 'qweqw',
//             e_sTime: '2020-08-07',
//             e_eTime: '2020-08-26',
//             department: 'qweqe',
//             responsibilities: 'wqewqe;qweqwe;fsfdsf;rtyryr;iugyufhj',
//             Report: 'adwqeqw',
//             subordinates: 'ada'
//           }
//         ],
//         headerImg: {
//           type: 'jpeg',
//           base64: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCABCAEIDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAYDBAUCBwH/xAAxEAACAgECBAQDBwUAAAAAAAABAgADBAUREiExUQYTQXEjgaEUIjJSYXKRMzQ1wdH/xAAZAQEBAAMBAAAAAAAAAAAAAAAEBQABAwL/xAAkEQACAgIDAAIBBQAAAAAAAAABAgADBBESITEiURMyQWGB0f/aAAwDAQACEQMRAD8A8/ljCwr867ysdCx9T6D3MMDDsz8tKKurdT6KO8fMHCpwMdaaF2A6n1Y9zEU0mw7PkLkZAqGh7MrB8MYtIDZTG9+w5KJrVYWLSNq8epfZBJ4Sgtar4JJe13/UZG+NRYNnprYfqoMzsvw9gZIJSvyH9DX0/ibBrdV4ijAdyJxNlFb0TSu6Ho6iJqej5OnHiccdXpYvT59pnT0uxFsRksUMrDYgjkYk67pJ07ID17nHsP3T+U9oC+jh8l8lTGyvyfFvZlQhCFjY4+FsIUYH2hh8S87+yjpGinS8q6pbEVeFhuN2mdi1irFqrHREC/SN+nf2FH7BKNjGmsBZIqQZFrFovWYGRXkLQVDWMNwFO/KbGFplWIvm3lWsHPc9FkuVh2WZC5GPb5doHCdxuCJyMB7mDZt5t26IvJZye7mo2dRCY4rY6Xf19SejKx8oulTh+HqNpDkaTi37kJ5bd05fSc5mGV4cjDUJbUPwgcmHaWcTJTLpFicj0ZexnHtRyQzv054WDuY1uh3q3w3R1/XkZi6tgfaMa/EtADdAezDoY9RV1H/IX/uMTRa1m1aCyaVpAZPueVMpVirDYg7EQjXk6LVbk22Efict/JhOBx2ixlJqb1TB6kYdGUGNGLkVUaXVY7jZUG+3X2iN4eyxlaVUN/v1fDYe3T6TXoda70d141Ugle8Y6C5AZPrsNFhH9Riq1HisRbqHpWz8DN0Muykr4uqY/MDfmArHmDIqci7A2py1LVDYLco5D3gSm/Bo/UpLYV7Y7B/f/ZpzNy6nwrzmY43Q/wBVB6/rNGV8nNx8cL5rjZ+m3Oeayd9Dc92hSuydfzJarUtqWxGBVhyMWNRIOfeQdxxGRXOGsby9xXxEqpPSQX3JRQ91h2VFLGPqpFZLbku/INwC6lC3PqS11LjdWIhEq7IsuvstLEF2LH5mEOckxYwhrsy7oepHTszd9/Js5WD/AH8o8o6ugdGDKw3BHqJ5pNbSNcu074dgNuP+Xfmvt/yaov4fFvJmVjfk+S+x5qtemwWVsVYdCJbv1O7IxhRaARuOJh1aZGHqOLnJvj2qx9VPJh8pajuKvppN5Om18l7I1a+0/CJqTh4eEHf6yjCRX5FONWXvsWtR6sdptVVB11NM72Hs7ksVfE+qiw/YaG3UH4pHqe0NW8Sm1WpwN1U8jaeRPt2i51g77wRxWUMXFIPN4QhCClGEIQmTJ9BKkFSQR0IjFouVkPX9++1vdyYQisb2Cy/BLupZFyUsUusU7ejERSttstcta7O3djuYQnvJ8nPD9nEIQgpRhCEJkyf/2Q=='
//         },
//         expectation: '342423',
//         motivation: 'sasadweqw',
//         language: [ 'wqoij', 'kjhjad', 'oiuhi' ],
//         name: 'wqiugiq',
//         tel: '28764287t',
//         gender: '0',
//         email: 'awdwqd@qq.com',
//         birthday: '',
//         education: '',
//         nationality: '',
//         paypalAccount: '',
//         disc: '["1","0","0","3","3","0","3","0","1","2","0","2","2","2","2","1","2","3","2","2","3","3","2","3","2","2","2","0","1","3","2","1","0","2","3","0","1","1","1","2"]'
//       }
// var result = uilts.resumeData(datas_ds);
// uilts.saveImg({
//   img: result.img,
//   name: result.d1[0]
// }, 'user', res => {
//   sql.catDataPage('create',result.d1, res => {
//     sql.catDataPage('selectXlsx5',[res.insertId], elres => {
//       console.log(elres[0])
//     },err => {
//       console.log(err.message, new Date(),'---------------')
//     });
//     // console.log(res, res.insertId)
//   },err => {
//     console.log(err.message, new Date(),'---------------')
//   });
// }, err => {
//   res.send(JSON.stringify({code: 401, message: err.message}))
// });




// sql.catDataPage('select',[ '20200814000000', '20200814235959', 10, 0 ] ,res => {
//   // console.log(res, res['COUNT(id)'], res['id'])
//   // let str = res[0].toString().split("'COUNT(id)':")
//   // console.log(str)
//   // console.log(JSON.parse(res))
//   console.log(res)
//   // console.log(res[0],res,res[0]['COUNT(id)'])
// }, err => {
//   console.log(err)
// })
// sql.catDataPage('selectXlsx4', [],result => {
//   console.log(result)
//   // res.send(JSON.stringify({code: -1, message: err.message}))
// }, err => {
//   // res.send(JSON.stringify({code: -1, message: err.message}))
// })

// console.log(uilts.formatDate(new Date(), "yyyyMMddhhmmss"))
// sql.catDataPage(['2020-08-13 00:00:00','2020-08-15 00:00:00',35,0] ,res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })
// sql.catDataPage([35,0] ,res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })
// var sjon = {
//   birthday: ""
//   ,disc: '["0","1","2","2","0","2","0","1","2","2","1","3","3","1","3","0","2","2","3","2","2","2","3","2","2","3","2","2","2","0","1","3","1","2","3","2","2","2","1","0"]'
//   ,education: ""
//   ,email: ""
//   ,gender: "1"
//   ,name: "test001"
//   ,nationality: ""
//   ,paypalAccount: ""
//   ,tel: "15598765432"
// }
// var result = uilts.resumeData(sjon);
// sql.catDataPage('create',result.d1, res => {
//   console.log(res, res.insertId)
// },err => {
//   console.log(err.message, new Date(),'---------------')
// });

// console.log(423)
// sql.catDataPage('selectXlsx4', [],result => {
//   console.log(result)
//   // res.send(JSON.stringify({code: -1, message: err.message}))
// }, err => {
//   console.log(err)
//   // res.send(JSON.stringify({code: -1, message: err.message}))
// })


routes.get('/getList', (req, res) => {
    uilts.log('/getList')
    let  params = url.parse(req.url, true).query;
    let headers = req.headers.authorization;
    uilts.regToken(headers).then(olve => {
      uilts.sqlQuery((paramsInit,resData) => {
        let query = paramsInit(params);
        sql.catDataPage('select', query ,result => {
          sql.catDataPage('selectToal', [],response => {
            let data = resData(result, response[0]['COUNT(id)']);
            data['page'] = params.page;
            data['size'] = params.size;
            res.send(JSON.stringify({code: 200, data: data}));
          }, err => {
            res.send(JSON.stringify({code: -1, message: err.message}))
          })
        }, err => {
          res.send(JSON.stringify({code: -1, message: err.message}))
        })
      });
    }, ject => {
      res.send(JSON.stringify({code: 401, message: '请重新登陆'}))
    });

});

routes.post('/getXlsx',jsonParser, (req, res) => {
  uilts.log('/getXlsx')
    let result = req.body;
    let headers = req.headers.authorization;
    console.log(headers)
    // res.send(JSON.stringify({code: -1, message: '正在调试'}));
    uilts.regToken(headers).then( olve => {
      uilts.saveImg(result, 'disc', dres => {
        sql.catDataPage('selectXlsx5',[result.id], elres => {
          let resultData = elres[0];
          resultData['lang'] = result.lang;
          uilts.wordInit(resultData, respons => {
            res.send(JSON.stringify({code: 200, data: {
              url:'/link/'+respons+'.docx',
              name: respons+'.docx'
            }}))
          }, err => {
            res.send(JSON.stringify({code: -1, message: err.message}))
          })
        },err => {res.send(JSON.stringify({code: -1, message: err.message}))
        });
      }, err => {
        res.send(JSON.stringify({code: 401, message: err.message}))
      });
      // uilts.getXlsxData((resData) => {
      //   sql.catDataPage('selectXlsx'+params.time, [] ,result => {
      //     resData(result).then(response => {
      //       res.send(JSON.stringify({code: 200, data: '/link/disc.xlsx'}))
      //     }, err => {
      //       res.send(JSON.stringify({code: -1, message: err.message}))
      //     });
      //   }, err => {
      //     res.send(JSON.stringify({code: -1, message: err.message}))
      //   })
      // })
    }, ject => {
      res.send(JSON.stringify({code: 401, message: '请重新登陆'}))
    })

});

routes.post('/resume',jsonParser, (req, res) => {
    //解析参数
    uilts.log('/resume')
    try{
      // console.log(req.body)
      var result = uilts.resumeData(req.body);
      var user = result.d2;
      user.name = req.body.name;
      var response = { code: 200, data: user };

      // res.end();
      uilts.saveImg({
        img: result.img,
        name: result.d1[0]
      }, 'user', abs => {
        sql.catDataPage('create',result.d1, ronspon => {
          response['insertId'] = ronspon.insertId;
          res.send(JSON.stringify(response));
          // sql.catDataPage('selectXlsx5',[ronspon.insertId], elres => {
          //   console.log(elres[0])
          //   response['insertId'] = ronspon.insertId;
          //   res.send(JSON.stringify(response));
          // },err => {res.send(JSON.stringify({code: -1, message: err.message}))
          // });
          // console.log(res, res.insertId)
        },err => {
          res.send(JSON.stringify({code: -1, message: err.message}))
        });
      }, err => {
        res.send(JSON.stringify({code: -1, message: err.message}))
      });
      // sql.catDataPage('create',result.d1, result => {
      //   response['insertId'] = result.insertId;
      //   res.send(JSON.stringify(response));
      // },err => {
      //   console.log(err.message, new Date(),'---------------')
      // });


    }catch(err){
      res.send(JSON.stringify({code: -1, message: err.message}));
      // res.end();
    }
});

routes.post('/login',jsonParser, (req, res) => {
    //解析参数
    uilts.log('/login')
    try{
      let peram = req.body;
      var result = uilts.RegLogin(peram.username, peram.password);
      var user = { code: 200, data: result };
      if(!result) {
        user['code'] = -1;
        user['message'] = '用户名密码错误';
      }
      res.send(JSON.stringify(user));
      // res.end();
    }catch(err){
      res.send(JSON.stringify({code: -1, message: err.message}));
      // res.end();
    }
});

const server = callback => {
  app.listen(config.server.port, config.server.host, (err) => {
      if (err) {
          console.log(err)
      } else {
          console.log(`服务开启成功【端口号:${config.server.port}】`)
      }
  });
}
server();
