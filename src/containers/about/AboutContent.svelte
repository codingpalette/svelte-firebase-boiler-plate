<script>
  let aboutImg01 = "images/about_img01.jpg";
</script>

<style>
  .about_content {
    position: relative;
    margin-top: -200px;
  }
  .about_content .content {
    background-color: #fff;
    margin: 0 auto;
  }
  .flex_content > div {
    width: 47.5%;
  }
  .flex_content .right img {
    position: relative;
    transform: translateY(30px);
  }
</style>

<section class="about_content p-4 z-20">
  <div class="content max-w-screen-lg p-4 rounded ">
    <div class="flex_content flex items-center flex-wrap justify-between">
      <div class="left">
        <div class="text_box">
          <strong>서브타이틀</strong>
          <h3>메인타이틀</h3>
          <p>일반텍스트</p>
        </div>
      </div>
      <div class="right">
        <div class="image_box">
          <img src={aboutImg01} alt="" />
        </div>
      </div>
    </div>

  </div>

</section>
