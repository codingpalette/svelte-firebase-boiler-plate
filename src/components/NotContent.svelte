<script>
  let notcontent = "images/notcontent.svg";
</script>

<style>
  .not_content_container {
    width: 100%;
    height: 100%;
  }

  .not_content_container .content_box img {
    max-width: 500px;
  }
</style>

<div class="not_content_container relative">
  <div
    class="content_box w-full h-full flex items-center justify-center flex-col
    relative ">
    <img src={notcontent} alt="" class="w-full h-auto " />
    <p class="text-xl font-bold text-purple-500 mt-8">NOT CONTENT</p>
  </div>

</div>
