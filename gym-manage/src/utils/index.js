function setSession(_key,_value){
  sessionStorage.setItem(_key, JSON.stringify(_value));
}

function getSession(_key){
  return JSON.parse(sessionStorage.getItem(_key));
}

function setLocalStorage(_key,_value){
  localStorage.setItem(_key, JSON.stringify(_value));
}

function getLocalStorage(_key){
  return JSON.parse(localStorage.getItem(_key));
}

function getBytes(_str){
  var bytes = [];
  for(var i=0;i<_str.length;i++){
    bytes[i] = _str.charCodeAt(i);
  }
  return bytes;
}
function compareLength(rule, value, callback){
  if (value) {
    let len;
    if (value == null)
    {
      len=0;
    }
    if (typeof value != "string"){
      value += "";
    }
    len = value.replace(/[^\x00-\xff]/g,"01").length;
    if (len>rule.len){
      callback(rule.message);
    }else{
      callback();
    }
  }else{
    callback();
  }
}
function get_length(s){ //获取字符串长度 中文占一个 英文占0.5个
  if(s===undefined)return 0;
  var char_length = 0;
  for (var i = 0; i < s.length; i++){
    var son_char = s.charAt(i);
    if(son_char == ' '){
      char_length += 0.5;
    }else{
      encodeURI(son_char).length > 2 ? char_length += 1 : char_length += 0.5;
    }
  }
  return char_length;
}
function isTrue(value) {
  return (value!==undefined&&value!==''&&value!==null);
}
function cut_str(str, len){//截取字符串 从str 中截取len 个字符，中文占一个 英文占0.5个
  var char_length = 0;
  for (var i = 0; i < str.length; i++){
    var son_str = str.charAt(i);
    if(son_str == ' '){
      char_length += 0.5;
    }else{
      encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
    }
    if (char_length >= len){
      var sub_len = char_length == len ? i+1 : i;
      return str.substr(0, sub_len);
      break;
    }
  }
}
//去掉左边的空白
function trimLeft(s){
  if(s == null) {
    return "";
  }
  var whitespace = new String(" \t\n\r");
  var str = new String(s);
  if (whitespace.indexOf(str.charAt(0)) != -1) {
    var j=0, i = str.length;
    while (j < i && whitespace.indexOf(str.charAt(j)) != -1){
      j++;
    }
    str = str.substring(j, i);
  }
  return str;
}

//去掉右边的空白 www.2cto.com
function trimRight(s){
  if(s == null) return "";
  var whitespace = new String(" \t\n\r");
  var str = new String(s);
  if (whitespace.indexOf(str.charAt(str.length-1)) != -1){
    var i = str.length - 1;
    while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1){
      i--;
    }
    str = str.substring(0, i+1);
  }
  return str;
}
//去掉前后空格
function trim(s){
  return trimRight(trimLeft(s));
}
export default {
  setSession,
  getSession,
  setLocalStorage,
  getLocalStorage,
  getBytes,
  compareLength,
  get_length,
  cut_str,
  isTrue,
  trimRight,
  trimLeft,
  trim
}
