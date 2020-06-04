<script>
    import {siteOk} from "./store/SiteStore";
    import Router from "svelte-spa-router";
    import routes from "./routes";
    import UserObserver from "./components/utils/UserObserver.svelte";
    import Header from "./components/utils/Header.svelte";
    import Footer from "./components/utils/Footer.svelte";
</script>

<style>
    #app {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 100vh;
    }
</style>

<UserObserver/>
{#if $siteOk}
    <div id="app">
        <Header/>
        <main>
            <Router {routes}/>
        </main>
        <Footer/>
    </div>
{/if}
