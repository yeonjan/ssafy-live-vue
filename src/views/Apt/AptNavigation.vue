<template>
  <div class="map-nav-container">
    <div class="row col-md-12 justify-content-center mb-2">
      <div class="form-group col-md-2">
        <select class="form-select bg-secondary text-light" id="sido">
          <option value="">시도선택</option>
        </select>
      </div>

      <div class="form-group col-md-2">
        <select class="form-select bg-secondary text-light" id="gugun">
          <option value="">구군선택</option>
        </select>
      </div>

      <div class="form-group col-md-2">
        <select class="form-select bg-secondary text-light" id="dong">
          <option value="">동선택</option>
        </select>
      </div>

      <!-- <div class="form-group col-md-2">
        <select class="form-select bg-dark text-light" id="year"></select>
      </div>

      <div class="form-group col-md-2">
        <select class="form-select bg-dark text-light" id="month">
          <option value="">매매월선택</option>
        </select>
      </div> -->

      <div class="form-group col-md-2">
        <button type="button" id="list-btn" class="btn btn-outline-primary" @click="searchApt()">검색</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      aptInfo: {},
      aptDetailInfo: {},
    };
  },

  methods: {
    async searchApt() {
      let dongSel = document.querySelector("#dong");
      let regCodeInfo = dongSel[dongSel.selectedIndex].value;
      let aptInfo = {
        regcode: regCodeInfo,
      };
      await store.dispatch("aptStore/aptList", aptInfo);
      this.aptInfo = store.state.aptStore.aptInfo;
    },

    // async searchDetailApt() {
    //   let dongSel = document.querySelector("#dong");
    //   let regCodeInfo = dongSel[dongSel.selectedIndex].value;
    //   let aptDetailInfo = {
    //     regcode: regCodeInfo,
    //   };
    //   await store.dispatch("aptStore/aptDetailList", aptDetailInfo);
    //   this.aptDetailInfo = store.state.aptStore.aptDetailInfo;
    //   console.log(this.aptDetailInfo);
    // },
  },
  mounted() {
    // let date = new Date();
    window.onload = function () {
      //   let yearEl = document.querySelector("#year");
      //   let yearOpt = `<option value="">매매년도선택</option>`;
      //   let year = date.getFullYear();
      //   for (let i = year; i > year - 20; i--) {
      //     yearOpt += `<option value="${i}">${i}년</option>`;
      //   }
      //   yearEl.innerHTML = yearOpt;

      // 브라우저가 열리면 시도정보 얻기.
      sendRequest("sido", "*00000000", "sido");
    };

    // document.querySelector("#year").addEventListener("change", function () {
    //   let month = date.getMonth() + 1;
    //   let monthEl = document.querySelector("#month");
    //   let monthOpt = `<option value="">매매월선택</option>`;
    //   let yearSel = document.querySelector("#year");
    //   let m = yearSel[yearSel.selectedIndex].value == date.getFullYear() ? month : 13;
    //   for (let i = 1; i < m; i++) {
    //     monthOpt += `<option value="${i < 10 ? "0" + i : i}">${i}월</option>`;
    //   }
    //   monthEl.innerHTML = monthOpt;
    // });

    // 시도가 바뀌면 구군정보 얻기.
    document.querySelector("#sido").addEventListener("change", function () {
      if (this[this.selectedIndex].value) {
        let regcode = this[this.selectedIndex].value.substr(0, 2) + "*00000";
        sendRequest("gugun", regcode, "gugun");
      } else {
        initOption("gugun");
        initOption("dong");
      }
    });

    // 구군이 바뀌면 동정보 얻기.
    document.querySelector("#gugun").addEventListener("change", function () {
      if (this[this.selectedIndex].value) {
        let regcode = this[this.selectedIndex].value.substr(0, 5) + "*";
        sendRequest("dong", regcode, "dong");
      } else {
        initOption("dong");
      }
    });

    async function sendRequest(selid, regcode, action) {
      let optionInfo = {
        selid: selid,
        regcode: regcode,
        action: action,
      };
      console.log(store);
      await store.dispatch("aptStore/sendRequest", optionInfo);

      let responseInfo = store.state.aptStore.optionInfo;
      addOption(selid, responseInfo);
    }

    function addOption(selid, data) {
      let opt = ``;
      initOption(selid);
      switch (selid) {
        case "sido":
          opt += `<option value="">시도선택</option>`;
          data.regcodes.forEach(function (regcode) {
            opt += `<option value="${regcode.dongCode}">${regcode.sidoName}</option>`;
          });
          break;
        case "gugun":
          opt += `<option value="">구군선택</option>`;
          data.regcodes.forEach(function (regcode) {
            opt += `<option value="${regcode.dongCode}">${regcode.gugunName}</option>`;
          });
          break;
        case "dong":
          opt += `<option value="">동선택</option>`;
          data.regcodes.forEach(function (regcode) {
            opt += `<option value="${regcode.dongCode}">${regcode.dongName}</option>`;
          });
      }
      document.querySelector(`#${selid}`).innerHTML = opt;
    }

    function initOption(selid) {
      let options = document.querySelector(`#${selid}`);
      options.length = 0;
    }
  },
};
</script>

<style scoped>
.map-nav-container {
  margin: 0px;
  padding: 10px;
}

.v-application .mb-2 {
  margin: 0px !important;
  padding: 0px;
}
</style>
