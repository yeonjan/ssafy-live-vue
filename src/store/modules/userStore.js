import http from "@/util/http";
import jwt_decode from "jwt-decode";

const userStore = {
  namespaced: true,
  state: () => ({
    userInfo: {}, //로그인한 유저 정보
  }),
  getters: {},
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
  },
  actions: {
    async login({ commit }, loginInfo) {
      let { data } = await http.post("/users/login", loginInfo);

      let token = data.token;
      console.log("발급 받은 토큰 :", token);

      //axios 요청 시 header에 access-token 추가
      http.defaults.headers.common["access-token"] = token;

      let decodeedToken = jwt_decode(token);
      console.log("토큰 정보 : ", decodeedToken);

      //vuex에 userInfo 정보 세팅
      const { id, name, admin } = decodeedToken;
      commit("SET_USER_INFO", { id, name, admin });
    },
    logout({ commit }) {
      //헤더에서 토큰 정보 제거
      delete http.defaults.headers.common["access-token"];
      commit("SET_USER_INFO", {});
    },
  },
};

export default userStore;
