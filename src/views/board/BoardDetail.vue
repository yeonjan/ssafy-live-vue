<template>
  <div class="row justify-content-center">
    <div class="col-lg-8 col-md-10 col-sm-12 mt-2"></div>
    <div class="col-lg-8 col-md-10 col-sm-12">
      <div class="row my-2">
        <h2 class="subject text-secondary px-5">1</h2>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="clearfix align-content-center">
            <img
              class="avatar me-2 float-md-start bg-light p-2"
              src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
            />
            <p>
              <span class="userId fw-bold"></span> <br />
              <span class="hit text-secondary fw-light"></span>
            </p>
          </div>
        </div>
        <div class="divider mb-3"></div>
        <div class="content text-secondary"></div>
        <div class="divider mt-3 mb-3"></div>
        <div class="d-flex justify-content-end">
          <button type="button" id="btn-list" class="btn btn-outline-primary mb-3">글목록</button>
          <button type="button" id="btn-mv-modify" class="btn btn-outline-success mb-3 ms-1">글수정</button>
          <button type="button" id="btn-delete" class="btn btn-outline-danger mb-3 ms-1">글삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
