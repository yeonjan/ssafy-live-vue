<template>
  <header id="header">
    <div class="container d-flex align-items-center">
      <div id="main--logo">
        <router-link to="/">
          <img src="@/assets/img/main--Logo.png" alt="#" style="width: 75px; height: 75px" />
        </router-link>
      </div>
      <h1 class="logo me-auto"><a href="#"></a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo me-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar">
        <ul>
          <li>
            <router-link class="nav-link scrollto active" to="/">Home</router-link>
          </li>
          <li><router-link to="/apts">아파트 매매정보</router-link></li>
          <li><router-link to="/intro">소개</router-link></li>
          <li><router-link to="/board/notice">공지사항</router-link></li>
          <li class="dropdown">
            <a href="#" class="getstarted scrollto">
              <span v-if="!userStore.userInfo.id">Log In</span>
              <span v-else>Logout</span>
              <i class="bi bi-chevron-down"></i>
            </a>

            <ul>
              <div v-if="!userStore.userInfo.id">
                <li>
                  <router-link to="/users/login" class="menu-items">로그인</router-link>
                </li>
                <li>
                  <router-link to="/users/regist" class="menu-items">회원가입</router-link>
                </li>
                <li><a href="#" class="menu-items">ID PWD 찾기</a></li>
              </div>
              <div v-else-if="!userStore.userInfo.admin">
                <li><a @click="logout">로그아웃</a></li>
                <li>
                  <router-link to="/users/mypage">회원정보 확인</router-link>
                </li>
              </div>
              <div v-else>
                <li><a @click="logout">로그아웃</a></li>
                <li>
                  <router-link to="/admins/manage">회원정보 관리</router-link>
                </li>
              </div>
            </ul>
          </li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
      <!-- .navbar -->
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    // selectedItem: 1,
    // items: [
    //   { title: "로그인", icon: "mdi-clock" },
    //   { title: "회원가입", icon: "mdi-account" },
    //   { title: "ID PWD 찾기", icon: "mdi-flag" },
    // ],
  }),
  computed: {
    ...mapState(["userStore"]),
  },
  methods: {
    async logout() {
      await this.$store.dispatch("userStore/logout");
      this.$router.push("/").catch(() => {}); //홈 화면 이동
    },
  },
};
</script>

<style scoped>
#header {
  background: #222831;
  font-family: var(--bs-body-font-family);
  line-height: 1.5;
}

#header a {
  color: #fff;
}

#header .dropdown ul li a {
  color: #000000;
}
#navbar .active {
  color: #ffd369;
}

#header a[data-v-60f1c612]:hover {
  color: #47b2e4;
}

.navbar .getstarted {
  border: 2px solid #ffd369;
}

.navbar a {
  text-decoration: none;
}

#header .dropdown ul li a[data-v-60f1c612]:hover {
  color: #47b2e4;
}
</style>
