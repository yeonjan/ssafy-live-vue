<template>
  <div class="row justify-content-center">
    <div class="mt-5 mb-5"></div>
    <div class="col-lg-10 col-md-10 col-sm-12 mb-5">
      <form id="form-register">
        <input type="hidden" name="pgno" value="1" />
        <input type="hidden" name="key" value="" />
        <input type="hidden" name="word" value="" />
        <select
          name="bullet"
          class="form-select form-select-sm bullet"
          aria-label=".form-select-sm example"
          v-model="article.bullet"
        >
          <option value="글머리" disabled selected>글머리</option>
          <option v-if="this.admin" value="공지">공지사항</option>
          <option value="일반">일반</option>
        </select>
        <div class="mb-3">
          <label for="subject" class="form-label">제목 : </label>
          <input
            type="text"
            class="form-control"
            id="subject"
            name="subject"
            placeholder="제목..."
            v-model="article.subject"
          />
        </div>

        <div class="mb-3">
          <label for="content" class="form-label">내용 : </label>
          <Editor
            v-if="article.content != null"
            ref="toastEditor"
            :initialValue="article.content"
            :options="editorOptions"
            height="500px"
            initialEditType="wysiwyg"
            previewStyle="vertical"
          />
          <!-- <textarea class="form-control" id="content" name="content" rows="7"></textarea> -->
        </div>
        <div class="form-group" align="left">
          <label for="files">파일:</label>
          <input
            ref="files"
            type="file"
            class="form-control border"
            name="files[]"
            multiple="multiple"
          />
        </div>
        <div class="col-auto text-center mt-3">
          <button
            type="button"
            id="btn-register"
            class="btn btn-outline-primary mb-3"
            @click="editeArticle"
          >
            수정
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import http from "@/util/http";
import store from "@/store";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
export default {
  data() {
    return {
      //editorText: "내용을 입력해주세요",
      editorOptions: {
        hideModeSwitch: true,
      },
      article: {
        //content: "asd",
      },
      admin: store.getters["userStore/getUserInfo"].admin,
      userId: store.getters["userStore/getUserInfo"].id,
    };
  },
  async created() {
    let { data } = await http.get(`/boards/${this.$route.query.articleNo}`);
    this.article = data;
    console.log(this.article);
  },
  components: {
    Editor,
  },
  methods: {
    async editeArticle() {
      const content = this.$refs.toastEditor.invoke("getHTML");
      if (this.article.bullet == "글머리") {
        alert("글머리를 입력해주세요");
      } else if (this.article.subject == null) {
        alert("제목을 입력해주세요");
      } else {
        console.log(content);
        const form = new FormData();
        form.append("bullet", this.article.bullet);
        form.append("subject", this.article.subject);
        form.append("content", content);
        form.append("userId", this.userId);
        form.append("articleNo", this.article.articleNo);
        form.append("hit", this.article.hit);

        const inputFiles = this.$refs.files.files;
        for (var i = 0; i < inputFiles.length; i++) {
          form.append("files", inputFiles[i]);
        }

        //form.getAll("files", "name");
        console.log(this.article);
        await http.put("/boards", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        //게시글 상세보기 페이지로 이동
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style>
select.bullet {
  display: inline;
  width: auto;
  margin-bottom: 15px;
}
</style>
