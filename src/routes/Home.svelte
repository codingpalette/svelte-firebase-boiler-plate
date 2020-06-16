<script>
    import {homeList} from '../store/ProductStore'
    import { onMount } from "svelte"
    import {link} from "svelte-spa-router";


    import SectionLayout from '../components/layout/SectionLayout.svelte';
    import ServicesList from "../components/ServicesList.svelte";
    import ShopItemList from "../components/ShopItemList.svelte";
    import NotContent from "../components/utils/NotContent.svelte";


    let backImg = "images/back_img04-1.jpg";
    let backImg05 = "images/back_img05.jpg";


    let OurLists = [
        {
            id: 1,
            icons: "fab fa-codepen",
            title: "Why do we use it?",
            text:
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
        },
        {
            id: 2,
            icons: "fas fa-cogs",
            title: "Why do we use it?",
            text:
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
        },
        {
            id: 3,
            icons: "fas fa-dharmachakra",
            title: "Why do we use it?",
            text:
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
        },
        {
            id: 4,
            icons: "fas fa-box-open",
            title: "Why do we use it?",
            text:
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
        },
        {
            id: 5,
            icons: "fas fa-star-of-david",
            title: "Why do we use it?",
            text:
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
        },
        {
            id: 6,
            icons: "fab fa-github",
            title: "Why do we use it?",
            text:
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
        }
    ]


    let scrollY;
    let innerWidth;
    let innerHeight;

    let canvas;
    let canvasY = 0;


    import ResetScrollY from '../components/utils/ResetScrollY.svelte'


    const getProducts = async () => {
        if ($homeList.length < 1) {
            const res = await firebase
                    .firestore()
                    .collection("products")
                    .orderBy("createdAt", "desc")
                    .limit(6)
                    .get();
            $homeList = res.docs.map(e => e.data());
        }

    };

    onMount(() => {
        getProducts();
    });

    const handleScroll = (sY, iW, iH) => {
        // console.log(sY, iW, iH);
        // console.log(canvas.offsetHeight);
        // console.log(canvas.offsetTop - innerHeight);
        // console.log(canvas.offsetTop - sY);
        if (sY >= canvas.offsetTop - innerHeight && canvas.offsetTop - sY >= 0) {
            // console.log(sY - (canvas.offsetTop - innerHeight));
            canvasY = (sY - (canvas.offsetTop - innerHeight)) / 30;
            // console.log(canvasY);
        }
    };


</script>

<style>
    .slide_content {
        height: 480px;
    }
    .slide_content .item_box img {
        object-fit: cover;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .slide_content .text_box {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.35);
        text-align: center;
    }
    .banner_container {
        height: 500px;
        position: relative;
    }
    .parallax_box {
        position: relative;
        left: 0;
        top: 0;
        height: 100%;
        overflow: hidden;
        z-index: 0;
    }
    .parallax_itme {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .parallax_inner {
        position: absolute;
        width: 100%;
        height: 150%;
        left: 0;
        top: -50%;
        background-size: cover;
        background-position: center center;
        transition: transform 1s;
        transition-timing-function: ease-out;
    }
    .banner_container .back {
        background-color: rgba(0, 0, 0, 0.5);
    }
    @media screen and (min-width: 768px) {
        .slide_content {
            height: 640px;
        }
    }
</style>

<svelte:window
    bind:scrollY
    bind:innerWidth
    bind:innerHeight
    on:scroll={handleScroll(scrollY, innerWidth, innerHeight)}
/>


<ResetScrollY />

<section class="slide_container relative">
    <div class="slide_content">
        <div class="item_box block relative w-full h-full">
            <img src={backImg} alt="" />
            <div class="text_box p-4">
                <strong class="text-4xl">What is Lorem Ipsum?</strong>
                <p class="text-lg">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
        </div>
    </div>
</section>

<SectionLayout Title="OUR SERVICES" subTitle="WELCOME">
    <ul class="flex items-center justify-center flex-wrap">
        {#each OurLists as list}
            <ServicesList {list}/>
        {/each}
    </ul>
</SectionLayout>

<SectionLayout Title="OUR LATEST SHOP" subTitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit.">

    <div class="item_content max-w-screen-lg mr-auto ml-auto">
        {#if $homeList.length >= 1}
            <div class="link_box text-center">
                <a href="/shop" use:link class="opacity-75 hover:opacity-100 hover:underline text-base">
                    VIEW ALL SHOP
                </a>
            </div>
            <ul class="flex items-center flex-wrap">
                {#each $homeList as list}
                    <ShopItemList {list}/>
                {/each}
            </ul>
        {:else}
            <NotContent text="상품이 없습니다."/>
        {/if}
    </div>

</SectionLayout>

<section class="banner_container mt-12 md:mt-18" bind:this={canvas}>
    <div class="parallax_box">
        <div class="parallax_itme">
            <div class="parallax_inner"
                 style="background-image: url('{backImg05}'); transform:translate(0%, {canvasY}%)matrix(1, 0, 0, 1, 0, 0); "
            />
        </div>
    </div>
    <div class="back absolute inset-0 z-10" />
    <div class="text_box absolute inset-0 z-10 p-4 flex items-center justify-center flex-col">
        <div class="icon_box text-white">
            <i class="fas fa-hashtag fa-3x" />
        </div>
        <h2 class="text-center text-3xl font-bold text-white tracking-wider">
            Business
        </h2>
        <div class="pt-4">
            <p class="text-lg text-center text-white leading-normal">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
                distinctio nemo molestias.
            </p>
            <p class="text-lg text-center text-white leading-normal">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
                distinctio nemo molestias.
            </p>
            <p class="text-lg text-center text-white leading-normal">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
                distinctio nemo molestias.
            </p>
        </div>
    </div>
</section>






