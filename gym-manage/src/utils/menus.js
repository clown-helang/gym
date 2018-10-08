export default [
  {
    name: '用户管理',
    code: 'userManage',
    icon: 'team',
    owner: 'ORDINARY',
    child: [
      {
      name: '会员管理',
      code: 'memberManage',
      path:'/#/userManage/memberManage',
      },
      {
        name: '教练管理',
        code: 'coachManage',
        path:'/#/userManage/coachManage',
      },
      {
        name: '管理员管理',
        code: 'adminManage',
        path: '/#/userManage/adminManage'
      }
    ]
  },
  {
    name: '课程管理',
    code: 'courseManage',
    icon:'profile',
    owner: 'ORDINARY',
    child: [
      {
        name: '课程管理',
        code: 'courseManage',
        path:'/#/courseManage',
      },
      {
        name: '团课课表管理',
        code: 'courseManage',
        path:'/#/classSchedule',
      },
      {
        name: '会员课程管理',
        code: 'userCourseManage',
        path:'/#/userCourseManage',
      },
    ]
  },
  {
    name: '统计管理',
    code: 'statisticalManage',
    icon:'line-chart',
    owner: 'SUPER',
    child: [
      {
        name: '充值记录查询',
        code: 'rechargeRecordQuery',
        path:'/#/statisticalManage/rechargeRecordQuery',
      },
      {
        name: '教练业绩查询',
        code: 'coachKPIQuery',
        path:'/#/statisticalManage/coachKPIQuery',
      },
      {
        name: '消费记录查询',
        code: 'consumeRecordQuery',
        path:'/#/statisticalManage/consumeRecordQuery',
      },
      {
        name: '上课记录查询',
        code: 'classRecordQuery',
        path:'/#/statisticalManage/classRecordQuery',
      },
    ]
  },
]
