import request from '../utils/request';
import { baseURL } from '../utils/config';
import api from '../utils/api';
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
export async function setClassOver ({ payload }) {
  return request({
    url: baseURL + api.setClassOver,
    method: 'POST',
    params: payload,
  })
}
export async function getCourseByTeacherId ({ payload }) {
  return request({
    url: baseURL + api.getCourseByTeacherId,
    method: 'POST',
    params: payload,
  })
}
export async function appointClass ({ payload }) {
  return request({
    url: baseURL + api.appointClass,
    method: 'POST',
    params: payload,
  })
}
export async function cancelAppointClass ({ payload }) {
  return request({
    url: baseURL + api.cancelAppointClass,
    method: 'POST',
    params: payload,
  })
}
export async function teacherComment ({ payload }) {
  return request({
    url: baseURL + api.teacherComment,
    method: 'POST',
    params: payload,
  })
}
export async function studentComment ({ payload }) {
  return request({
    url: baseURL + api.studentComment,
    method: 'POST',
    params: payload,
  })
}
export async function buyClass ({ payload }) {
  return request({
    url: baseURL + api.buyClass,
    method: 'POST',
    params: payload,
  })
}

export async function getGroupClassSchedule ({ payload }) {
  return request({
    url: baseURL + api.getGroupClassSchedule,
    method: 'POST',
    params: payload,
  })
}

export async function appointGroupClass ({ payload }) {
  return request({
    url: baseURL + api.appointGroupClass,
    method: 'POST',
    params: payload,
  })
}

export async function cancelAppointGroupClass ({ payload }) {
  return request({
    url: baseURL + api.cancelAppointGroupClass,
    method: 'POST',
    params: payload,
  })
}

export async function addRestTime ({ payload }) {
  return request({
    url: baseURL + api.addRestTime,
    method: 'POST',
    params: payload,
  })
}

export async function addAskForLeave ({ payload }) {
  return request({
    url: baseURL + api.addAskForLeave,
    method: 'POST',
    params: payload,
  })
}
export async function getTeacherDisableTime ({ payload }) {
  return request({
    url: baseURL + api.getTeacherDisableTime,
    method: 'POST',
    params: payload,
  })
}
export async function teacherOverGroupClass ({ payload }) {
  return request({
    url: baseURL + api.teacherOverGroupClass,
    method: 'POST',
    params: payload,
  })
}
export async function groupClassTeacherComment ({ payload }) {
  return request({
    url: baseURL + api.groupClassTeacherComment,
    method: 'POST',
    params: payload,
  })
}
export async function changeUserInfor ({ payload }) {
  return request({
    url: baseURL + api.changeUserInfor,
    method: 'POST',
    params: payload,
  })
}

export async function getAllClassScheduleByTime ({ payload }) {
  return request({
    url: baseURL + api.getAllClassScheduleByTime,
    method: 'POST',
    params: payload,
  })
}






