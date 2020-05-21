<script>
  let item01 = "images/item_img01.jpg";
</script>

<style>
  .item_content li {
    width: 33.33%;
  }

  .item_content li a {
    display: block;
  }
  .item_content li a:before {
    content: "";
    display: block;
    width: 100%;
    padding-bottom: 100%;
  }
  .item_content li img {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }
</style>

<div class="section1_container bg-gray-100">
  <h2 class="pt-24 text-center text-3xl font-bold">
    마음에 드는 식재료를 고르는것부터 시작해보세요
  </h2>
  <div class="pt-4">
    <p class="text-sm text-center text-gray-600 leading-normal">
      음식의 식재료는 중요하니깐.
    </p>
    <p class="text-sm text-center text-gray-600 leading-normal">
      수많은 사람들의 선택한 신선한 식재료를 제공할 뿐이에요.
    </p>
  </div>

  <div class="item_content max-w-screen-lg mt-24 mr-auto ml-auto">
    <ul class="flex items-center flex-wrap">
      <li>
        <div class="p-4 box-border">
          <a href="/" class="relative">
            <img src={item01} alt="" />
          </a>
          <div class="item_text_box">
            <p class="item_tit">석류</p>
            <p class="item_price">15,000원</p>
          </div>
        </div>
      </li>

    </ul>
  </div>

</div>
