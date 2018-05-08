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
      path: '/',
      name: 'Home',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('../routes/Home'));
        });
      },
      childRoutes:[
        {
          path: '/indexPage',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/Index'));
              cb(null, require('../routes/IndexPage'));
            }, 'IndexPage');
          },
        },
        {
          path: '/courseList',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/CourseList'));
              cb(null, require('../routes/CourseList'));
            }, 'CourseList');
          },
        },
        {
          path: '/courseDetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/CourseDetail'));
              cb(null, require('../routes/CourseDetail'));
            }, 'CourseDetail');
          },
        },
        {
          path: '/buyCourse',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/BuyCourse'));
              cb(null, require('../routes/BuyCourse'));
            }, 'BuyCourse');
          },
        },
        {
          path: '/coachList',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/CoachList'));
              cb(null, require('../routes/CoachList'));
            }, 'CoachList');
          },
        },
        {
          path: '/coachDetail',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/CoachDetail'));
              cb(null, require('../routes/CoachDetail'));
            }, 'CoachDetail');
          },
        },
        {
          path: '/myCourse',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/User'));
              cb(null, require('../routes/MyCourse'));
            }, 'MyCourse');
          },
        },
        {
          path: '/personalCenter',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/User'));
              cb(null, require('../routes/PersonalCenter'));
            }, 'PersonalCenter');
          },
        },
        {
          path: '/classRecord',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/User'));
              cb(null, require('../routes/ClassRecord'));
            }, 'ClassRecord');
          },
        },
        {
          path: '/consumeRecord',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/User'));
              cb(null, require('../routes/ConsumeRecord'));
            }, 'ConsumeRecord');
          },
        },
        {
          path: '/reservationRecord',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/User'));
              cb(null, require('../routes/ReservationRecord'));
            }, 'ReservationRecord');
          },
        },
        {
          path: '/setBreaks',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/User'));
              cb(null, require('../routes/SetBreaks'));
            }, 'SetBreaks');
          },
        },
        {
          path: '/courseBooking',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/User'));
              cb(null, require('../routes/CourseBooking'));
            }, 'CourseBooking');
          },
        },
      ]
    },
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
