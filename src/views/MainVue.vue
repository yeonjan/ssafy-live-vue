<template>
  <div class="main--container">
    <hero-section-vue />
    <service-section-vue />
  </div>
</template>

<script>
import ServiceSectionVue from "@/components/main/ServiceSectionVue.vue";
import HeroSectionVue from "@/components/main/HeroSectionVue";
export default {
  components: {
    ServiceSectionVue,
    HeroSectionVue,
  },
};
</script>

<style></style>
