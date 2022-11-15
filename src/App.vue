<template>
  <v-app>
    <header-vue></header-vue>
    <router-view></router-view>
    <footer-vue></footer-vue>
  </v-app>
</template>

<script>
import HeaderVue from "@/components/include/HeaderVue";
import FooterVue from "@/components/include/FooterVue";

export default {
  name: "App",

  components: {
    HeaderVue,
    FooterVue,
  },

  data: () => ({
    //
  }),
  mounted() {},
};
</script>

<style></style>
