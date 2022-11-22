<template>
  <div class="board-container1">
    <nav class="board-nav">
      <router-link to="/board/notice">공지사항</router-link> |
      <router-link to="/board/community">자유 게시판</router-link>
    </nav>
    <div class="board-container">
      <router-view></router-view>
    </div>
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
.board-nav {
  padding: 15px 0;
  background: #f3f5fa;
  min-height: 40px;
  margin-top: 0;
  width: 100%;
  margin: 0 0 1% 0;
  padding: 2% 0px 2% 10%;
  font-size: 22px;
  width: 100%;
}
.board-nav a {
  text-decoration: none;
  color: #393e46;
  font-weight: 700;

  /* color: #393e46 !important; */
}

.board-container {
  margin: 0 10% 0px 10%;
  padding-bottom: 2%;
}

a:hover {
  color: #ffd369;
}
</style>
