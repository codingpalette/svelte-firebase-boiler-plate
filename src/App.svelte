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

    #install-button{
        position: fixed;
        bottom: 10px;
        right: 10px;
    }
</style>

<UserObserver/>


<div id="install-button" class="z-40" hidden >
    <button class="h-10 w-10 flex items-center justify-center overflow-hidden rounded-full focus:shadow-none focus:outline-none bg-gray-100">
        <i class="fas fa-download"></i>
    </button>
</div>

{#if $siteOk}
    <div id="app">
        <Header/>
        <main>
            <Router {routes}/>
        </main>
        <Footer/>
    </div>
{/if}
