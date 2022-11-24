import http from "@/util/http";

const aptStore = {
  namespaced: true,
  state: () => ({
    optionInfo: {}, // 시구군동 옵션 리스트를 담을 객체
    aptDetailInfo: {}, // 아파트 상세 리스트를 받아올 객체
    aptDetailName: null,
    aptAddress: {}, // 아파트 주소
    aptLatLng: {}, // 아파트 상세 주소
    aptInfo: {}, //  아파트 리스트를 받아올 객체
    aptInterestList: {}, // 해당 유저의 관심 매물 아파트 코드
    aptInterestInfo: {}, // 관심매물의 아파트 정보
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
    SET_APTDETAILNAME(state, payload) {
      state.aptDetailName = payload;
      console.log(state.aptDetailName);
    },
    SET_APTADDRESS(state, payload) {
      state.aptAddress = payload;
      console.log(state.aptAddress);
    },
    SET_APTLATLNG(state, payload) {
      state.aptLatLng = payload;
      console.log(state.aptLatLng);
    },
    SET_APTINTERESTVIEW(state, payload) {
      state.aptInterestList = payload.aptCode;
      console.log(state.aptInterestList);
    },
    SET_APTINTERESTINFO(state, payload) {
      state.aptInterestInfo = payload.aptInfo;
      console.log(state.aptInterestInfo);
    },
  },
  actions: {
    async sendRequest({ commit }, sendInfo) {
      let { data } = await http.get(`/dongcodes/${sendInfo.action}?regcode=${sendInfo.regcode}`);

      let optionInfo = data;
      commit("SET_OPTIONINFO", { optionInfo });
    },

    async aptList({ commit }, aptCodeInfo) {
      console.log(aptCodeInfo);
      let { data } = await http.post("/apts/", aptCodeInfo);

      let aptInfo = data.regcodes;
      commit("SET_APTINFO", { aptInfo });
    },

    async aptDetailList({ commit }, regCodeInfo) {
      let { data } = await http.post("/apts/detail", regCodeInfo);

      let aptDetailInfo = data;
      commit("SET_APTDETAILINFO", { aptDetailInfo });
    },

    async aptRegistInterest(_, interestInfo) {
      await http.post("/apts/interest", interestInfo);
    },

    async aptInterestView({ commit }, userIdInfo) {
      console.log(userIdInfo);
      let { data } = await http.post("/apts/list", userIdInfo);

      let aptCode = data;
      commit("SET_APTINTERESTVIEW", { aptCode });
    },

    async aptInterestInfo({ commit }, aptCodeInfo) {
      let { data } = await http.post("/apts/aptInfo", aptCodeInfo);

      let aptInfo = data;
      commit("SET_APTINTERESTINFO", { aptInfo });
    },
  },
};

export default aptStore;
