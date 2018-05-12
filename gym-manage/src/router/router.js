import React from 'react';
import { Router } from 'dva/router';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/login',
      name: 'Login',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('../models/login'));
          cb(null, require('../routes/Login/Login'));
        });
      },
    },
    {
      path: '/',
      name: 'Home',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('../routes/Home/Home'));
        });
      },
      childRoutes:[
        {
          path: '/userManage/memberManage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/UserManage/MemberManage'));
              cb(null, require('../routes/UserManage/MemberManage'));
            }, 'MemberManage');
          },
        },
        {
          path: '/userManage/memberManage/memberDetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/UserManage/MemberDetail'));
              cb(null, require('../routes/UserManage/MemberDetail'));
            }, 'MemberDetail');
          },
        },
        {
          path: '/userManage/coachManage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/UserManage/CoachManage'));
              cb(null, require('../routes/UserManage/CoachManage'));
            }, 'CoachManage');
          },
        },
        {
          path: '/userManage/coachManage/edit',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/UserManage/EditCoach'));
              cb(null, require('../routes/UserManage/EditCoach'));
            }, 'EditCoach');
          },
        },
        {
          path: '/userManage/adminManage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/UserManage/AdminManage'));
              cb(null, require('../routes/UserManage/AdminManage'));
            }, 'AdminManage');
          },
        },
        {
          path: '/courseManage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/CourseManage/CourseManage'));
              cb(null, require('../routes/CourseManage/CourseManage'));
            }, 'CourseManage');
          },
        },
        {
          path: '/courseManage/add',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/CourseManage/AddCourseManage'));
              cb(null, require('../routes/CourseManage/AddCourseManage'));
            }, 'AddCourseManage');
          },
        },
        {
          path: '/courseManage/edit',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/CourseManage/AddCourseManage'));
              cb(null, require('../routes/CourseManage/AddCourseManage'));
            }, 'AddCourseManage');
          },
        },
        {
          path: '/classSchedule',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/CourseManage/ClassScheduleManage'));
              cb(null, require('../routes/CourseManage/ClassScheduleManage'));
            }, 'ClassScheduleManage');
          },
        },
        {
          path: '/classSchedule/add',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/CourseManage/AddClassSchedule'));
              cb(null, require('../routes/CourseManage/AddClassSchedule'));
            }, 'AddClassSchedule');
          },
        },
        {
          path: '/classSchedule/edit',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/CourseManage/AddClassSchedule'));
              cb(null, require('../routes/CourseManage/AddClassSchedule'));
            }, 'AddClassSchedule');
          },
        },
        {
          path: '/statisticalManage/rechargeRecordQuery',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/StatisticalManage/RechargeRecordQuery'));
              cb(null, require('../routes/StatisticalManage/RechargeRecordQuery'));
            }, 'RechargeRecordQuery');
          },
        },
        {
          path: '/statisticalManage/coachKPIQuery',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/StatisticalManage/CoachKPIQuery'));
              cb(null, require('../routes/StatisticalManage/CoachKPIQuery'));
            }, 'CoachKPIQuery');
          },
        },
        {
          path: '/statisticalManage/coachKPIQuery/detail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/StatisticalManage/CoachKPIDetail'));
              cb(null, require('../routes/StatisticalManage/CoachKPIDetail'));
            }, 'CoachKPIDetail');
          },
        },
        {
          path: '/statisticalManage/consumeRecordQuery',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/StatisticalManage/ConsumeRecordQuery'));
              cb(null, require('../routes/StatisticalManage/ConsumeRecordQuery'));
            }, 'ConsumeRecordQuery');
          },
        },
        {
          path: '/statisticalManage/classRecordQuery',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/StatisticalManage/ClassRecordQuery'));
              cb(null, require('../routes/StatisticalManage/ClassRecordQuery'));
            }, 'ClassRecordQuery');
          },
        },
        {
          path: '/*',
          name: 'PageNotFound',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('../routes/Error/PageNotFound'));
            });
          },
        },
      ]
    },
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
