<script>
  import { productList, productLast } from "../../store/SiteStore";
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import ShopItemList from "../../components/ShopItemList.svelte";
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
    productPlus($productLast);
  };
</script>

<style>

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
          <ShopItemList {list} />
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
