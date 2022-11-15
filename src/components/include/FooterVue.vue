<template>
  <div>
    <!-- ======= Footer ======= -->
    <footer id="footer">
      <div class="container footer-bottom clearfix">
        <div class="d-flex">
          <div class="pa-2 copyright">
            &copy; SSAFY Corp. <strong><span>Live</span></strong
            >. All Rights Reserved
          </div>
          <div>
            <v-btn v-for="icon in icons" :key="icon" class="pa-2" dark icon>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </div>
          <div class="pa-2 ml-auto credits">Designed by <a href="#">JYJ KTS</a></div>
        </div>
      </div>
    </footer>
    <!-- End Footer -->
    <!-- <div id="preloader"></div>
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"
      ><i class="bi bi-arrow-up-short"></i
    ></a> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>

<style scoped>
#footer {
  width: 100%;
  display: flex;
  background: #222831 !important;
  align-items: center;
}

#footer .credits a {
  text-decoration: none;
  color: #ffd369;
}
</style>
