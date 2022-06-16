import {
  registerMicroApps,
  start,
  loadMicroApp,
  initGlobalState,
} from 'qiankun';
import { history } from './index';

const reactAppConfig = {
  name: 'react-app',
  entry: 'http://localhost:8002',
  container: '#react-app',
  activeRule: location => location.pathname.startsWith('/qiankun-react-app'),
};
const vueAppConfig = {
  name: 'vue-app',
  entry: 'http://localhost:8001',
  container: '#vue-app',
  activeRule: location => location.pathname.startsWith('/qiankun-vue-app'),
};
const hzeroConfig = {
  name: 'hzero',
  entry: 'http://localhost:8000',
  container: '#hzero-app',
  activeRule: location => location.pathname.startsWith('/hzero-app'),
  // props: {
  //   hideLayout: true, // 控制 "菜单部分 sidebar" 和 "用户信息 header" 是否隐藏
  //   hideTabs: true,
  // },
};

registerMicroApps([reactAppConfig, vueAppConfig, hzeroConfig]);

// 初始化 state
const state = { message: 'message' };
const actions = initGlobalState(state);
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  alert('主应用监听到变化' + JSON.stringify(state));
});
setTimeout(() => {
  actions.setGlobalState({ message: '主应用发来message' });
}, 2000);

start();

// 加载多个子应用
let reactLoadApp, vueLoadApp;
history.listen(history => {
  if (history.pathname === '/qiankun-multiple-app') {
    if (!vueLoadApp && !reactLoadApp) {
      reactLoadApp = loadMicroApp(reactAppConfig);
      vueLoadApp = loadMicroApp(vueAppConfig);
    }
  } else {
    reactLoadApp?.unmount();
    vueLoadApp?.unmount();
    reactLoadApp = null;
    vueLoadApp = null;
  }
});
