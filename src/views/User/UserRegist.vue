<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10 col-md-10 col-sm-12">
        <form id="form-join" method="POST" action="">
          <div class="mb-3">
            <label for="userid" class="form-label">아이디 : </label>
            <input
              type="text"
              class="form-control"
              id="userid"
              v-model="registInfo.userId"
              @keyup="checkId()"
              name="userId"
              placeholder="아이디..."
            />
          </div>
          <div
            :class="{
              'mb-3 text-dark': isUseId == 1,
              'mb-3 text-primary': isUseId == 2,
              'mb-3 text-danger': isUseId == 3,
            }"
          >
            {{ idcheck_result }}
          </div>
          <div class="mb-3">
            <label for="userpwd" class="form-label">비밀번호 : </label>
            <input
              type="password"
              class="form-control"
              id="userpwd"
              v-model="registInfo.userPwd"
              name="userPwd"
              placeholder="비밀번호..."
            />
          </div>
          <div class="mb-3">
            <label for="pwdcheck" class="form-label">비밀번호확인 : </label>
            <input
              type="password"
              class="form-control"
              id="pwdcheck"
              v-model="pwdcheck"
              placeholder="비밀번호확인..."
            />
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">이름 : </label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="registInfo.userName"
              name="userName"
              placeholder="이름..."
            />
          </div>
          <div class="mb-3">
            <label for="emailid" class="form-label">이메일 : </label>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                id="emailid"
                v-model="registInfo.emailId"
                name="emailId"
                placeholder="이메일아이디"
              />
              <span class="input-group-text">@</span>
              <select
                class="form-select"
                id="emaildomain"
                v-model="registInfo.emailDomain"
                name="emailDomain"
                aria-label="이메일 도메인 선택"
              >
                <option selected>선택</option>
                <option value="ssafy.com">싸피</option>
                <option value="google.com">구글</option>
                <option value="naver.com">네이버</option>
                <option value="kakao.com">카카오</option>
              </select>
              <v-btn @click="emailCheck" elevation="1" style="margin-left: 10px">인증</v-btn>
            </div>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">인증 번호 : </label>
            <input
              v-model="inputNum"
              class="form-control mail-check-input"
              placeholder="인증번호 6자리를 입력해주세요"
              :disabled="canInput"
              maxlength="6"
            />
          </div>

          <div class="col-auto text-center">
            <button type="button" id="btn-join" @click="regist()" class="btn btn-outline-primary mb-3">회원가입</button>
            <button type="button" class="btn btn-outline-success mb-3">초기화</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http";
export default {
  data() {
    return {
      isUseId: 1,
      idcheck_result: "",
      pwdcheck: "",
      registInfo: {},
      canInput: true,
      inputNum: "",
      checkNum: "",
    };
  },

  methods: {
    async emailCheck() {
      let email = this.registInfo.emailId + "@" + this.registInfo.emailDomain;

      try {
        let { data } = http.get(`/users/mailCheck`, { params: { email: email } });
        this.checkNum = data;
        alert("인증번호가 전송되었습니다.");

        this.canInput = false;
      } catch (error) {
        alert("인증번호 전송 실패");
      }
    },
    async checkId() {
      let userid = this.registInfo.userid;
      if (userid.length < 6 || userid.length > 16) {
        this.isUseId = 1;
        this.idcheck_result = "아이디는 6자 이상 16자 이하 입니다.";
      } else {
        this.idcheck_result = "";
        await this.$store.dispatch("userStore/idCheck", this.registInfo.userid);
        let checkedId = this.$store.state.userStore.isUseId;
        if (checkedId == 0) {
          this.isUseId = 2;
          this.idcheck_result = `${userid}는 사용할 수 있습니다.`;
        } else {
          this.isUseId = 3;
          this.idcheck_result = `${userid}는 사용할 수 없습니다.`;
        }
      }
    },

    async regist() {
      let registInfo = this.registInfo;
      if (!registInfo.userName) {
        alert("이름 입력!!");
        return;
      } else if (!registInfo.userId) {
        alert("아이디 입력!!");
        return;
      } else if (!registInfo.userPwd) {
        alert("비밀번호 입력!!");
        return;
      } else if (registInfo.userPwd != this.pwdcheck) {
        alert("비밀번호 확인!!");
        return;
      } else if (String(this.checkNum) !== this.inputNum) {
        alert("인증번호를 확인해주세요");
      } else {
        try {
          await this.$store.dispatch("userStore/regist", this.registInfo);
          alert("회원 가입에 성공하셨습니다.");
          this.$router.push("/");
        } catch (error) {
          alert("회원 가입에 실패 하셨습니다.");
        }
      }
    },
  },
};
</script>

<style></style>
