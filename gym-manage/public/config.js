window.baseConfig = {
  //baseURL: 'http://chinaji.club',
  baseZone:-4, //时区设置默认为0时区
  systemName:{
    chi: '后台管理系统',
    eng: 'STAROTT'
  },
  baseURL:''
};

window.addEventListener("storage",function (e) {
  if(e.key === null){
    window.location.href='/';
  }else if(e.key ==='token' && e.oldValue !== e.newValue){
    window.location.href='/';
  }
});
