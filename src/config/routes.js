// 以下的模块化解决方案可以使用CommonJS和ES6
// {
//   path: 路径,
//   models: 两种写法：['model名字'] or [() => import(), () => require().default],
//   component: () => import()/require().default,
//   title: 字符串，菜单栏标题,
//   exact: 布尔值，是否精确匹配,
//   icon: React Node, 菜单栏图标,
// }

import { BookOutlined, CommentOutlined } from "@ant-design/icons";

const router = [
  {
    path: "/",
    component: () => import("../routes/IndexPage/index"),
    models: [],
    exact: true,
    title: "首页",
    icon: <BookOutlined />,
  },
  {
    path: "/dto-conver-ds",
    component: () => import("../routes/DTOConverDS/index"),
    exact: true,
    title: "后端DTO转前端DS",
    icon: <CommentOutlined />,
  },
];

export default router;
