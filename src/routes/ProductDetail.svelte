<script>
  import { onMount } from "svelte";
  import { location, querystring } from "svelte-spa-router";

  export let params = {};

  const getProduct = async () => {
    const res = await firebase
      .firestore()
      .collection("products")
      .doc(decodeURI(`${params.id}`))
      .get();

    console.log(res.data());
  };

  onMount(() => {
    getProduct();
  });
</script>

<style>

</style>

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
