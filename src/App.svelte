<script>
  import { onMount, tick } from "svelte";
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import UserObserver from "./components/UserObserver.svelte";
  import Header from "./components/Header.svelte";

  import { siteState, errorState, siteOk } from "./store/SiteStore";

  onMount(async () => {
    await firebase
      .database()
      .ref()
      .child("site")
      .on(
        "value",
        sn => {
          const v = sn.val();
          // console.log(v);
          if (!v) {
            firebase
              .database()
              .ref()
              .child("site")
              .set($siteState);
          }
          $siteState = v;
          $siteOk = true;
        },
        e => {
          console.log(e.message);
        }
      );
  });
</script>

<UserObserver />

<Header />
{#if $siteOk}
  <Router {routes} />
{/if}
