<template>
  <div>
    <apt-navigation />
    <v-container id="kakaoMap-main-container">
      <v-row no-gutters>
        <v-col cols="2" md="2" id="aptInfo-container">
          <apt-side-bar />
        </v-col>
        <v-col cols="9" sm="9" md="8">
          <apt-ka-kao-map />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AptKaKaoMap from "@/views/Apt/AptKaKaoMap";
import AptNavigation from "@/views/Apt/AptNavigation";
import AptSideBar from "@/views/Apt/AptSideBar";

export default {
  data: () => ({
    drawer: null,
  }),
  components: {
    AptKaKaoMap,
    AptNavigation,
    AptSideBar,
  },
};
</script>

<style scoped>
#kakaoMap-main-container {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100vh;
}
#aptInfo-container {
  border: 1px solid #eeeeee;
  height: 100vh;
}
</style>
