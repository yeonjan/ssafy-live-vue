<template>
  <article class="blog-details">
    <div class="post-img">
      <!-- <img src="assets/img/apt/p1.jpg" alt="" class="img-fluid" /> -->
    </div>

    <h2 class="title">
      {{ article.subject }}
    </h2>

    <div class="meta-top">
      <ul>
        <li class="d-flex align-items-center">
          <i class="bi bi-person"></i>
          <a href="#">{{ article.userId }}</a>
        </li>
        <li class="d-flex align-items-center">
          <i class="bi bi-clock"></i>
          <a href="#">{{ article.registerTime }}</a>
        </li>
      </ul>
    </div>

    <div class="content">
      <p>
        {{ article.content }}
      </p>
    </div>
    <!-- End post content -->

    <div class="meta-bottom">
      <i class="bi bi-folder"></i>
      <ul class="cats">
        <li><a href="#">Business</a></li>
      </ul>

      <i class="bi bi-tags"></i>
      <ul class="tags">
        <li><a href="#">Creative</a></li>
        <li><a href="#">Tips</a></li>
        <li><a href="#">Marketing</a></li>
      </ul>
    </div>
    <!-- End meta bottom -->
  </article>
  <!-- End blog post -->
</template>

<script>
import http from "@/util/http";
export default {
  data() {
    return {
      article: {},
    };
  },
  async created() {
    let { data } = await http.get(`/boards/${this.$route.params.articleNo}`);
    this.article = data;
    console.log(this.article);
  },
};
</script>

<style scoped>
.blog-details {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border-radius: 10px;
}

.blog-details .post-img {
  margin: -30px -30px 20px -30px;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
}

.blog-details .title {
  font-size: 28px;
  font-weight: 700;
  padding: 0;
  margin: 20px 0 0 0;
  color: var(--color-default);
}

.blog-details .content {
  margin-top: 20px;
}

.blog-details .content h3 {
  font-size: 22px;
  margin-top: 30px;
  font-weight: bold;
}

.blog-details .meta-top {
  margin-top: 20px;
  color: #6c757d;
}

.blog-details .meta-top ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  align-items: center;
  padding: 0;
  margin: 0;
}

.blog-details .meta-top ul li + li {
  padding-left: 20px;
}

.blog-details .meta-top i {
  font-size: 16px;
  margin-right: 8px;
  line-height: 0;
  color: var(--color-primary);
}

.blog-details .meta-top a {
  color: #6c757d;
  font-size: 14px;
  display: inline-block;
  line-height: 1;
}

.blog-details .meta-bottom {
  padding-top: 10px;
  border-top: 1px solid rgba(34, 34, 34, 0.15);
}

.blog-details .meta-bottom i {
  color: #555555;
  display: inline;
}

.blog-details .meta-bottom a {
  color: rgba(34, 34, 34, 0.8);
  transition: 0.3s;
}

.blog-details .meta-bottom a:hover {
  color: var(--color-primary);
}

.blog-details .meta-bottom .cats {
  list-style: none;
  display: inline;
  padding: 0 20px 0 0;
  font-size: 14px;
}

.blog-details .meta-bottom .cats li {
  display: inline-block;
}

.blog-details .meta-bottom .tags {
  list-style: none;
  display: inline;
  padding: 0;
  font-size: 14px;
}

.blog-details .meta-bottom .tags li {
  display: inline-block;
}

.blog-details .meta-bottom .tags li + li::before {
  padding-right: 6px;
  color: var(--color-default);
  content: ",";
}
.blog-details .meta-bottom .share {
  font-size: 16px;
}
.blog-details .meta-bottom .share i {
  padding-left: 5px;
}
</style>
