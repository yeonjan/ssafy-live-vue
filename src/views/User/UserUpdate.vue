<template>
  <div>
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">
        <ol>
          <li><a href="index.html">Profile</a></li>
          <li>Info</li>
        </ol>
        <h2>Profile</h2>
      </div>
    </section>
    <section id="portfolio-details" class="portfolio-details">
      <div class="container">
        <div class="page_item">
          <div>
            <!--회원가입-->
            <div class="col-lg-4 page_item">
              <div>
                <div class="portfolio-info">
                  <h3>회원정보 수정</h3>
                  <form action="${root}/user" method="post">
                    <input type="hidden" name="action" value="update" />
                    <div class="mb-3 mt-3">
                      <label for="userpwd" class="form-label">비밀번호:</label>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="영문 포함 6자리 이상"
                        id="userpwd"
                        name="userpwd"
                        required
                      />
                      <div class="valid-feedback">Valid.</div>
                      <div class="invalid-feedback">필수 항목입니다.</div>
                    </div>
                    <div class="mb-3">
                      <label for="username" class="form-label">이름:</label>
                      <input type="text" class="form-control" id="username" name="username" required />
                      <div class="valid-feedback">Valid.</div>
                      <div class="invalid-feedback">필수 항목입니다.</div>
                    </div>
                    <div class="mb-3">
                      <label for="emailid" class="form-label">이메일 : </label>
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          id="emailid"
                          name="emailid"
                          placeholder="이메일아이디"
                        />
                        <span class="input-group-text">@</span>
                        <select class="form-select" id="emaildomain" name="emaildomain" aria-label="이메일 도메인 선택">
                          <option selected>선택</option>
                          <option value="ssafy.com">싸피</option>
                          <option value="google.com">구글</option>
                          <option value="naver.com">네이버</option>
                          <option value="kakao.com">카카오</option>
                        </select>
                      </div>
                    </div>
                    <button type="button" id="btn-update" class="btn btn-secondary">회원정보 수정</button>
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
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style></style>
