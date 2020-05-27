<script>
  import { productList, productLast } from "../../store/SiteStore";
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import NotContent from "../../components/NotContent.svelte";
  let item01 = "images/item_img01.jpg";
  let item02 = "images/item_img02.jpg";
  let item03 = "images/item_img03.jpg";
  let item04 = "images/item_img04.jpg";

  const getProducts = async () => {
    const res = await firebase
      .firestore()
      .collection("products")
      .orderBy("createdAt", "desc")
      .limit(6)
      .get();
    // console.log(res);

    $productList = res.docs.map(e => e.data());
    $productLast = res.docs[res.docs.length - 1];
    // console.log($productList);
  };

  const productPlus = async data => {
    try {
      const res = await firebase
        .firestore()
        .collection("products")
        .orderBy("createdAt", "desc")
        .startAfter(data)
        .limit(3)
        .get();
      // console.log(res);
      const plusItems = res.docs.map(e => e.data());
      $productList = [...$productList, ...plusItems];
      $productLast = res.docs[res.docs.length - 1];
    } catch (e) {
      // console.log(e);
    }
  };

  onMount(() => {
    getProducts();
  });

  const onClickProductPlus = () => {
    console.log("adas");
    productPlus($productLast);
  };
</script>

<style>
  .item_content li {
    width: 50%;
  }

  .item_content li a {
    display: block;
  }

  .item_content li dl {
    position: relative;
    padding-top: 56.25%;
  }

  .item_content li dd.img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding-top: inherit;
    overflow: hidden;
  }
  .item_content li dd.img a {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding-top: inherit;
  }

  .item_content li dd.img a figure {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

  .item_content li dd.img a figure img {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }

  @media screen and (min-width: 768px) {
    .item_content li {
      width: 33.33%;
    }
  }
</style>

<div class="section1_container ">
  <h2 class="pt-24 text-center text-3xl font-bold">OUR LATEST SHOP</h2>
  <div class="pt-4">
    <p class="text-sm text-center text-gray-600 leading-normal">
      Lorem, ipsum dolor.
    </p>
    <p class="text-sm text-center text-gray-600 leading-normal">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    </p>
  </div>

  <div class="item_content max-w-screen-lg mt-12 mr-auto ml-auto">
    {#if $productList.length >= 1}
      <div class="link_box text-center">
        <a
          href="/about/"
          use:link
          class="opacity-75 hover:opacity-100 hover:underline text-base">
          VIEW ALL SHOP
        </a>
      </div>
      <ul class="flex items-center flex-wrap">

        {#each $productList as list}
          <li class="p-4">
            <dl>
              <dt class="title pt-5 px-4 text-xl font-bold">{list.title}</dt>
              <dd class="price px-4 pt-1 text-base">
                {list.price.toLocaleString()}원
              </dd>
              <!-- <dd class="tag px-4 pt-1">
              <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm
                font-semibold text-gray-700 mr-2">
                과일
              </span>
              <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm
                font-semibold text-gray-700 mr-2">
                상큼
              </span>
            </dd> -->
              <dd class="img">
                <a href="/product/{list.id}" use:link class="relative">
                  <figure>
                    <img src={list.productCoverImages[0].src} alt="" />
                  </figure>
                </a>
              </dd>
            </dl>
          </li>
        {/each}
      </ul>

      <!-- <div class="btn_box">
      <button type="button" class="" on:click={onClickProductPlus}>
        VIEW ALL SHOP
      </button>

    </div> -->
    {:else}
      <NotContent />
    {/if}
  </div>

</div>
