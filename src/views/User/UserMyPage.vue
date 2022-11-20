<template>
  <div>
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">
        <ol>
          <li>Profile</li>
          <li>Info</li>
        </ol>
        <h2>Profile</h2>
      </div>
    </section>
    <section id="portfolio-details" class="portfolio-details">
      <div class="container">
        <div class="page_item">
          <div>
            <!--회원 정보 확인-->
            <div class="user-profile-container page_item">
              <div>
                <div class="portfolio-info">
                  <h3>회원 정보 확인</h3>
                  <form action="">
                    <div>
                      <strong>아이디</strong>
                      <label
                        for="id-verification"
                        id="profile-id"
                        class="profile-item"
                        >{{ userInfo.userId }}</label
                      >
                    </div>
                    <div>
                      <strong>이름</strong>
                      <label
                        for="id-verification"
                        id="profile-name"
                        class="profile-item"
                        >{{ userInfo.userName }}</label
                      >
                    </div>
                    <div>
                      <strong>email</strong>
                      <label
                        for="id-verification"
                        id="profile-email"
                        class="profile-item"
                        >{{ userInfo.emailId }}@{{
                          userInfo.emailDomain
                        }}</label
                      >
                    </div>
                    <div>
                      <strong>가입일</strong>
                      <label
                        for="id-verification"
                        id="profile-joinDate"
                        class="profile-item"
                        >{{ userInfo.joinDate }}</label
                      >
                    </div>
                    <button
                      type="button"
                      onclick="updateUser()"
                      class="btn btn-secondary"
                      id="btn-move-update"
                      style="margin-right: 10px"
                    >
                      회원정보 수정
                    </button>
                    <button
                      type="button"
                      onclick="deleteUser()"
                      class="btn btn-secondary"
                      id="btn-delete"
                      @click="deleteAccount"
                    >
                      회원탈퇴
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import http from "@/util/http";
import store from "@/store";
// import { checkLogin } from "@/api/user";
export default {
  name: "Whereismyhome87VueUserMyPage",

  data() {
    return {
      userInfo: {},
    };
  },
  async created() {
    let userId = store.getters["userStore/getUserInfo"].id;
    console.log(userId);
    let { data } = await http.get(`/users/${userId}`);
    this.userInfo = data;
    this.userInfo.joinDate = this.userInfo.joinDate.substr(0, 10);
    console.log(data);
  },
  mounted() {},

  methods: {
    async deleteAccount() {
      //   let check = await checkLogin();
      //   console.log("check " + check);
      //   if (!check) this.$router.push({ name: "login" });
      if (confirm("정말 탈퇴하시겠습니까?")) {
        http.delete(`/users/${this.userInfo.userId}`);
        // const url = `/member/delete`;
        // const headers = {
        //   "Content-Type": "application/json",
        //   token: state.token,
        // };
        // const body = {
        //   password: state.pw,
        // };
        // const response = await axios.delete(url, {
        //   headers: headers,
        //   data: body,
        // });
        // console.log(response.data);
        // if (response.data.status === 200) {
        //   sessionStorage.removeItem("TOKEN");
        //   alert("회원탈퇴 되었습니다.");
        //   // 1. 주소창만 바뀜
        //   router.push({ name: "Home" });
        //   // 2. 메뉴활성화
        //   store.commit("setMenu", "/");
        //   // 3. 로그인상태
        //   store.commit("setLogged", false);
        // }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
