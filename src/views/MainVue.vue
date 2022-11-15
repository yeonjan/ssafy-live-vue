<template>
  <div class="main--container">
    <hero-section-vue />
    <client-section-vue />
    <about-us-vue/>
    <service-section-vue/>
    <cta-section-vue/>
  </div>
</template>

<script>
import ServiceSectionVue from "@/components/main/ServiceSectionVue";
import HeroSectionVue from "@/components/main/HeroSectionVue";
import ClientSectionVue from "@/components/main/ClientSectionVue";
import AboutUsVue from "@/components/main/AboutUsVue";
import CtaSectionVue from "@/components/main/CtaSectionVue";

export default {
  components: {
    ServiceSectionVue,
    HeroSectionVue,
    ClientSectionVue,
    AboutUsVue,
    CtaSectionVue,
  },
};
</script>
<style></style>
