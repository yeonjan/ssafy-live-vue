<template>
  <section id="portfolio-details" class="portfolio-details">
    <div class="container">
      <div class="page_item">
        <div>
          <div class="row gy-4 justify-content-end">
            <!-- 화면 소개글 -->
            <div class="col-lg-8 contianer-font">
              <h1 data-aos="zoom-in-right" data-aos-delay="400" style="margin-bottom: 100px">Lorem Ipsum</h1>
              <p data-aos="zoom-in-right" data-aos-delay="600">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                <br />Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, <br />when an
                unknown printer took a galley of type and scrambled it to make a type<br />
                specimen book. It has survived not only five centuries, but also the leap into<br />
                electronic typesetting, remaining essentially unchanged. It was popularised <br />
                in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,<br />
                and more recently with desktop publishing
              </p>
            </div>
            <!--회원가입-->
            <div class="col-lg-4" id="portfolio-info" data-aos="fade-left">
              <div class="portfolio-info">
                <h3>회원가입</h3>
                <form action="" method="post">
                  <div class="mb-3 mt-3">
                    <label for="userid" class="form-label">아이디</label>
                    <input
                      type="text"
                      class="form-control"
                      id="userid"
                      name="userid"
                      v-model="registInfo.userId"
                      required
                    />
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">필수 항목입니다.</div>
                  </div>
                  <div class="mb-3">
                    <label for="userpwd" class="form-label">비밀번호</label>
                    <input
                      type="password"
                      class="form-control"
                      id="userpwd"
                      name="userpwd"
                      v-model="registInfo.userPwd"
                      required
                    />
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">필수 항목입니다.</div>
                  </div>
                  <div class="mb-3">
                    <label for="userpwd" class="form-label">비밀번호 확인</label>
                    <input
                      type="password"
                      class="form-control"
                      id="pwdcheck"
                      name="pwdcheck"
                      v-model="pwdcheck"
                      required
                    />
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">필수 항목입니다.</div>
                  </div>
                  <div class="mb-3">
                    <label for="userpwd" class="form-label">이름</label>
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      name="username"
                      v-model="registInfo.userName"
                      required
                    />
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">필수 항목입니다.</div>
                  </div>
                  <div class="mb-3">
                    <label for="emailid" class="form-label">이메일</label>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        id="emailid"
                        v-model="registInfo.emailId"
                        name="emailId"
                        placeholder=""
                        required
                      />
                      <span class="input-group-text">@</span>
                      <select
                        class="form-select"
                        id="emaildomain"
                        v-model="registInfo.emailDomain"
                        name="emailDomain"
                        aria-label="이메일 도메인 선택"
                      >
                        <option value="ssafy.com">ssafy.com</option>
                        <option value="google.com">google.com</option>
                        <option value="naver.com">'naver.com</option>
                        <option value="kakao.com">kakao.com</option>
                      </select>
                      <v-btn @click="emailCheck" elevation="1" style="margin-left: 10px">인증</v-btn>
                    </div>

                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">필수 항목입니다.</div>
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
                  <button type="button" id="btn-join" class="btn btn-dark" @click="regist">회원가입</button>
                  <div></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
      if (!this.registInfo.emailDomain) alert("이메일을 입력해주세요");
      else {
        let email = this.registInfo.emailId + "@" + this.registInfo.emailDomain;

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
      console.log("inputNum:  ", this.inputNum);
      console.log("checkNum:  ", this.checkNum);
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

<style scoped>
#portfolio-details {
  height: 800px;
  background-image: url("@/assets/img/login_main.jpg");
  background-size: cover;
}

#portfolio-info {
  background: #ffffff;
  margin-bottom: 10px;
}

.contianer-font {
  color: #ffffff;
}

#btn-join {
  display: block;
  width: 100%;
  margin: 20px 0 10px 0;
  background: #393e46;
}

.v-application .error {
  background: #ff9551;
}

.v-alert {
  z-index: 2;
}
</style>
