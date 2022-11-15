<template>
  <div class="main--container">
    <hero-section-vue />
    <client-section-vue />
    <service-section-vue />
  </div>
</template>

<script>
import ServiceSectionVue from "@/components/main/ServiceSectionVue";
import HeroSectionVue from "@/components/main/HeroSectionVue";
import ClientSectionVue from "@/components/main/ClientSectionVue";

export default {
  components: {
    ServiceSectionVue,
    HeroSectionVue,
    ClientSectionVue,
  },
};
</script>
<style></style>
