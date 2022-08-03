/* eslint-disable */
import { createApp } from 'vue';
import * as VueRouter from 'vue-router';
import App from './App.vue';
import './public-path';
import routes from './routes';

let app;
// const router = VueRouter.createRouter({
//   history: VueRouter.createWebHistory(
//     window.__POWERED_BY_QIANKUN__ ? '/qiankun-vue-app/' : '/'
//   ),
//   routes,
// });

function render(props) {
  app = createApp(App);
  // app.use(router);
  app.mount(
    props.container
      ? props.container.querySelector('#app')
      : document.getElementById('app')
  );
}
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  render(props);
  console.log('vue app mount');
}
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('vue app bootstraped');
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  app.unmount();
  console.log('vue app unmount');
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('vue app update props', props);
}
