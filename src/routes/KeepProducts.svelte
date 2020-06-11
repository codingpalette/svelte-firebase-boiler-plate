<script>
    import {userState} from "../store/UserStore";
    import {onMount} from "svelte";
    import {link, push} from "svelte-spa-router";
    import Cart from "../containers/keepProducts/Cart.svelte";

    import SectionLayout from '../components/layout/SectionLayout.svelte'
    import NotContent from "../components/utils/NotContent.svelte";
    import ProgressBar from '../components/utils/ProgressBar.svelte'

    let kakaopayIcon = "images/kakaopay.png"
    let cartItems = [];
    let loading = true;

    const getItems = async item => {
        const res = await firebase.firestore().collection("products").doc(decodeURI(`${item.pid}`)).get();
        // console.log(res.data());
        return res.data();
    };


    onMount(async () => {
        const res = await firebase.firestore().collection("carts").where("uid", "==", $userState.uid).get();
        // console.log(res);
        // console.log(res.docs[0].data());
        let data = [];
        res.docs.forEach(v => {
            data.push(v.data());
        });
        // console.log(data);
        // console.log(res);
        if (data.length > 0) {
            const promises = data.map(async item => {
                const res = await getItems(item);
                // const date = item.date;
                // const quantity = item.quantity;
                // console.log(res);
                cartItems.push({
                    id: res.id,
                    image: res.productCoverImages[0].src,
                    price: res.price,
                    title: res.title,
                    date: item.date,
                    quantity: item.quantity
                });
                // console.log(cartItems);
            });
            await Promise.all(promises);
            // console.log(cartItems);
            // calculateTotal(cartItems);
            // cartOk = true;
            loading = false;
        } else {
            console.log("상품이 없음");
            loading = false;
            // cartOk = true;
        }
    });

</script>


<style>
    .table_content {
        width: 100%;
    }

    .table_content thead th {
        padding: 8px 24px;
        font-size: 12px;
        text-align: left;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    .table_content tbody tr:hover {
        background: #f5f5f5;
    }

    .table_content tbody td {
        color: rgba(0, 0, 0, 0.54);
        font-size: 13px;
        line-height: 16px;
        height: 48px;
        padding: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        white-space: nowrap;
    }

    .table_content tbody td .wrapper {
        width: inherit;
        position: relative;
        z-index: 4;
        padding: 10px 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .table_content .price {
        display: none;
    }

    .table_content .image_box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .table_content .button_box {
        padding-right: 24px;
    }

    @media screen and (min-width: 768px) {
        .table_content .price {
            display: table-cell;
        }

    }

</style>


<SectionLayout Title="장바구니" subTitle="모든 주문에 무료 배송 서비스가 제공됩니다.">
    {#if loading}
        <ProgressBar />
    {:else}
        <div class="w-full rounded overflow-hidden shadow-lg">
            <table class="table_content">
                <thead>
                <tr>
                    <th>상품</th>
                    <th>이미지</th>
                    <th>가격</th>
                    <th class="price">수량</th>
                    <th>&nbsp</th>
                </tr>
                </thead>
                <tbody>
                {#each cartItems as item}
                <tr>
                    <td>
                        <div class="wrapper">
                            <a href="/product/{item.id}" use:link class="text-black text-opacity-50 hover:text-opacity-100">
                                {item.title}
                            </a>
                        </div>

                    </td>
                    <td>
                        <div class="wrapper">
                            <div class="image_box h-10 w-10 flex items-center justify-center overflow-hidden rounded-full">
                                <img src="{item.image}" alt="">
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="wrapper">
                            {item.price.toLocaleString()}원
                        </div>
                    </td>
                    <td class="price">
                        <div class="wrapper">
                            <div class="image_box h-10 w-10 flex items-center justify-center overflow-hidden rounded-full">
                                {item.quantity}개
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="button_box flex items-center justify-end">

                            <button
                                    class="text-black text-opacity-50 hover:text-opacity-100 focus:shadow-none focus:outline-none ml-4"

                            >
                                삭제
                            </button>
                        </div>
                    </td>
                </tr>
                {/each}
                </tbody>
            </table>
        </div>
    {/if}

</SectionLayout>

<!--<Cart />-->
