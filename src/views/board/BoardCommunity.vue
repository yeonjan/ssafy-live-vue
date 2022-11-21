<template>
  <div>
    <v-card>
      <v-card-title>
        자유 게시판
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details class="shrink">
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
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination></div
    ></v-card>
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

<style scoped></style>
