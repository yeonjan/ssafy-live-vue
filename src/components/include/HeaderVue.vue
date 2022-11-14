<template>
  <div>
    <header id="header" class="fixed-top">
      <div class="container d-flex align-items-center">
        <div id="main--logo">
          <img src="@/assets/img/mainLogo.png" alt="#" style="width: 75px; height: 75px" />
        </div>
        <h1 class="logo me-auto"><a href="#"></a></h1>
        <!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html" class="logo me-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

        <nav id="navbar" class="navbar">
          <ul>
            <li><a class="nav-link scrollto active" href="#">Home</a></li>
            <li><a class="nav-link scrollto" href="#">아파트 매매 정보</a></li>
            <li><a class="nav-link scrollto" href="#">소개</a></li>
            <li><a class="nav-link scrollto" href="#">공지사항</a></li>
            <li class="dropdown">
              <a href="#" class="getstarted scrollto"><span>Log In</span> <i class="bi bi-chevron-down"></i></a>
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
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#header {
  background: #222831;
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
