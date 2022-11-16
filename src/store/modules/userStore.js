import http from "@/util/http";
import jwt_decode from "jwt-decode";

const userStore = {
  namespaced: true,
  state: () => ({
    userPwd: null, // 비밀번호 찾기한 pwd 정보
    token: null,
    userInfo: {}, //로그인한 유저 정보
  }),
  getters: {},
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
    SET_TOKEN(state, payload) {
      state.token = payload.token;
    },
    SET_PWD(state, payload) {
      state.userPwd = payload.pwd;
      console.log(state.userPwd);
    },
  },
  actions: {
    async login({ commit }, loginInfo) {
      let { data } = await http.post("/users/login", loginInfo);

      let token = data.token;
      console.log("발급 받은 토큰 :", token);

      //userStore에 토큰 정보 저장
      commit("SET_TOKEN", { token });

      let decodeedToken = jwt_decode(token);
      console.log("토큰 정보 : ", decodeedToken);

      //vuex에 userInfo 정보 세팅
      const { id, name, admin } = decodeedToken;
      commit("SET_USER_INFO", { id, name, admin });
    },
    logout({ commit }) {
      //userSotre에 토큰 정보 제거
      commit("SET_TOKEN", { token: null });

      //유저정보 지우기
      commit("SET_USER_INFO", {});
    },
    async searchPwd({ commit }, userInfo) {
      let { data } = await http.post("/users/pwd", userInfo);

      let pwd = data;
      console.log(data === "");
      commit("SET_PWD", { pwd });
    },
  },
};

export default userStore;
