import 'babel-polyfill';
import dva from 'dva';
import './index.less';
import {LocaleProvider,Modal} from 'antd';
import {addLocaleData, IntlProvider} from 'react-intl';
import createLoading from 'dva-loading';
import ReactDOM from 'react-dom';

const appLocale = window.appLocale;

// 1. Initialize
const app = dva({
  // history: browserHistory,
  onError (error) {
    if(error instanceof TypeError){
      Modal.warning({title:appLocale.messages.error,content:error});
    }else{
      const errorResult = appLocale.messages[error.message];
      if(errorResult === 'noPermissions'){
        Modal.warning({
          title:appLocale.messages.error,
          content:errorResult?errorResult:error.message,
          onOk: () => {
            location.href="/";
          }
        });
      } else{
        Modal.warning({title:appLocale.messages.error,content:errorResult?errorResult:error.message});
      }
    }
  },
});

// 2. Plugins
app.use(createLoading({ effects: true }));

// 3. Model
app.model(require('./models/home'));

// 4. Router
app.router(require('./router/router'));

// 5. Start
const App = app.start();

//set language
addLocaleData(appLocale.data);
//il8n
ReactDOM.render(
    <LocaleProvider locale={appLocale.antd}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
            <App/>
        </IntlProvider>
    </LocaleProvider>,
    document.getElementById("root")
);
