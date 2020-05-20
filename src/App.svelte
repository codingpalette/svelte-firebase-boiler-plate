<script>
  import { onMount, tick } from "svelte";
  import Router from "svelte-spa-router";
  import routes from "./routes";
  import UserObserver from "./components/UserObserver.svelte";
  import Header from "./components/Header.svelte";

  import { siteState, errorState } from "./store/SiteStore";

  onMount(async () => {
    await firebase
      .database()
      .ref()
      .child("site")
      .on(
        "value",
        sn => {
          const v = sn.val();
          if (!v) {
            firebase
              .database()
              .ref()
              .child("site")
              .set($siteState);
          }
          $siteState = v;
        },
        e => {
          console.log(e.message);
        }
      );
  });
</script>

<UserObserver />

<Header />

<Router {routes} />
