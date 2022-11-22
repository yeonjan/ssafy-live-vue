<template>
  <div id="board-list">
    <div>
      <v-btn color="#FFD369" elevation="1"> <router-link to="/board/write">글쓰기</router-link></v-btn>
    </div>
    <div>
      <v-card>
        <v-card-title>
          자유 게시판
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="shrink"
          >
          </v-text-field>
        </v-card-title>

        <v-data-table
          dense
          :headers="headers"
          :items="articles"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          :search="search"
          :sort-by="['registerTime']"
          :sort-desc="['true']"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
          @click:row="openDetails"
        >
        </v-data-table>
      </v-card>
    </div>
    <div class="text-center">
      <v-pagination color="#393E46" v-model="page" :length="pageCount"></v-pagination>
    </div>
  </div>
</template>
<script>
import http from "@/util/http";
export default {
  data() {
    return {
      search: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 15,
      headers: [
        {
          text: "글머리",
          align: "start",
          sortable: false,
          value: "bullet",
          width: "10%",
        },
        {
          text: "제목",
          align: "start",
          sortable: false,
          value: "subject",
          width: "40%",
        },
        { text: "작성자", value: "userName", width: "20%" },
        { text: "작성일", value: "registerTime", width: "20%" },
        { text: "조회", value: "hit", width: "10%" },
      ],
      articles: [],
    };
  },
  async created() {
    let { data } = await http.get("/boards", { params: { type: "" } });
    console.log(data);
    this.articles = data;
  },
  methods: {
    openDetails(data) {
      this.$router.push(`/board/detail/${data.articleNo}`);
    },
  },
};
</script>

<style scoped>
#board-list {
  display: flex;
  flex-direction: column;
}
.v-btn {
  color: #393e46;
  font-size: 14px;
  float: right;
  margin: 0 0 8px 0;
}

a {
  text-decoration: none;
  color: #393e46;
  font-weight: 600;

  /* color: #393e46 !important; */
}
</style>
