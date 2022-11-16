<template>
  <section id="portfolio-details" class="portfolio-details">
    <div class="container">
      <div class="page_item">
        <div>
          <div class="row gy-4">
            <div class="col-lg-8">
              <div calss="carousel-wrap">
                <carousel>
                  <img src="@/assets/img/apt/p1.jpg" alt="#" />
                  <img src="@/assets/img/apt/p2.jpg" alt="#" />
                  <img src="@/assets/img/apt/p3.png" alt="#" />
                </carousel>
              </div>
            </div>

            <!--로그인-->
            <div class="col-lg-4">
              <div class="portfolio-info">
                <h3>로그인</h3>
                <form action="" method="post">
                  <div class="mb-3 mt-3">
                    <label for="userid" class="form-label">아이디:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="userid"
                      name="userid"
                      v-model="loginInfo.userId"
                      required
                    />
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">필수 항목입니다.</div>
                  </div>
                  <div class="mb-3">
                    <label for="userpwd" class="form-label">비밀번호:</label>
                    <input
                      type="password"
                      class="form-control"
                      id="userpwd"
                      name="userpwd"
                      v-model="loginInfo.userPwd"
                      required
                    />
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">필수 항목입니다.</div>
                  </div>
                  <div>
                    <button type="button" id="btn-login" class="btn btn-dark" @click="login">로그인</button>
                    <!-- 비밀번호 찾기 확인 alert Sucess-->
                    <template>
                      <div>
                        <v-alert v-model="alert_success" dismissible type="success">
                          귀하의 비밀번호 {{ userPwd }}는입니다.
                        </v-alert>
                      </div>
                    </template>
                    <!-- 비밀번호 찾기 확인 alert Fail-->
                    <template>
                      <div>
                        <v-alert v-model="alert_fail" dismissible type="error">
                          입력하신 정보와 일치하는 비밀번호가 없습니다.
                        </v-alert>
                      </div>
                    </template>
                    <!-- 비밀번호 찾기 Dialog -->
                    <template>
                      <div id="search-pwd">
                        <v-dialog v-model="dialog" persistent max-width="600px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text class="float-right" dark v-bind="attrs" v-on="on"> 비밀번호 찾기 </v-text>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="text-h5">비밀번호 찾기</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12">
                                    <v-text-field label="ID" v-model="userInfo.userId" required></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                    <v-text-field
                                      label="이름"
                                      type="text"
                                      v-model="userInfo.userName"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6">
                                    <v-text-field label="Email" v-model="userInfo.emailId" required></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6">
                                    <v-autocomplete
                                      v-model="userInfo.emailDomain"
                                      :items="[
                                        'google.com',
                                        'naver.com',
                                        'daum.net',
                                        'hanmail.net',
                                        'ssafy.com',
                                        'kakao.com',
                                      ]"
                                      label="Domains"
                                    ></v-autocomplete>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
                              <v-btn style="color: #222831" text @click="searchPwd()"> Search Pwd </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </div>
                    </template>
                  </div>
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
import { Carousel } from "vue-carousel";

export default {
  components: { Carousel },

  data() {
    return {
      alert_success: false,
      alert_fail: false,
      dialog: false,
      loginInfo: {},
      userInfo: {},
      userPwd: "",
    };
  },

  methods: {
    async login() {
      console.log("로그인 시도");
      try {
        await this.$store.dispatch("userStore/login", this.loginInfo);
        this.$router.push("/");
      } catch (error) {
        alert("로그인 실패");
      }
    },

    async searchPwd() {
      console.log("비밀번호 찾기 시도");
      try {
        await this.$store.dispatch("userStore/searchPwd", this.userInfo);
        let userPwd = this.$store.state.userStore.userPwd;
        this.userPwd = userPwd;
        console.log(!userPwd);
        if (userPwd) {
          this.alert_success = true;
          this.dialog = false;
        } else {
          this.alert_fail = true;
          this.dialog = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
#btn-login {
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
