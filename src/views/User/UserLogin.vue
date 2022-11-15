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
                  <button type="button" id="btn-login" @click="login">로그인</button>
                  <button
                    type="button"
                    style="float: right"
                    data-bs-toggle="modal"
                    data-bs-target="#search-pwd"
                    data-bs-whatever="@mdo"
                    id="btn-Search-pwd"
                    class="btn btn-dark"
                  >
                    비밀번호 찾기
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- section modal -search password -->
    <div class="modal fade" id="search-pwd" tabindex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" style="background: #f8f9fa">
            <h5 class="modal-btn-pwd" id="modal-btn">비밀번호 찾기</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="search-user-id" class="col-form-label">아이디:</label>
                <input type="text" class="form-control" id="search-user-id" required />
              </div>
              <div class="mb-3">
                <label for="search-user-name" class="form-label">이름 : </label>
                <input type="text" class="form-control" id="search-user-name" name="search-user-name" required />
              </div>
              <label for="search-email-id" class="form-label">이메일 : </label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  id="search-email-id"
                  name="search-email-id"
                  placeholder="이메일아이디"
                  required
                />
                <span class="input-group-text">@</span>
                <select
                  class="form-select"
                  id="search-email-domain"
                  name="search-email-domain"
                  aria-label="이메일 도메인 선택"
                >
                  <option selected>선택</option>
                  <option value="ssafy.com">싸피</option>
                  <option value="google.com">구글</option>
                  <option value="naver.com">네이버</option>
                  <option value="kakao.com">카카오</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" id="search-btn-pwd" onclick="searchPwd()" class="btn btn-primary">
              비밀번호 찾기
            </button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
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

  created() {
    console.log("ht");
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
  },
  data() {
    return {
      loginInfo: {},
    };
  },
};
</script>

<style></style>
