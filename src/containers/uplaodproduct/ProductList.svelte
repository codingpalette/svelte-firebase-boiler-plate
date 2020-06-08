<script>
    import {onMount} from "svelte";
    import {link} from "svelte-spa-router";
    import Button from '../../components/utils/Button.svelte'

    let productList = []
    const getProducts = async () => {
        const res = await firebase
                .firestore()
                .collection("products")
                .orderBy("createdAt", "desc")
                .limit(6)
                .get();
        console.log(res);

        productList = res.docs.map(e => e.data());
        // productList = res.docs[res.docs.length - 1];
        console.log(productList);
    };
    onMount(() => {
        getProducts();
    });

    const onClickProductAddModal = () => {
        console.log('aaa')
    }


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
    .table_content tbody td .wrapper{
        width: inherit;
        position: relative;
        z-index: 4;
        padding: 10px 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .table_content .price{
        display: none;
    }

    .table_content .image_box img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .table_content .button_box{
        padding-right: 24px;
    }

    @media screen and (min-width: 768px) {
        .table_content .price{
            display: table-cell;
        }

    }

</style>

<section class="px-4 box-border">
    <div class="max-w-screen-lg pt-12 md:pt-24 mr-auto ml-auto">
        <h2 class=" text-center text-3xl font-bold">상품정보</h2>
        <div class="pt-4 pb-12 header_text_box">
            <p class="text-sm text-center text-gray-600 leading-normal">
                상품 리스트가 나옵니다.
            </p>
        </div>
        <div class="text-right mb-4">
            <a href="/upload-product" use:link>
                <Button  clickEvent={onClickProductAddModal}>상품등록</Button>
            </a>
        </div>
        {#if productList.length >= 1}
        <div class="w-full rounded overflow-hidden shadow-lg">
            <table class="table_content">
                <thead>
                <tr>
                    <th>상품</th>
                    <th>이미지</th>
                    <th class="price">가격</th>
                    <th>&nbsp</th>
                </tr>
                </thead>
                <tbody>
                {#each productList as list}

                <tr>
                    <td>
                        <div class="wrapper">
                            {list.title}
                        </div>

                    </td>
                    <td>
                        <div class="wrapper">
                            <div class="image_box h-10 w-10 flex items-center justify-center overflow-hidden rounded-full relative">
                                <img src="{list.productCoverImages[0].src}" alt="">
                            </div>
                        </div>

                    </td>
                    <td class="price">
                        <div class="wrapper">
                            {list.price}
                        </div>
                    </td>
                    <td>
                        <div class="button_box flex items-center justify-end">
                            <a href="/upload-product?id={list.id}" use:link class="text-black text-opacity-50 hover:text-opacity-100">
                                수정
                            </a>
                            <button class="text-black text-opacity-50 hover:text-opacity-100 focus:shadow-none focus:outline-none ml-4">삭제</button>
                        </div>
                    </td>

                </tr>
                {/each}

                </tbody>
            </table>
        </div>
        {/if}

    </div>
</section>