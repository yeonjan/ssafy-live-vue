<template>
  <div class="row justify-content-center">
    <div class="mt-5 mb-5"></div>
    <div class="col-lg-10 col-md-10 col-sm-12 mb-5">
      <form id="form-register">
        <input type="hidden" name="pgno" value="1" />
        <input type="hidden" name="key" value="" />
        <input type="hidden" name="word" value="" />
        <select name="bullet" class="form-select form-select-sm bullet" aria-label=".form-select-sm example">
          <option selected>글머리</option>
          <option v-if="this.admin == 'T'" value="공지">공지사항</option>
          <option value="일반">일반</option>
        </select>
        <div class="mb-3">
          <label for="subject" class="form-label">제목 : </label>
          <input type="text" class="form-control" id="subject" name="subject" placeholder="제목..." />
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
          <input id="files" type="file" class="form-control border" name="files" multiple="multiple" />
        </div>
        <div class="col-auto text-center mt-3">
          <button type="button" id="btn-register" class="btn btn-outline-primary mb-3" @click="writeArticle">
            등록
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
export default {
  data() {
    return {
      editorText: "This is initialValue.",
      editorOptions: {
        hideModeSwitch: true,
      },
      article: {
        subjet: "",
        content: "",
      },
      admin: this.$store.state.userStore.userInfo.admin,
    };
  },
  created() {
    console.log(this.editorText);
  },
  components: {
    Editor,
  },
  methods: {
    writeArticle() {
      const content = this.$refs.toastEditor.invoke("getHTML");
      console.log(content);
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
