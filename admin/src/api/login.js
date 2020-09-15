import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/web/login',
    method: 'post',
    headers : {
         "Content-Type":'application/json'
     },
    data: JSON.stringify({
      username,
      password
    })
  })
}

export function getList(params) {
  return request({
    url: '/web/getList',
    method: 'get',
    params: params
  })
}

export function getXlsx(params) {
  return request({
    url: '/web/getXlsx',
    method: 'post',
    headers : {
         "Content-Type":'application/json'
     },
    data: JSON.stringify(params)
  })
}
