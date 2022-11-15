<template>
  <header id="header">
    <div class="container d-flex align-items-center">
      <div id="main--logo">
        <img src="@/assets/img/mainLogo.png" alt="#" style="width: 75px; height: 75px" />
      </div>
      <h1 class="logo me-auto"><a href="#"></a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo me-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar">
        <ul>
          <li><router-link class="nav-link scrollto active" to="/">Home</router-link></li>
          <li><a class="nav-link scrollto" href="#">아파트 매매 정보</a></li>
          <li><a class="nav-link scrollto" href="#">소개</a></li>
          <li><router-link to="/board">공지사항</router-link></li>
          <!-- <li class="dropdown">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <a href="#" class="getstarted scrollto" v-bind="attrs" v-on="on">
                  <span>Log In</span><i class="bi bi-chevron-down"></i>
                </a>
                <v-btn color="" dark v-bind="attrs" v-on="on"> Log In </v-btn>
              </template>
              <v-card max-width="200" tile>
                <v-list>
                  <v-list-item-group v-model="selectedItem" color="grey darken-4">
                    <v-list-item v-for="(item, i) in items" :key="i">
                      <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-menu>
          </li> -->
          <li class="dropdown">
            <a href="#" class="getstarted scrollto"> <span>Log In</span><i class="bi bi-chevron-down"></i> </a>
            <ul>
              <li><a href="#">로그인</a></li>
              <li><a href="#">회원가입</a></li>
              <li><a href="#">ID PWD 찾기</a></li>
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
export default {
  data: () => ({
    selectedItem: 1,
    items: [
      { title: "로그인", icon: "mdi-clock" },
      { title: "회원가입", icon: "mdi-account" },
      { title: "ID PWD 찾기", icon: "mdi-flag" },
    ],
  }),
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

.navbar .getstarted {
  border: 2px solid #ffd369;
}

.navbar a {
  text-decoration: none;
}
</style>
