<template>
  <v-app>
    <header-vue></header-vue>
    <div id="main--container">
      <router-view></router-view>
    </div>
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

<style>
#main--container {
  height: auto;
  min-height: 100%;
  padding-bottom: 97px;
}
</style>
