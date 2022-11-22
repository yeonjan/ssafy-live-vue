<template>
  <div id="map-container" class="d-flex justify-content-start">
    <!-- AptSideBar -->
    <template>
      <v-card id="aptInfoCard" class="mx-auto" width="350px" height="100vh" tile>
        <v-list flat>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <!-- <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon> -->
              <v-list-item-content>
                <v-list-item-title
                  v-text="item.text"
                  id="aptInfo-list"
                  @click="searchDetailApt(item)"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </template>

    <!-- AptDetailSideBar -->
    <template>
      <v-card id="apt-detail-info" class="mx-auto" width="500px" height="100vh" tile>
        <template>
          <v-card :loading="loading" class="mx-auto my-12" width="400px">
            <template slot="progress">
              <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>

            <v-img id="roadview" width="100%" height="250"></v-img>

            <v-card-title>{{ aptName }}</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

                <div class="grey--text ms-4">4.5 (413)</div>
              </v-row>

              <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

              <div>{{ aptAddress }}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Tonight's availability</v-card-title>

            <v-card-text>
              <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
                <v-chip>5:30PM</v-chip>

                <v-chip>7:30PM</v-chip>

                <v-chip>8:00PM</v-chip>

                <v-chip>9:00PM</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
        </template>
        <v-card-actions>
          <v-btn color="deep-purple lighten-2" text @click="reserve"> Reserve </v-btn>
        </v-card-actions>
      </v-card>
    </template>

    <!-- AptKaKaoMap -->
    <div class="mapContainer">
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      // kakaoMap
      map: null,
      markers: [], // 화면에 표시할 마커 객체
      // sidebar
      selectedItem: null,
      // detailSidebar
      loading: false,
      selection: 1,
    };
  },
  methods: {
    // ---kakaoMap---
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 4,
      };
      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
    },

    registMarker(aptInfo) {
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

      aptInfo.forEach((data) => {
        const marker = new kakao.maps.Marker({
          map: this.map,
          position: data.latlng,
          title: data.title,
          image: markerImage,
        });
        this.markers.push(marker);
      });

      // 이동할 위도 경도 위치를 생성합니다
      const moveLatLon = aptInfo[0].latlng;

      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      this.map.panTo(moveLatLon);
    },
    async searchDetailApt(item) {
      let aptDetailInfo = {
        regcode: item.code,
      };
      let latlng = item.latlng;
      this.getAddr(latlng.lat, latlng.lng);
      store.commit("aptStore/SET_APTDETAILNAME", item.text);
      store.commit("aptStore/SET_APTLATLNG", latlng);
      await this.$store.dispatch("aptStore/aptDetailList", aptDetailInfo);
    },

    getAddr(lat, lng) {
      const geocoder = new kakao.maps.services.Geocoder();
      const coord = new kakao.maps.LatLng(lat, lng);
      let callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          console.log(result[0].road_address.address_name);
          store.commit("aptStore/SET_APTADDRESS", result[0].road_address.address_name);
        }
      };
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    },
    // ---detailSidebar---
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&libraries=services&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;
      document.head.appendChild(script);

      var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
      var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

      let latlng = this.$store.state.aptStore.aptLatLng;
      console.log(latlng);
      var position = new kakao.maps.LatLng(latlng.lat, latlng);

      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      roadviewClient.getNearestPanoId(position, 50, function (panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      });
    }
  },

  computed: {
    aptInfo() {
      return this.$store.state.aptStore.aptInfo;
    },
    items() {
      let newArray = store.state.aptStore.aptInfo.map((el) => {
        return { text: el.apartmentName, code: el.aptCode, latlng: { lat: el.lat, lng: el.lng } };
      });
      return newArray;
    },
    aptName() {
      return this.$store.state.aptStore.aptDetailName;
    },

    aptDetailInfo() {
      return this.$store.state.aptStore.aptDetailInfo;
    },

    aptAddress() {
      return this.$store.state.aptStore.aptAddress;
    },
  },
  watch: {
    aptInfo: function (aptInfo) {
      var positions = [];
      aptInfo.forEach(function (regcode) {
        const position = {
          title: regcode.apartmentName,
          latlng: new kakao.maps.LatLng(regcode.lat, regcode.lng),
        };
        positions.push(position);
      });
      this.registMarker(positions);
    },
  },
  beforeDestroy() {
    store.commit("aptStore/SET_APTINFO", { aptInfo: [] });
  },
};
</script>

<style scoped>
.mapContainer {
  position: relative;
  width: 100%;
  height: 100vh;
  /* flex-grow: 2; */
}
#map {
  width: 100%;
  height: 100vh;
}

#aptInfoCard {
  overflow: auto;
  /* flex-grow: 1; */
}
</style>
