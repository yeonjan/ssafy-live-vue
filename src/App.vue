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
@font-face {
  font-family: "neo";
  src: url("@/assets/font/Neo/AppleSDGothicNeoM.ttf") format("truetype");
  font-weight: 300;
}

#main--container {
  display: flex;
  flex-direction: column;
  flex-grow: 3;
}
</style>
