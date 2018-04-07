import request from '../utils/request';
import config from '../utils/config';
import md5 from 'md5';
import { getBytes } from '../utils';
const { baseURL,api } = config;

export async function login ({ payload }) {
  return request({
    url: baseURL+api.userLogin,
    method: 'POST',
    params:{
      account: payload.account,
      password: md5(getBytes(payload.password)),
      device_type: "pc-web"
    },
  })
}
export async function changePasswd ({ payload }) {
  return request({
    url: baseURL+api.changepasswd,
    method: 'PUT',
    params:payload,
  })
}
export async function getPermissions ({ payload }) {
  return request({
    url: baseURL+api.permissions,
    method: 'GET',
    params:payload,
  })
}
export async function queryUserById ({ payload }) {
  return request({
    url: baseURL+api.queryUsers,
    method: 'GET',
    params:{
      token:payload.token
    },
  })
}
export async function editUser ({ payload }) {
  return request({
    url: baseURL+api.Users,
    method: 'PUT',
    params:payload,
  })
}
