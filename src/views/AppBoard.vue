<template>
  <div>
    <nav>
      <router-link :to="{ name: 'BoardList' }">공지사항</router-link> |
      <router-link :to="{ name: 'Score' }">자유 게시판</router-link>
    </nav>

    <!-- <ul>
      <li><span>테스트메뉴1</span></li>
      <li><span>테스트메뉴2</span></li>
      <li><span>테스트메뉴3</span></li>
    </ul> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
ul {
  list-style: none;
  cursor: pointer;
}
li {
  width: 30%;
  float: left;
  margin-right: 10px;
  transition: all 0.3s ease;
}
li:hover {
  color: #39d9c8;
  transition: all 0.3s ease;
}
li > span {
  position: relative;
}

/*밑줄넣기 부분*/
li > span::after {
  content: "";
  width: 0%;
  left: 50%;
  height: 1px;
  display: block;
  position: absolute;
  margin-top: 3px;
  border-bottom: 2px solid #39d9c8;
  transition: all 0.3s ease;
}
li:hover > span::after {
  content: "";
  width: 100%;
  left: 0px;
  height: 1px;
  display: block;
  position: absolute;
  margin-top: 3px;
  border-bottom: 2px solid #39d9c8;
  transition: all 0.3s ease;
}
nav {
  width: auto;
  height: 35px;
  margin: 30px 0px 0px 20px;
  padding: 0 0px 0px 0px;
  font-size: 18px;
}
nav a.router-link-active {
  color: #393e46 !important;
}
</style>
