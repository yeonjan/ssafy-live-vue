<template>
  <div id="board-write" class="row justify-content-center">
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
        <option v-if="this.admin == 'T'" value="공지">공지사항</option>
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
          ref="toastEditor"
          :initialValue="editorText"
          :options="editorOptions"
          height="500px"
          initialEditType="wysiwyg"
          previewStyle="vertical"
        />
        <!-- <textarea class="form-control" id="content" name="content" rows="7"></textarea> -->
      </div>
      <div class="form-group" align="left">
        <label for="files">파일:</label>
        <input ref="files" type="file" class="form-control border" name="files[]" multiple="multiple" />
      </div>
      <div class="col-auto text-center mt-3">
        <v-btn
          color="#FFD369"
          elevation="1"
          id="btn-register"
          class="btn btn-outline-primary mb-3"
          @click="writeArticle"
          >등록</v-btn
        >
      </div>
    </form>
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
      editorText: "내용을 입력해주세요",
      editorOptions: {
        hideModeSwitch: true,
      },
      article: {
        bullet: "글머리",
        subject: null,
        content: "",
      },
      admin: store.getters["userStore/getUserInfo"].admin,
      userId: store.getters["userStore/getUserInfo"].id,
    };
  },
  created() {
    console.log(this.editorText);
  },
  components: {
    Editor,
  },
  methods: {
    async writeArticle() {
      const content = this.$refs.toastEditor.invoke("getHTML");
      if (this.article.bullet == "글머리") {
        alert("글머리를 입력해주세요");
      } else if (this.article.subject == null) {
        alert("제목을 입력해주세요");
      } else if (content == "<p>내용을 입력해주세요</p>") {
        alert("내용을 입력해주세요");
      } else {
        console.log(content);
        const form = new FormData();
        form.append("bullet", this.article.bullet);
        form.append("subject", this.article.subject);
        form.append("content", content);
        form.append("userId", this.userId);

        const inputFiles = this.$refs.files.files;
        for (var i = 0; i < inputFiles.length; i++) {
          form.append("files", inputFiles[i]);
        }

        //form.getAll("files", "name");
        console.log(form.getAll("files"));
        let { data } = await http.post("/boards", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.$router.push(`/board/detail/${data.articleNo}`);
        //this.$router.go(-1);
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
#board-write {
  /* width: 60%; */
  margin: 3% 0 5% 0;
}

.v-btn {
  color: #393e46;
  font-size: 15px;
  margin: 10px 0 8px 0;
}
</style>
