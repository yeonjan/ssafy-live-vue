import http from "@/util/http";

const aptStore = {
  namespaced: true,
  state: () => ({
    optionInfo: {}, // 시구군동 옵션 리스트를 담을 객체
  }),
  getters: {},
  mutations: {
    SET_OPTIONINFO(state, payload) {
      state.optionInfo = payload.optionInfo;
      console.log(state.optionInfo);
    },
  },
  actions: {
    async sendRequest({ commit }, sendInfo) {
      console.log("sendRequest 실행");
      let { data } = await http.get(`/dongcodes/${sendInfo.action}?regcode=${sendInfo.regcode}`);

      let optionInfo = data;
      console.log(optionInfo);
      commit("SET_OPTIONINFO", { optionInfo });
    },
  },
};

export default aptStore;
