import dva from 'dva';
import './index.less';
import ReactDOM from 'react-dom';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use({});

// 3. Model
app.model(require('./models/Home'));

// 4. Router
app.router(require('./router/router'));

// 5. Start
const App = app.start();

ReactDOM.render(<App/>, document.getElementById("root"));
