<template>
  <div class="mapContainer">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      markers: [], // 화면에 표시할 마커 객체
    };
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

    registMarker(aptDetailInfo) {
      // 현재 표시된 마커가 있다면 marker에 등록된 map을 없애준다.
      if (this.markers.length > 0) {
        this.markers.forEach((item) => {
          item.setMap(null);
        });
      }
      // 마커 이미지 생성
      const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      // 마커 이미지의 이미지 크기 입니다
      const imageSize = new kakao.maps.Size(24, 35);
      // 마커 이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      aptDetailInfo.forEach((data) => {
        const marker = new kakao.maps.Marker({
          map: this.map,
          position: data.LatLng,
          title: data.title,
          image: markerImage,
        });
        this.markers.push(marker);
      });
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

  computed: {
    aptDetailInfo() {
      let data = this.$store.state.aptStore.aptDetailInfo;
      console.log(data);
      var positions = [];
      data.regcodes.forEach(function (regcode) {
        var position = {
          title: regcode.apartmentName,
          latlng: new kakao.maps.LatLng(regcode.lat, regcode.lng),
        };
        positions.push(position);
      });
      console.log(positions);
      this.registMarker(positions);
      return data;
    },
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
