import axios from "axios";
import store from "@/store";

// axios 객체 생성 후 export
let instance = axios.create({
  baseURL: "http://localhost:2000/",
  headers: {
    "Content-Type": "application/json",
  },
});
// axios 요청 보내기 전 인터셉터
instance.interceptors.request.use((config) => {
  // 헤더에 acess-token추가
  config.headers["access-token"] = store.state.userStore.token;

  return config;
});

export default instance;
