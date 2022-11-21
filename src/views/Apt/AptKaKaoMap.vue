<template>
  <div class="mapContainer">
    <!-- <apt-navigation></apt-navigation> -->
    <div id="map"></div>
  </div>
</template>

<script>
// import AptNavigation from "@/views/Apt/AptNavigation";

export default {
  components: {
    // AptNavigation,
  },
  data() {
    return {
      map: null,
    };
  },
  created() {
    // console.log(process.env.VUE_APP_KAKAOMAP_KEY);
  },

  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;
      document.head.appendChild(script);
    }
  },
};
</script>

<style scoped>
.mapContainer {
  position: absolute;
  width: 100%;
  height: 100vh;
}
#map {
  width: 100%;
  height: 100%;
}
</style>
