<template>
  <div>
    <apt-navigation></apt-navigation>
    <apt-ka-kao-map></apt-ka-kao-map>
  </div>
</template>

<script>
import AptNavigation from "@/views/Apt/AptNavigation";
import AptKaKaoMap from "@/views/Apt/AptKaKaoMap";

export default {
  components: {
    AptKaKaoMap,
    AptNavigation,
  },
};
</script>

<style></style>
