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
    <section id="portfolio-details-personal" class="portfolio-details">
      <div class="container">
        <div class="page_item">
          <!--회원 정보 확인-->
          <div class="user-profile-container page_item">
            <div class="portfolio-info">
              <h3>회원 정보 확인</h3>

              <div>
                <strong>아이디</strong>
                <label for="id-verification" id="profile-id" class="profile-item">{{ userInfo.userId }}</label>
              </div>
              <div>
                <strong>이름</strong>
                <label for="id-verification" id="profile-name" class="profile-item">{{ userInfo.userName }}</label>
              </div>
              <div>
                <strong>email</strong>
                <label for="id-verification" id="profile-email" class="profile-item"
                  >{{ userInfo.emailId }}@{{ userInfo.emailDomain }}</label
                >
                <button
                  type="button"
                  onclick="updateUser()"
                  class="btn btn-secondary"
                  id="btn-update"
                  style="margin-left: 10px"
                >
                  수정
                </button>
              </div>
              <div>
                <strong>가입일</strong>
                <label for="id-verification" id="profile-joinDate" class="profile-item">{{ userInfo.joinDate }}</label>
              </div>
              <button type="button" class="btn btn-secondary" id="btn-delete" @click="deleteAccount">회원탈퇴</button>
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
      if (confirm("정말 탈퇴하시겠습니까?")) {
        await this.$store.dispatch("userStore/deleteAccount");
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#btn-update {
  padding: 2px 9px 3px;
  font-size: 14px;
  background-color: #eeeeee;
  color: #222831;
  border: 1px #dbd8d8 solid;
  float: right;
  margin: 10px 10px 0 0;
}
#btn-delete {
  //margin: ;
  float: right;
}

.portfolio-info div {
  border-bottom: 1px #eeeeee solid;
}
</style>
