import request from '../utils/request';
import { baseURL } from '../utils/config';
import api from '../utils/api';
import md5 from 'md5';
import { getBytes } from '../utils';


export async function getMembers ({ payload }) {
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
export async function getMembersById ({ payload }) {
  return request({
    url: baseURL + api.getMembersById,
    method: 'POST',
    params: payload,
  })
}
export async function rechargeMoney ({ payload }) {
  return request({
    url: baseURL + api.rechargeMoney,
    method: 'POST',
    params: payload,
  })
}
export async function getCoachKPI ({ payload }) {
  return request({
    url: baseURL + api.getCoachKPI,
    method: 'POST',
    params: payload,
  })
}
export async function changeUserType ({ payload }) {
  return request({
    url: baseURL + api.changeUserType,
    method: 'POST',
    params: payload,
  })
}
export async function changeClassIsShop ({ payload }) {
  return request({
    url: baseURL + api.changeClassIsShop,
    method: 'POST',
    params: payload,
  })
}
export async function uploadImages ({ payload }) {
  return request({
    url: baseURL + api.uploadImages,
    method: 'POST',
    params: payload,
  })
}
export async function addNewCourse ({ payload }) {
  return request({
    url: baseURL + api.addNewCourse,
    method: 'POST',
    params: payload,
  })
}
export async function getCourseById ({ payload }) {
  return request({
    url: baseURL + api.getCourseById,
    method: 'POST',
    params: payload,
  })
}
