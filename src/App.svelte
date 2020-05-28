<script>
  import { siteState, errorState, siteOk } from "./store/SiteStore";
  import { onMount, tick } from "svelte";
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import UserObserver from "./components/UserObserver.svelte";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";

  // onMount(async () => {
  //   await firebase
  //     .database()
  //     .ref()
  //     .child("site")
  //     .on(
  //       "value",
  //       sn => {
  //         const v = sn.val();
  //         // console.log(v);
  //         if (!v) {
  //           firebase
  //             .database()
  //             .ref()
  //             .child("site")
  //             .set($siteState);
  //         }
  //         $siteState = v;
  //         $siteOk = true;
  //       },
  //       e => {
  //         console.log(e.message);
  //       }
  //     );
  // });
</script>

<style>
  #app {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
  }
</style>

<UserObserver />
{#if $siteOk}
  <div id="app">
    <Header />
    <main>
      <Router {routes} />
    </main>
    <Footer />
  </div>
{/if}
