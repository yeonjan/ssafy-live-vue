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
                    <!-- <button type="button" @click="handle_toggle" style="float: right; margin-top: 10px">
                      비밀번호 찾기
                    </button>      -->
                    <!-- section modal -search password -->
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
                                  <!-- <v-col cols="12" sm="6" md="4">
                                    <v-text-field label="Legal first name*" required></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      label="Legal middle name"
                                      hint="example of helper text only on focus"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      label="Legal last name*"
                                      hint="example of persistent helper text"
                                      persistent-hint
                                      required
                                    ></v-text-field>
                                  </v-col> -->
                                  <v-col cols="12">
                                    <v-text-field label="ID" required></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                    <v-text-field label="이름" type="password" required></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6">
                                    <v-text-field label="Email" required></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6">
                                    <v-autocomplete
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
                              <v-btn color="blue darken-1" text @click="dialog = false"> Save </v-btn>
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
  },
  data() {
    return {
      dialog: false,
      loginInfo: {},
    };
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
</style>
