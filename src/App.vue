<template>
  <div id="app">
    <nav>
      <HeaderVue></HeaderVue>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import HeaderVue from "@/components/include/HeaderVue";
export default {
  components: {
    HeaderVue,
  },
};
</script>

<style>
@import url("@/assets/css/style.css");
@import url("@/assets/vendor/aos/aos.css");
@import url("@/assets/vendor/bootstrap/css/bootstrap.min.css");
@import url("@/assets/vendor/boxicons/css/boxicons.min.css");
@import url("@/assets/vendor/bootstrap-icons/bootstrap-icons.css");
@import url("@/assets/vendor/glightbox/css/glightbox.min.css");
@import url("@/assets/vendor/remixicon/remixicon.css");
@import url("@/assets/vendor/swiper/swiper-bundle.min.css");
@import url("@/assets/css/style.css");

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
