import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/MainVue"),
  },
  {
    path: "/board",
    name: "board",
    component: () => import("@/views/AppBoard"),
    redirect: "/board/notice",
    children: [
      {
        path: "community",
        name: "community",
        component: () => import("@/views/board/BoardCommunity"),
      },
      {
        path: "notice",
        name: "notice",
        component: () => import("@/views/board/BoardNotice"),
      },
      {
        path: "detail/:articleNo",
        name: "boarddetail",
        component: () => import("@/views/board/BoardDetail"),
      },
      {
        path: "write",
        name: "write",
        component: () => import("@/views/board/BoardWrite"),
      },
    ],
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/views/AppUser"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/User/UserLogin"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
