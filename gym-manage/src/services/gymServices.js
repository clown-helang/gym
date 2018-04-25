import request from '../utils/request';
import { baseURL } from '../utils/config';
import api from '../utils/api';
import md5 from 'md5';
import { getBytes } from '../utils';


export async function getMembers ({ payload }) {
  console.log(5555)

  return request({
    url: baseURL + api.getMembers,
    method: 'POST',
    params: payload,
  })
}
export async function getCoaches ({ payload }) {
  return request({
    url: baseURL+api.getCoaches,
    method: 'POST',
    params: payload,
  })
}
export async function getCoachById ({ payload }) {
  return request({
    url: baseURL + api.getCoachById,
    method: 'POST',
    params: payload,
  })
}
export async function getAdmins ({ payload }) {
  return request({
    url: baseURL+api.getAdmins,
    method: 'POST',
    params: payload,
  })
}
export async function getConsumeRecord ({ payload }) {
  return request({
    url: baseURL + api.getConsumeRecord,
    method: 'POST',
    params: payload,
  })
}
export async function getRechargeRecord ({ payload }) {
  return request({
    url: baseURL + api.getRechargeRecord,
    method: 'POST',
    params: payload,
  })
}
export async function getCourses ({ payload }) {
  return request({
    url: baseURL + api.getCourses,
    method: 'POST',
    params: payload,
  })
}
export async function getClassRecord ({ payload }) {
  return request({
    url: baseURL + api.getClassRecord,
    method: 'POST',
    params: payload,
  })
}
