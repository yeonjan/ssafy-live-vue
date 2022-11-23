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
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn id="btn-update" color="#eeeeee" dark v-bind="attrs" v-on="on" depressed small>수정 </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">이메일 인증</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="4" sm="5">
                            <v-text-field label="Email" v-model="modify.emailId" required></v-text-field>
                          </v-col>
                          <v-col cols="4" sm="5">
                            <v-autocomplete
                              v-model="modify.emailDomain"
                              :items="['google.com', 'naver.com', 'daum.net', 'hanmail.net', 'ssafy.com', 'kakao.com']"
                              label="Domains"
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="4" sm="2" style="margin: 13px 0 0 0"
                            ><v-btn @click="emailCheck" elevation="1" style="margin-left: 10px">인증</v-btn></v-col
                          >
                          <v-col cols="12">
                            <v-text-field
                              v-model="inputNum"
                              label="Authentication no*"
                              placeholder="인증번호 6자리를 입력해주세요"
                              :disabled="canInput"
                              maxlength="6"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false"> 취소 </v-btn>
                      <v-btn color="blue darken-1" text @click="updateEmail"> 변경 </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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
    <!-- 이메일 수정 모달-->
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
      dialog: false,
      modify: {
        userId: "",
        emailId: "",
        emailDomain: "",
      },
      checkNum: "",
      inputNum: "",
      canInput: true,
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
    async emailCheck() {
      let email = this.modify.emailId + "@" + this.modify.emailDomain;

      try {
        alert("인증번호가 전송되었습니다.");
        let { data } = await http.get(`/users/mailCheck`, {
          params: { email: email },
        });
        this.checkNum = data;
        console.log(this.checkNum);

        this.canInput = false;
      } catch (error) {
        alert("인증번호 전송 실패");
      }
    },
    async updateEmail() {
      console.log("이메일 업데이트");

      if (String(this.checkNum) !== this.inputNum) {
        alert("인증번호를 확인해주세요");
      } else {
        this.modify.userId = this.userInfo.userId;
        http.put(`/users/${this.userInfo.userId}`, this.modify);
        this.dialog = false;
        alert("이메일이 수정되었습니다.");
        this.$router.go();
      }
    },
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
  padding: 4px 9px 3px;
  font-size: 14px;

  color: #222831;
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
