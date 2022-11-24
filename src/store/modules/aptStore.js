import http from "@/util/http";

const aptStore = {
  namespaced: true,
  state: () => ({
    optionInfo: {}, // 시구군동 옵션 리스트를 담을 객체
    aptDetailInfo: {}, // 아파트 상세 리스트를 받아올 객체
    aptDetailName: null,
    aptAddress: {}, // 아파트 주소
    aptLatLng: {}, // 아파트 상세 주소
    aptInfo: [], //  아파트 리스트를 받아올 객체
    aptInterestCode: {}, // 관심매물 아파트 코드 객체
    aptInterestName: {}, // 관심매물 아파트 정보 객체
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
    SET_APTINTERESTCODE(state, payload) {
      state.aptInterestCode = payload.aptInterestCode;
      console.log(state.aptInterestCode);
    },
    SET_APTINTERESTNAME(state, payload) {
      state.aptInterestName = payload.aptInterestName;
      console.log("최종 아파트 정보 : ", state.aptInterestName);
    },
  },
  actions: {
    async sendRequest({ commit }, sendInfo) {
      let { data } = await http.get(`/dongcodes/${sendInfo.action}?regcode=${sendInfo.regcode}`);

      let optionInfo = data;
      commit("SET_OPTIONINFO", { optionInfo });
    },

    async aptList({ commit }, aptCodeInfo) {
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
      console.log("아파트 등록 실행", interestInfo);
      await http.post("/apts/interest", interestInfo);
    },

    async aptInterestList({ commit }, userIdInfo) {
      let { data } = await http.post("/apts/list", userIdInfo);

      let aptInterestCode = data;
      commit("SET_APTINTERESTCODE", { aptInterestCode });
    },

    async aptInterestName({ commit }, aptInterestCode) {
      let { data } = await http.post("/apts/aptInfo", aptInterestCode);

      let aptInfo = data.regcodes;
      commit("SET_APTINFO", { aptInfo });
    },
  },
};

export default aptStore;
