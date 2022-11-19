import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
  let accessToken = localStorage.getItem("access-token");
  const userInfo = store.getters["userStore/getUserInfo"];
  console.log("로그인 처리 전", userInfo, accessToken);

  if (userInfo.id != null && accessToken) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("userStore/validateToken", accessToken);
  }
  console.log(!userInfo.id);
  if (accessToken == null || !userInfo.id) {
    alert("로그인이 필요한 페이지입니다.");
    router.push({ name: "login" });
  } else {
    console.log("로그인 확인");
    next();
  }
};

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
        beforeEnter: onlyAuthUser,
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
      {
        path: "regist",
        name: "regist",
        component: () => import("@/views/User/UserRegist"),
      },
    ],
  },
  {
    path: "/admins",
    name: "admins",
    component: () => import("@/views/AppAdmin"),
    children: [
      {
        path: "manage",
        name: "manage",
        component: () => import("@/views/admin/AdminManage"),
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
