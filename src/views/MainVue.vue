<template>
  <div class="main-container-vue">
    <hero-section-vue />
    <client-section-vue />
    <about-us-vue class="aboutUs" />
    <service-section-vue />
  </div>
</template>

<script>
import ServiceSectionVue from "@/components/main/ServiceSectionVue";
import HeroSectionVue from "@/components/main/HeroSectionVue";
import ClientSectionVue from "@/components/main/ClientSectionVue";
import AboutUsVue from "@/components/main/AboutUsVue";

export default {
  components: {
    ServiceSectionVue,
    HeroSectionVue,
    ClientSectionVue,
    AboutUsVue,
  },

  mounted() {
    const url = new URL(window.location.href);
    const urlParams = url.pathname;
    if (urlParams === "/intro") {
      document.querySelector(".aboutUs").scrollIntoView({ behavior: "smooth" });
    }
  },
};
</script>
<style></style>
