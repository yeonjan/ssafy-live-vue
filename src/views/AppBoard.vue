<template>
  <div class="board-container">
    <nav class="board-nav">
      <router-link to="/board/notice">공지사항</router-link> |
      <router-link to="/board/community">자유 게시판</router-link>
    </nav>

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
.board-nav {
  width: auto;
  height: 35px;
  margin: 30px 0 2% 3px;
  padding: 0 0px 0px 0px;
  font-size: 18px;
}
.board-nav a {
  text-decoration: none;
  color: #393e46;
  font-weight: 600;

  /* color: #393e46 !important; */
}

.board-container {
  margin: 0 18% 0px 18%;
}

a:hover {
  color: #ffd369;
}
</style>
