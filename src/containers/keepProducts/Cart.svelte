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
  .item_list {
    /* border-bottom: 1px solid #d2d2d7; */
  }
  .item_img {
    max-width: 200px;
  }
  .item_text_box {
    margin-left: 1rem;
    flex: 1;
  }
  .list {
    line-height: 1.2;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #d2d2d7;
  }
  .list:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border: none;
  }
</style>

<section class="cart_container">
  <div class="max-w-screen-lg pt-24 mr-auto ml-auto">
    <h2 class=" text-center text-3xl font-bold">
      장바구니에 들어 있는 제품입니다.
    </h2>
    <div class="pt-4 pb-12 header_text_box">
      <p class="text-sm text-center text-gray-600 leading-normal">
        모든 주문에 무료 배송 서비스가 제공됩니다.
      </p>
    </div>
    {#if cartOk}
      <div class="mt-12 pb-12 item_list">
        <ol>
          {#each cartItems as item}
            <li
              class="shadow-lg rounded border-solid border border-gray-100
              overflow-hidden box-border mb-8">
              <div class="flex">
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
              </div>
            </li>
          {/each}
        </ol>
      </div>
    {/if}

  </div>

</section>
