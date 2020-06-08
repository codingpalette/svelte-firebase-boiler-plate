<script>
    import {productList, productLast} from "../../store/SiteStore";
    import {onMount} from "svelte";
    import {link} from "svelte-spa-router";
    import SectionLayout from '../../components/layout/SectionLayout.svelte'
    import ShopItemList from "../../components/ShopItemList.svelte";
    import NotContent from "../../components/utils/NotContent.svelte";

    let item01 = "images/item_img01.jpg";
    let item02 = "images/item_img02.jpg";
    let item03 = "images/item_img03.jpg";
    let item04 = "images/item_img04.jpg";

    const getProducts = async () => {
        const res = await firebase
                .firestore()
                .collection("products")
                .orderBy("createdAt", "desc")
                .limit(6)
                .get();
        // console.log(res);

        $productList = res.docs.map(e => e.data());
        $productLast = res.docs[res.docs.length - 1];
        // console.log($productList);
    };

    const productPlus = async data => {
        try {
            const res = await firebase
                    .firestore()
                    .collection("products")
                    .orderBy("createdAt", "desc")
                    .startAfter(data)
                    .limit(3)
                    .get();
            // console.log(res);
            const plusItems = res.docs.map(e => e.data());
            $productList = [...$productList, ...plusItems];
            $productLast = res.docs[res.docs.length - 1];
        } catch (e) {
            // console.log(e);
        }
    };

    onMount(() => {
        getProducts();
    });

    const onClickProductPlus = () => {
        productPlus($productLast);
    };
</script>

<style>

</style>

<SectionLayout Title="OUR LATEST SHOP" subTitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit.">

    <div class="item_content max-w-screen-lg mr-auto ml-auto">
        {#if $productList.length >= 1}
            <div class="link_box text-center">
                <a
                        href="/about/"
                        use:link
                        class="opacity-75 hover:opacity-100 hover:underline text-base">
                    VIEW ALL SHOP
                </a>
            </div>
            <ul class="flex items-center flex-wrap">

                {#each $productList as list}
                    <ShopItemList {list}/>
                {/each}
            </ul>

            <!-- <div class="btn_box">
            <button type="button" class="" on:click={onClickProductPlus}>
              VIEW ALL SHOP
            </button>

          </div> -->
        {:else}
            <NotContent text="상품이 없습니다."/>
        {/if}
    </div>

</SectionLayout>

