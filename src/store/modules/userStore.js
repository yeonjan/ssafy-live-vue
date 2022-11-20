import http from "@/util/http";
import jwt_decode from "jwt-decode";
import router from "@/router";
const userStore = {
  namespaced: true,
  state: () => ({
    userPwd: null, // 비밀번호 찾기한 pwd 정보
    accessToken: null,
    isUseId: null, // 아이디 중복체크 유무
    userInfo: {}, //로그인한 유저 정보
    UserManageInfo: {}, // 관리자 회원 관리 정보
  }),
  getters: {
    getAccessToken: function (state) {
      return state.accessToken;
    },
    getUserInfo: function (state) {
      return state.userInfo;
    },
  },
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
    SET_TOKEN(state, payload) {
      state.accessToken = payload.accessToken;
    },
    SET_PWD(state, payload) {
      state.userPwd = payload.pwd;
      console.log(state.userPwd);
    },
    SET_IDCHECK(state, payload) {
      state.isUseId = payload.checkid;
      console.log(state.isUseId);
    },
    SET_USERLIST(state, payload) {
      state.userManageInfo = payload.userManageInfo;
      console.log(state.userManageInfo);
    },
  },
  actions: {
    async login({ commit }, loginInfo) {
      let { data } = await http.post("/users/login", loginInfo);

      let accessToken = data["access-token"];
      let refreshToken = data["refresh-token"];
      console.log("발급 받은 토큰 :", accessToken);

      //userStore에 토큰 정보 저장
      localStorage.setItem("access-token", accessToken);
      localStorage.setItem("refresh-token", refreshToken);

      let decodeedToken = jwt_decode(accessToken);
      console.log("토큰 정보 : ", decodeedToken);

      //vuex에 userInfo 정보 세팅
      const { id, name, admin } = decodeedToken;
      commit("SET_USER_INFO", { id, name, admin });
    },
    logout({ commit }) {
      //userSotre에 access 토큰 정보 제거
      commit("SET_TOKEN", { accessToken: null });
      //refresh token 삭제
      localStorage.setItem("access-token", null);
      localStorage.setItem("refresh-token", null);
      //유저정보 지우기
      commit("SET_USER_INFO", {});
    },

    async validateToken({ dispatch }, accessToken) {
      http.defaults.headers["Authorization"] = accessToken;
      try {
        console.log(http.defaults.headers);
        await http.get("/users/validate/access");
      } catch (error) {
        console.log("access 토큰 만료", dispatch);
        await dispatch("tokenRegeneration");
      }
    },
    async tokenRegeneration({ commit, state }) {
      http.defaults.headers["refresh-token"] =
        localStorage.getItem("refresh-token");
      try {
        let { data } = await http.post("/users/validate/refresh", {
          userId: state.userInfo.id,
        });
        let accessToken = data["access-token"];
        console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
        localStorage.setItem("access-token", accessToken);
      } catch (error) {
        if (error.response.status === 401) {
          console.log("refreshToken 검증 실패");
          alert("로그인이 만료되었습니다. 다시 로그인해 주세요.");
          commit("SET_USER_INFO", null);
          router.push({ name: "login" });
        }
      }
    },
    async searchPwd({ commit }, userInfo) {
      let { data } = await http.post("/users/pwd", userInfo);

      let pwd = data;
      console.log(data === "");
      commit("SET_PWD", { pwd });
    },
    async idCheck({ commit }, checkId) {
      let { data } = await http.get(`/users/id/${checkId}`);

      let checkid = data;
      commit("SET_IDCHECK", { checkid });
    },

    async regist(_, registInfo) {
      await http.post("/users/join", registInfo);
    },

    async selectAll({ commit }) {
      let { data } = await http.get("/admin/manage");

      let userManageInfo = data;
      commit("SET_USERLIST", { userManageInfo });
    },
  },
};

export default userStore;
