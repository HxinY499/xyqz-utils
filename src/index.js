import dva from 'dva';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router';
import { localeContext } from 'choerodon-ui/pro';
import zh_CN from 'choerodon-ui/pro/lib/locale-context/zh_CN';
import 'choerodon-ui/lib/configure';
import 'choerodon-ui/dist/choerodon-ui.css';
import 'choerodon-ui/dist/choerodon-ui-pro.css';
import App from './App';

const history = createBrowserHistory();

// 1. Initialize
const app = dva({
  history,
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/global').default);

// 4. Router
app.router(({ history }) => {
  return (
    <Router history={history}>
      <Route children={props => <App {...props} />} />
    </Router>
  );
});

// choerodon-ui 目前的默认文案是英文，改为中文
localeContext.setLocale(zh_CN);

// 5. Start
app.start('#root');

// 接入qiankun
require('./qiankun');
// 接入MicroApp
// require('./micro-app');

export { app, history };
