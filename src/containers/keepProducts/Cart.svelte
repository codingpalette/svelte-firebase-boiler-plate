<script>
  import { userState } from "../../store/UserStore";
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";

  let cartItems = [];
  let cartOk = false;

  const getItems = async item => {
    const res = await firebase
      .firestore()
      .collection("products")
      .doc(decodeURI(`${item.id}`))
      .get();
    // console.log(res.data());
    return res.data();
  };

  onMount(async () => {
    if ($userState.cart.length > 0) {
      console.log("상품이 있음");
      const promises = $userState.cart.map(async item => {
        const res = await getItems(item);
        // const date = item.date;
        // const quantity = item.quantity;
        console.log(res);
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
      console.log(cartItems);
      cartOk = true;
    } else {
      console.log("상품이 없음");
    }
  });
</script>

<style>
  .header_text_box {
    border-bottom: 1px solid #d2d2d7;
  }
  .image_box {
    width: 120px;
    height: 120px;
    position: relative;
    overflow: hidden;
    background-color: #fff;
  }
  .image_box img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .list_box {
    background-color: #fafafa;
  }
  .item_list .card_box {
    width: 100%;
  }
  .item_list .result_box {
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    .item_list .card_box {
      width: 47.5%;
    }
    .item_list .result_box {
      width: 47.5%;
    }
  }
</style>

<section class="cart_container px-4 box-border">
  <div class="max-w-screen-lg pt-24 mr-auto ml-auto">
    <h2 class=" text-center text-3xl font-bold">장바구니</h2>
    <div class="pt-4 pb-12 header_text_box">
      <p class="text-sm text-center text-gray-600 leading-normal">
        모든 주문에 무료 배송 서비스가 제공됩니다.
      </p>
    </div>
    {#if cartOk}
      <div class="mt-12 pb-12 item_list flex justify-between flex-wrap">
        <ol class="card_box">
          {#each cartItems as item}
            <li class="flex items-center mb-8 ">
              <div
                class="list_box border-solid border border-gray-300
                overflow-hidden box-border p-4 flex-1 flex items-center
                flex-wrap">
                <div class="image_box rounded-full">
                  <img src={item.image} alt="" />
                </div>
                <div class="name_box text-xl mx-4">
                  <a
                    href="/product/{item.id}"
                    use:link
                    class="text-purple-500 hover:underline">
                    {item.title}
                  </a>
                </div>
                <div class="count_box">
                  <span>{item.quantity}개</span>
                </div>
                <div class="price_box ml-auto">
                  <span>₩{item.price.toLocaleString()}</span>
                </div>
              </div>
              <button
                class="ml-4 bg-gray-200 hover:bg-gray-300 text-black h-10 w-10
                flex items-center justify-center rounded-full">
                <i class="fas fa-times" />
              </button>

              <!-- <div class="flex">
                <div class="item_img">
                  <img src={item.image} alt="" />
                </div>
                <div class="item_text_box">
                  <h2 class="list text-xl flex items-center justify-between">
                    <span class="">상품명</span>
                    <a
                      href="/product/{item.id}"
                      use:link
                      class="text-purple-500 hover:underline">
                      {item.title}
                    </a>
                  </h2>
                  <div class="list">
                    <span>가격</span>
                    <span>₩{item.price.toLocaleString()}</span>
                  </div>
                  <div class="list">
                    <span>구입수량</span>
                    <span>{item.quantity}</span>
                  </div>
                </div>
              </div> -->
            </li>
          {/each}
        </ol>
        <div class="result_box">asdasd</div>
      </div>
    {/if}

  </div>

</section>
