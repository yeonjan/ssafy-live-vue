<template>
  <article class="blog-details">
    <div class="post-img">
      <!-- <img src="assets/img/apt/p1.jpg" alt="" class="img-fluid" /> -->
    </div>

    <h2 class="title">
      {{ article.subject }}
    </h2>

    <div class="meta-top">
      <ul>
        <li class="d-flex align-items-center">
          <i class="bi bi-person"></i>
          <a href="#">{{ article.userId }}</a>
        </li>
        <li class="d-flex align-items-center">
          <i class="bi bi-clock"></i>
          <a href="#">{{ article.registerTime }}</a>
        </li>
        <v-spacer></v-spacer>
        <v-menu
          left
          bottom
          v-if="
            (article.bullet == '공지' && userInfo.admin) ||
            userInfo.id == article.userId
          "
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon size="25">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title @click="articleEdit"
                >수정하기</v-list-item-title
              >
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="articleDelete"
                >삭제하기</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </ul>
    </div>

    <div class="content">
      <Viewer v-if="article.content != null" :initialValue="article.content" />
    </div>

    <div v-if="this.fileName[0]" class="file-download">
      <p>첨부파일</p>
      <ul class="file-list">
        <li
          v-for="(name, idx) in fileName"
          :key="idx"
          class="d-flex align-items-center"
        >
          <i class="bi bi-paperclip"></i>
          <a @click="download(name)">{{ name }}</a>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
import http from "@/util/http";
import { Viewer } from "@toast-ui/vue-editor";
import store from "@/store";

export default {
  components: {
    Viewer,
  },
  data() {
    return {
      article: {},
      userInfo: store.getters["userStore/getUserInfo"],
      fileName: {},
    };
  },
  async created() {
    let res1 = await http.get(`/boards/${this.$route.params.articleNo}`);
    this.article = res1.data;

    let res2 = await http.get(`/files/${this.$route.params.articleNo}`);
    this.fileName = res2.data;

    console.log(this.fileName[0]);
  },

  methods: {
    async articleDelete() {
      await http.delete(`/boards/${this.$route.params.articleNo}`);
      if (this.article.bullet == "공지") this.$router.push({ name: "notice" });
      else this.$router.push({ name: "community" });
    },
    async articleEdit() {
      console.log("수정");
      this.$router.push({
        name: "edit",
        query: { articleNo: this.article.articleNo },
      });
    },
    async download(name) {
      let { data } = await http.get(`/files`, {
        params: { articleNo: this.article.articleNo, fileName: name },
        responseType: "blob",
      });
      console.log(data);

      const FileDownload = require("js-file-download");
      FileDownload(data, name);
    },
  },
};
</script>

<style scoped>
.blog-details {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border-radius: 10px;
}

.blog-details .post-img {
  margin: -30px -30px 20px -30px;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
}

.blog-details .title {
  font-size: 28px;
  font-weight: 700;
  padding: 0;
  margin: 20px 0 0 0;
  color: var(--color-default);
}

.blog-details .content {
  padding-top: 20px;
  margin-top: 10px;
  margin-bottom: 50px;
  border-top: 1px solid rgba(34, 34, 34, 0.15);
}

.blog-details .content h3 {
  font-size: 22px;
  margin-top: 30px;
  font-weight: bold;
}

.blog-details .meta-top {
  margin-top: 20px;
  color: #6c757d;
}

.blog-details .meta-top ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  align-items: center;
  padding: 0;
  margin: 0;
}

.blog-details .meta-top ul li + li {
  padding-left: 20px;
}

.blog-details .meta-top i {
  font-size: 16px;
  margin-right: 8px;
  line-height: 0;
  color: var(--color-primary);
}

.blog-details .meta-top a {
  color: #6c757d;
  font-size: 14px;
  display: inline-block;
  line-height: 1;
}

.blog-details .file-download {
  padding-top: 10px;
  border-top: 1px solid rgba(34, 34, 34, 0.15);
}
.blog-details .file-download p {
  font-size: 16px;
}

.blog-details .file-download ul {
  padding: 10px 7px 10px 7px;
  list-style-type: none;
  font-size: 14px;
  background-color: #eeeeee3d;
  color: #777f88;
  border-radius: 3px 3px 3px 3px;
  margin-bottom: 0;
}
.blog-details .file-download i {
  font-size: 20px;
  margin-right: 3px;
  line-height: 0;
  color: var(--color-primary);
}
</style>
