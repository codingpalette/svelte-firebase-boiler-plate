<script>
    import {shopList , shopLast} from '../store/ProductStore'
    import {onMount} from "svelte";
    import {link} from "svelte-spa-router";
    import SectionLayout from '../components/layout/SectionLayout.svelte'
    import ProgressBar from '../components/utils/ProgressBar.svelte'

    let productList = []
    let lastPost = '';
    let scrollStart = true;
    let loading = true;

    const getProducts = async () => {
        if ($shopList.length < 1) {
            const res = await firebase
                    .firestore()
                    .collection("products")
                    .orderBy("createdAt", "desc")
                    .limit(20)
                    .get();
            // console.log(res);

            $shopList = res.docs.map(e => e.data());
            $shopLast = res.docs[res.docs.length - 1]
            // productList = res.docs[res.docs.length - 1];
            // console.log($shopList);
            loading = false;
        }
        loading = false;

    };
    onMount(() => {
        getProducts();
    });

</script>

<style>
    .columns {
        position: relative;
        column-count: 1;
        column-gap: 1rem;
    }

    .columns .fit {
        display: inline-block;
        margin: 0 0 1rem 0;
        width: 100%;
        position: relative;
        overflow: hidden;
        border-radius: 4px;
        border: 0;
    }

    .columns .fit img {
        width: 100%;
        display: block;
        transition: transform 0.2s ease-in-out;
    }
    .columns .fit:hover img {
        transform: scale(1.1);
    }

    .columns .fit .text_box{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: transform 0.2s ease-in-out;
    }

    .columns .fit:hover .text_box{
        opacity: 1;
    }

    @media screen and (min-width: 480px){
        .columns {

            column-count: 2;
        }
    }

    @media screen and (min-width: 768px) {
        .columns {
            column-count: 4;
        }
    }
</style>

{#if loading}
    <ProgressBar />

{:else}

    {#if $shopList.length >= 1}
        <div class="shop_container p-8 box-border">
            <div class="inner max-w-full">
                <div class="columns">
                    {#each $shopList as list}
                        <div class="fit">
                            <a href="/">
                                <img src="{list.productCoverImages[0].src}" alt="">
                                <div class="text_box bg-black bg-opacity-50 text-white flex items-center justify-center text-lg">
                                    {list.title}
                                </div>
                            </a>
                        </div>
                    {/each}

                </div>
            </div>

        </div>
    {/if}

{/if}

