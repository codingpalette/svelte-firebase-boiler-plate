<script>
  import { productDetailItem } from "../store/SiteStore";
  import { onMount } from "svelte";
  import { location, querystring } from "svelte-spa-router";
  import AreaTop from "../containers/productdetail/AreaTop.svelte";

  export let params = {};

  const getProduct = async () => {
    const res = await firebase
      .firestore()
      .collection("products")
      .doc(decodeURI(`${params.id}`))
      .get();
    $productDetailItem = res.data();

    console.log(res.data());
    console.log($productDetailItem);
  };

  onMount(() => {
    getProduct();
  });
</script>

<style>

</style>

<AreaTop />

<div>asdasda</div>
<p>The current page is: {$location}</p>
<p>The querystring is: {$querystring}</p>
<p>
  Your name is:
  <b>{params.id}</b>
  <b>
    {#if params.last}{params.last}{/if}
  </b>
</p>
