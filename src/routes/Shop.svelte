<script>
    import {onMount} from "svelte";
    import {link} from "svelte-spa-router";
    import SectionLayout from '../components/layout/SectionLayout.svelte'

    let Img01 = "images/about_img01.jpg";

    let productList = []
    let lastPost = '';
    let scrollStart = true;
    const getProducts = async () => {
        const res = await firebase
                .firestore()
                .collection("products")
                .orderBy("createdAt", "desc")
                .limit(20)
                .get();
        // console.log(res);

        productList = res.docs.map(e => e.data());
        lastPost = res.docs[res.docs.length - 1]
        // productList = res.docs[res.docs.length - 1];
        console.log(productList);
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

{#if productList.length >= 1}
<div class="shop_container p-8 box-border">
    <div class="inner max-w-full">
        <div class="columns">
            {#each productList as list}
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