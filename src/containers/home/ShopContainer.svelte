<script>
  import { productList } from "../../store/SiteStore";
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  let item01 = "images/item_img01.jpg";
  let item02 = "images/item_img02.jpg";
  let item03 = "images/item_img03.jpg";
  let item04 = "images/item_img04.jpg";

  const getProducts = async () => {
    const res = await firebase
      .firestore()
      .collection("products")
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();
    // console.log(res);

    $productList = res.docs.map(e => e.data());
    // console.log($productList);
  };

  onMount(() => {
    getProducts();
  });
</script>

<style>
  .item_content li {
    width: 50%;
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

  .item_content .item_text_box {
    height: 100px;
  }

  @media screen and (min-width: 768px) {
    .item_content li {
      width: 33.33%;
    }
  }
</style>

<div class="section1_container ">
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
      {#each $productList as list}
        <li class="p-4 ">
          <div
            class="box-border rounded overflow-hidden border-solid border
            border-gray-300 shadow">
            <a href="/product/{list.id}" use:link class="relative">
              <img src={list.productCoverImages[0].src} alt="" />
            </a>
            <div class="item_text_box p-4">
              <p class="item_tit my-2 text-sm text-gray-700 truncate">
                {list.title}
              </p>
              <p class="item_price text-xl">{list.price.toLocaleString()}원</p>
            </div>
          </div>
        </li>
      {/each}

    </ul>
  </div>

</div>
