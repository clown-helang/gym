import fetch from 'dva/fetch';
import { getSession } from './index.js'
function checkStatus(response) {
  if (response.status == 200) {
    return response.json();
  }else if(response.status == 204) {
    return 204;
  }else{
    return response.text().then(res => {
      const result = JSON.parse(res);
      if(result.code){
        return Promise.reject(result.code);
      }else{
        const error = new Error(response.status);
        error.response = response;
        return Promise.reject(error);
      }
    });
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(arr) {
  //增加options的封装
  let options = {
    method: arr.method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json;charset=utf-8",
      "Authorization": getSession('token')
    }
  };
  // if(arr.params.token){
  //   options.headers.Authorization = 'Bearer '+arr.params.token;
  //   delete arr.params.token;
  // }
  let real_url = arr.url;
  if(arr.method=='POST'||arr.method=='PUT'){
      if(arr.body!=undefined&&arr.body){
        options.body = JSON.stringify(arr.body);
      }else{
        let formData = ''
        for(let key in arr.params){
          formData += key +'='+ arr.params[key] + '&'
        }
        formData = formData.substr(0,formData.length-1);
        options.body = formData;
      }
  }else{
    real_url = real_url + '?';
    for(let key in arr.params){
      real_url += key + '=' + arr.params[key] + '&';
    }
    real_url = real_url.substr(0,real_url.length-1);
  }
  return fetch(real_url, options)
    .then(checkStatus);
}
