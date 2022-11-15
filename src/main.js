import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// BootStrap 관련 import
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import vuetify from "./plugins/vuetify";

// vue aos 관련 import
import AOS from "aos";
import "aos/dist/aos.css";

// Vendor JS 관련 import
// import "@/assets/vendor/aos/aos.js";
// import "@/assets/vendor/bootstrap/js/bootstrap.bundle.min.js";
// import "@/assets/vendor/glightbox/js/glightbox.min.js";
// import "/assets/vendor/isotope-layout/isotope.pkgd.min.js";
// import "@/assets/vendor/swiper/swiper-bundle.min.js";
// import "@/assets/vendor/waypoints/noframework.waypoints.js";
// import "@/assets/vendor/php-email-form/validate.js";
// Main JS File
import "@/assets/js/main.js";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  created() {
    AOS.init();
  },
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
