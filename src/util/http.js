import axios from "axios";

// axios 객체 생성 후 export
export default axios.create({
  baseURL: "http://localhost:2000/",
  headers: {
    "Content-Type": "application/json",
  },
});
