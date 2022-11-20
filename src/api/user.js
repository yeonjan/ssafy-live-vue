import store from "@/store";

async function checkLogin() {
  let accessToken = localStorage.getItem("access-token");
  const userInfo = store.getters["userStore/getUserInfo"];

  if (userInfo.id != null && accessToken) {
    console.log("토큰 유효성 체크");
    await store.dispatch("userStore/validateToken", accessToken);
  }
  console.log(!userInfo.id);
  if (accessToken == null || !userInfo.id) {
    alert("로그인이 필요한 페이지입니다.");

    return false;
  }
  return true;
}

export { checkLogin };
