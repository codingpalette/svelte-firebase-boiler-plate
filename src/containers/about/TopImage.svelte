<script>
  let backImg = "images/about_img04.jpg";
</script>

<style>
  .top_image {
    position: relative;
    width: 100%;
    height: calc(100vh);
  }
  .top_image img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .top_image .text_box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.35);
    text-align: center;
  }
  .top_image .text_box strong {
    margin-top: -100px;
  }
</style>

<div class="top_image">
  <img src={backImg} alt="" />
  <div class="text_box p-4">
    <strong class="text-4xl">ABOUT</strong>
    <p class="text-lg">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    </p>
    <p class="text-lg">Lorem ipsum dolor sit amet.</p>
  </div>
</div>
