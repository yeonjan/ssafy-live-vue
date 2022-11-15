<template>
  <v-app>
    <header-vue></header-vue>
    <div class="main--container">
      <hero-section-vue />
      <service-section-vue />
    </div>
    <footer-vue></footer-vue>
  </v-app>
</template>

<script>
import HeaderVue from "@/components/include/HeaderVue";
import FooterVue from "@/components/include/FooterVue";
import ServiceSectionVue from "@/components/main/ServiceSectionVue.vue";
import HeroSectionVue from "@/components/main/HeroSectionVue";

export default {
  name: "App",

  components: {
    HeaderVue,
    FooterVue,
    ServiceSectionVue,
    HeroSectionVue,
  },

  data: () => ({
    //
  }),
  mounted() {},
};
</script>

<style></style>
