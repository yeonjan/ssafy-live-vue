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

<script>
export default {
  data() {
    return {
      loading: false,
      selection: 1,
    };
  },
  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
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
  },
  computed: {
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
};
</script>

<style></style>
