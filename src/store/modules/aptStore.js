import http from "@/util/http";

const aptStore = {
  namespaced: true,
  state: () => ({
    optionInfo: {}, // 시구군동 옵션 리스트를 담을 객체
    aptDetailInfo: {}, // 아파트 상세 리스트를 받아올 객체
    aptInfo: {}, //  아파트 리스트를 받아올 객체
  }),
  getters: {},
  mutations: {
    SET_OPTIONINFO(state, payload) {
      state.optionInfo = payload.optionInfo;
      console.log(state.optionInfo);
    },
    SET_APTDETAILINFO(state, payload) {
      state.aptDetailInfo = payload.aptDetailInfo;
      console.log(state.aptDetailInfo);
    },
    SET_APTINFO(state, payload) {
      state.aptInfo = payload.aptInfo;
      console.log(state.aptInfo);
    },
  },
  actions: {
    async sendRequest({ commit }, sendInfo) {
      console.log("sendRequest 실행");
      let { data } = await http.get(`/dongcodes/${sendInfo.action}?regcode=${sendInfo.regcode}`);

      let optionInfo = data;
      commit("SET_OPTIONINFO", { optionInfo });
    },

    async aptList({ commit }, aptCodeInfo) {
      console.log("aptList 실행");
      let { data } = await http.post("/apts/", aptCodeInfo);

      let aptInfo = data.regcodes;
      commit("SET_APTINFO", { aptInfo });
    },

    async aptDetailList({ commit }, regCodeInfo) {
      console.log("aptDetailList 실행");
      let { data } = await http.post("/apts/detail", regCodeInfo);

      let aptDetailInfo = data;
      commit("SET_APTDETAILINFO", { aptDetailInfo });
    },
  },
};

export default aptStore;
