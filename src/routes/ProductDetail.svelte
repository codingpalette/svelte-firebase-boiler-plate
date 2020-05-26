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
