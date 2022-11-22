<template>
  <div>
    <apt-navigation />
    <div id="map-container" class="d-flex justify-content-start">
      <apt-side-bar />
      <apt-detail-side-bar />
      <apt-ka-kao-map />
    </div>
    <!-- <v-container id="map-container" class="d-flex justify-content-start">
      <v-row no-gutters>
        <v-col cols="2" md="2" id="aptInfo-container">
          <apt-side-bar />
        </v-col>
        <v-col cols="9" sm="9" md="8">
          <apt-ka-kao-map />
        </v-col>
      </v-row>
    </v-container> -->
  </div>
</template>

<script>
import AptKaKaoMap from "@/views/Apt/AptKaKaoMap";
import AptNavigation from "@/views/Apt/AptNavigation";
import AptSideBar from "@/views/Apt/AptSideBar";
import AptDetailSideBar from "@/views/Apt/AptDetailSideBar";

export default {
  data: () => ({
    drawer: null,
  }),
  components: {
    AptKaKaoMap,
    AptNavigation,
    AptSideBar,
    AptDetailSideBar,
  },
};
</script>

<style scoped>
#aptInfo-container {
  display: flex;
  border: 1px solid #eeeeee;
  height: 100vh;
}
</style>
