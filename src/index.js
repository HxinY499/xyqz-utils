import dva from 'dva';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router';
// import { localeContext } from 'choerodon-ui/pro';
// import zh_CN from 'choerodon-ui/pro/lib/locale-context/zh_CN';
// import 'choerodon-ui/lib/configure';
import 'choerodon-ui/dist/choerodon-ui.css';
import 'choerodon-ui/dist/choerodon-ui-pro.css';
import App from './App';

const history = createBrowserHistory();

const app = dva({
  history,
});

app.model(require('./models/global').default);

app.router(({ history }) => {
  return (
    <Router history={history}>
      <Route children={props => <App {...props} />} />
    </Router>
  );
});

// choerodon-ui 目前的默认文案是英文，改为中文
// localeContext.setLocale(zh_CN);

// 5. Start
app.start('#root');

export { app, history };
