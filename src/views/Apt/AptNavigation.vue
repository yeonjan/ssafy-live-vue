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

      <div class="form-group col-md-2">
        <select class="form-select bg-dark text-light" id="year"></select>
      </div>

      <div class="form-group col-md-2">
        <select class="form-select bg-dark text-light" id="month">
          <option value="">매매월선택</option>
        </select>
      </div>

      <div class="form-group col-md-2">
        <button type="button" id="list-btn" class="btn btn-outline-primary">검색</button>
      </div>
    </div>
    <!-- <div class="map_main_container" style="display: none">
      <div style="height: 70px"></div>

      <div class="alert alert-primary mt-3"><strong>국토교통부</strong> 지역별 아파트매매 거래 정보</div>

      <div class="row col-md-12">
        <div class="form-group ms-2 mb-2 text-end">
          <button type="button" id="btn-list" class="btn btn-outline-danger">아파트 정보</button>
        </div>
      </div>
    </div> -->
    <!-- <table class="table table-hover text-center" style="display: none">
      <tr>
        <th>즐겨찾기</th>

        <th>아파트이름</th>

        <th>층</th>

        <th>면적</th>

        <th>법정동</th>

        <th>거래금액</th>

        <th style="display: none">aptNo</th>
      </tr>

      <tbody id="aptlist"></tbody>
    </table> -->
  </div>
</template>

<script>
import store from "@/store";

export default {
  mounted() {
    let date = new Date();
    window.onload = function () {
      let yearEl = document.querySelector("#year");
      let yearOpt = `<option value="">매매년도선택</option>`;
      let year = date.getFullYear();
      for (let i = year; i > year - 20; i--) {
        yearOpt += `<option value="${i}">${i}년</option>`;
      }
      yearEl.innerHTML = yearOpt;

      // 브라우저가 열리면 시도정보 얻기.
      sendRequest("sido", "*00000000", "sido");
    };

    document.querySelector("#year").addEventListener("change", function () {
      let month = date.getMonth() + 1;
      let monthEl = document.querySelector("#month");
      let monthOpt = `<option value="">매매월선택</option>`;
      let yearSel = document.querySelector("#year");
      let m = yearSel[yearSel.selectedIndex].value == date.getFullYear() ? month : 13;
      for (let i = 1; i < m; i++) {
        monthOpt += `<option value="${i < 10 ? "0" + i : i}">${i}월</option>`;
      }
      monthEl.innerHTML = monthOpt;
    });

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
      console.log("sendRequest 실행");
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
      console.log(data);
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
}

.v-application .mb-2 {
  margin: 0px !important;
  padding: 0px;
}
</style>
