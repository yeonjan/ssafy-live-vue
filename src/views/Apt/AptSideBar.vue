<template>
  <v-card id="aptInfoCard" class="mx-auto" width="350px" height="100vh" tile>
    <v-list flat>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i">
          <!-- <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon> -->
          <v-list-item-content>
            <v-list-item-title v-text="item.text" id="aptInfo-list" @click="searchDetailApt(item)"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      selectedItem: null,
    };
  },
  methods: {
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
  },
  mounted() {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () =>
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 4,
        };
        //지도 객체를 등록합니다.
        //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
        this.map = new kakao.maps.Map(container, options);
      });
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&libraries=services&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;
    document.head.appendChild(script);
  },

  computed: {
    items() {
      let newArray = store.state.aptStore.aptInfo.map((el) => {
        return { text: el.apartmentName, code: el.aptCode, latlng: { lat: el.lat, lng: el.lng } };
      });
      return newArray;
    },
  },
  beforeDestroy() {
    store.commit("aptStore/SET_APTINFO", { aptInfo: [] });
  },
};
</script>

<style>
#aptInfoCard {
  overflow: auto;
  /* flex-grow: 1; */
}
</style>
