<template>
  <div class="row justify-content-center">
    <div class="mt-5 mb-5"></div>
    <div class="col-lg-10 col-md-10 col-sm-12">
      <div class="row align-self-center mb-2">
        <div class="col-md-2 text-start">
          <button type="button" id="btn-mv-register" class="btn btn-outline-primary btn-sm">글쓰기</button>
        </div>
        <div class="col-md-5 offset-5">
          <form class="d-flex" id="form-search" action="">
            <input type="hidden" name="pgno" value="1" />
            <select class="form-select form-select-sm ms-5 me-1 w-50" id="skey" name="key" aria-label="검색조건">
              <option value="" selected>검색조건</option>
              <option value="subject">제목</option>
              <option value="userid">작성자</option>
            </select>
            <div class="input-group input-group-sm">
              <input type="text" class="form-control" id="sword" name="word" placeholder="검색어..." />
              <button id="btn-search" class="btn btn-dark" type="button">검색</button>
            </div>
          </form>
        </div>
      </div>
      <table id="board-table" class="table table-hover">
        <thead>
          <tr class="text-center">
            <th scope="col">글번호</th>
            <th scope="col">글머리</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">조회수</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody class="article-list">
          <tr v-for="(article, index) in articles" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ article.bullet }}</td>
            <!-- <td>
              <router-link :to="`/book/detail/${book}`"> {{ article.subject }}</router-link>
            </td> -->
            <td>{{ article.subject }}</td>
            <td>{{ article.userId }}</td>
            <td>{{ article.hit }}</td>
            <td>{{ article.registerTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="m-3 row" id="navigator"></div>
  </div>
</template>

<script>
import http from "@/util/http";
export default {
  created() {
    http.get("/go/boards").then((result) => {
      console.log(result);
      this.boards = result.data;
    });
  },
  data() {
    return {
      boards: [],
    };
  },
};
</script>

<style></style>
