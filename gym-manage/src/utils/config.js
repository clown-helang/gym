const api = require('./api');
const menus = require('./menus');

module.exports = {
  baseURL: window.baseConfig.baseURL,
  //baseURL: 'http://10.0.251.142:8084',
  apiPrefix: '/api',
  api,
  menus,
};
