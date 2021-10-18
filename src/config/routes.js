// 以下的模块化解决方案可以使用CommonJS和ES6
// {
//   path: 路径,
//   models: 两种写法：['model名字'] or [() => import(), () => require().default],
//   component: () => import()/require().default,
//   title: 字符串，菜单栏标题,
//   exact: 布尔值，是否精确匹配,
//   icon: React Node, 菜单栏图标,
// }

const router = [
  {
    path: "/",
    component: () => import("../routes/IndexPage/index"),
    models: ["test", () => import("../models/test2")],
    exact: true,
  },
  {
    path: "/test",
    component: () => import("../routes/Test/index"),
    models: ["test"],
    exact: true,
  },
];

export default router;
