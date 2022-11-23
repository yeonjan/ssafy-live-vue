<template>
  <!-- ======= Services Section ======= -->
  <section id="services" class="services section-bg">
    <div class="container" data-aos="fade-up">
      <div class="section-title">
        <h2>News</h2>
      </div>

      <div class="row">
        <div class="col-xl-3 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
          <div class="icon-box">
            <div class="icon">
              <i class="bx bxl-dribbble"></i>
            </div>
            <h4>
              <a v-bind:href="news[0].link" v-html="news[0].title"></a>
            </h4>
            <p v-html="news[0].description"></p>
          </div>
        </div>

        <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
          <div class="icon-box">
            <div class="icon">
              <i class="bx bx-file"></i>
            </div>
            <h4>
              <a v-bind:href="news[1].link" v-html="news[1].title"></a>
            </h4>
            <p v-html="news[1].description"></p>
          </div>
        </div>

        <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="300">
          <div class="icon-box">
            <div class="icon">
              <i class="bx bx-tachometer"></i>
            </div>
            <h4>
              <a v-bind:href="news[2].link" v-html="news[2].title"></a>
            </h4>
            <p v-html="news[2].description"></p>
          </div>
        </div>

        <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="400">
          <div class="icon-box">
            <div class="icon">
              <i class="bx bx-layer"></i>
            </div>
            <h4>
              <a v-bind:href="news[3].link" v-html="news[3].title"></a>
            </h4>
            <p v-html="news[3].description"></p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Services Section -->
</template>

<script>
import http from "@/util/http";
export default {
  data() {
    return {
      news: "",
    };
  },
  async created() {
    let { data } = await http.get("/search");
    this.news = data.items;
    console.log(this.news);
  },
};
</script>

<style scoped>
.services .icon-box {
  box-shadow: 0px 0 25px 0 rgba(0, 0, 0, 0.1);
  padding: 50px 30px;
  transition: all ease-in-out 0.4s;
}

.services .icon-box .icon {
  margin-bottom: 10px;
}

.services .icon-box .icon i {
  color: #47b2e4;
  font-size: 36px;
  transition: 0.3s;
}

.services .icon-box h4 {
  font-weight: 500;
  margin-bottom: 15px;
  font-size: 24px;
}

.services .icon-box h4 a {
  color: #37517e;
  transition: ease-in-out 0.3s;
  text-decoration: none;
}

.services .icon-box p {
  line-height: 24px;
  font-size: 14px;
  margin-bottom: 0;
}

.services .icon-box:hover {
  transform: translateY(-10px);
}

.services .icon-box:hover h4 a {
  color: #47b2e4;
}
</style>
