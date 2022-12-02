// 以下的模块化解决方案可以使用CommonJS和ES6
// {
//   path: 路径,
//   models: 两种写法：['model名字'] or [() => import(), () => require().default],
//   component: () => import()/require().default,
//   title: 字符串，菜单栏标题,
//   exact: 布尔值，是否精确匹配,
//   icon: React Node, 菜单栏图标,
// }

import { BookOutlined, CommentOutlined } from '@ant-design/icons';

const router = [
  {
    path: '/',
    component: () => import('../routes/IndexPage/index'),
    models: [],
    exact: true,
    title: '首页',
    icon: <BookOutlined />,
  },
  {
    path: '/dto-conver-ds',
    component: () => import('../routes/DTOConverDS/index'),
    models: ['test'],
    exact: true,
    title: '后端DTO转前端DS',
    icon: <CommentOutlined />,
  },
  {
    path: '/grid-layout',
    component: () => import('../routes/GridLayoutPage/Drag/index'),
    exact: true,
    title: '拖拽式卡片',
    icon: <CommentOutlined />,
  },
  {
    path: '/grid-sandbox',
    component: () => import('../routes/GridLayoutPage/SandBox/index'),
    exact: true,
    title: '网格沙盒',
    icon: <CommentOutlined />,
  },
  // {
  //   path: '/c7n-test',
  //   component: () => import('../routes/C7NTest/index'),
  //   exact: true,
  //   title: 'C7N组件测试',
  //   icon: <CommentOutlined />,
  // },
  {
    path: '/css-animation',
    component: () => import('../routes/Animation/index'),
    exact: true,
    title: 'CSS动画',
    icon: <CommentOutlined />,
  },
  {
    path: '/render-test',
    component: () => import('../routes/RenderTest'),
    exact: true,
    title: '渲染高亮',
    icon: <CommentOutlined />,
  },
];

export default router;
