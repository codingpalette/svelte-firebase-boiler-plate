<script>
  import { productDetailItem } from "../../store/SiteStore";
  import { userState } from "../../store/UserStore";

  let count = 1;
  let totalCount;
  const db = firebase.firestore();
  const realdb = firebase.database();

  const productDetailItemsubscribe = productDetailItem.subscribe(value => {
    // console.log(value);
    if (value) {
      // console.log(value);
      totalCount = value.price * count;
    }
  });

  const onClickCountPlus = () => {
    count += 1;
    totalCount = $productDetailItem.price * count;
  };
  const onClickCountMinus = () => {
    if (count === 1) {
      return false;
    }
    count -= 1;
    totalCount = $productDetailItem.price * count;
  };
  const onChangeCount = e => {
    const target = Number(e.target.value);
    count = target;
    totalCount = $productDetailItem.price * count;
  };

  const onClickAddCart = async () => {
    // console.log($productDetailItem);
    // console.log($userState);

    try {
      let duplicate = false;
      let quantityNum = 0;
      let upData;
      const cartRes = await db
        .collection("carts")
        .doc(`${$productDetailItem.id}${$userState.uid}`)
        .get();
      // console.log(cartRes.data());
      if (cartRes.data()) {
        duplicate = true;
        upData = cartRes.data();
        upData.quantity = cartRes.data().quantity + count;
      }

      if (duplicate) {
        //상품이 있을때
        await db
          .collection("carts")
          .doc(`${$productDetailItem.id}${$userState.uid}`)
          .update(upData);
      } else {
        await db
          .collection("carts")
          .doc(`${$productDetailItem.id}${$userState.uid}`)
          .set({
            uid: $userState.uid,
            pid: $productDetailItem.id,
            quantity: count,
            date: Date.now()
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
</script>

<style>
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .area_item {
    width: 100%;
  }
  .info .header {
    padding-bottom: 10px;
    border-bottom: 1.5px solid #707070;
    margin-top: 1rem;
  }
  .area_list li {
    border-bottom: 1px solid #e9e9e9;
  }
  .area_list li strong {
    width: 100px;
  }
  .area_btn_box button {
    width: 100%;
  }
  .count_input {
    width: 50px;
    height: 40px;
    padding: 0 5px;
  }
  .count_btn_box button {
    line-height: 1;
  }
  .main_img_box img {
    display: block;
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    .area_item {
      width: 47.5%;
    }
    .info .header {
      margin-top: 0;
    }
  }
</style>

{#if $productDetailItem}
  <div
    class="area_top flex items-start justify-between max-w-screen-lg mt-24
    mr-auto ml-auto px-4 flex-wrap">
    <div class="area_item cover_image rounded overflow-hidden shadow">
      <img src={$productDetailItem.productCoverImages[0].src} alt="" />
    </div>
    <div class="area_item info">
      <div class="header">
        <h2 class="text-xl font-bold">{$productDetailItem.title}</h2>
      </div>
      <div class="area_list">
        <ul>
          <li class="item_box py-4 flex items-center">
            <strong class="text-sm font-normal">상품금액</strong>
            <div class="text-gray-500 font-bold flex-1">
              <span class="text-purple-500">
                {$productDetailItem.price.toLocaleString()}
              </span>
              원
            </div>
          </li>
          <li class="item_box py-4 flex items-center">
            <strong class="text-sm font-normal">상품설명</strong>
            <div class=" flex-1 whitespace-pre-line">
              {$productDetailItem.description}
            </div>
          </li>
          <li class="item_box py-4 flex items-center">
            <strong class="text-sm font-normal">구입개수</strong>
            <div class="flex-1 flex items-center justity-center">
              <input
                type="number"
                min="1"
                max="99"
                step="1"
                value={count}
                on:change={onChangeCount}
                class="count_input appearance-none block bg-gray-200
                text-gray-700 border-2 border-gray-200 rounded leading-tight
                focus:outline-none focus:bg-white focus:border-purple-500" />
              <div class="count_btn_box ml-auto">
                <button
                  type="button"
                  class="py-2 px-4 box-border bg-purple-500 hover:bg-purple-400
                  focus:shadow-outline focus:outline-none text-white font-bold
                  rounded"
                  on:click={onClickCountPlus}>
                  <i class="fas fa-plus" />
                </button>
                <button
                  type="button"
                  class="py-2 px-4 box-border bg-purple-500 hover:bg-purple-400
                  focus:shadow-outline focus:outline-none text-white font-bold
                  rounded"
                  on:click={onClickCountMinus}>
                  <i class="fas fa-minus" />
                </button>
              </div>
            </div>
          </li>
          <li class="item_box py-4 flex items-center">
            <strong class="text-sm font-normal">합계금액</strong>
            <div class="text-gray-500 font-bold flex-1">
              <span class="text-purple-500">{totalCount.toLocaleString()}</span>
              원
            </div>
          </li>
        </ul>
      </div>
      <div class="area_btn_box mt-4 flex items-center justify-between">
        <!-- <button
          type="button"
          class="box-border bg-purple-500 hover:bg-purple-400
          focus:shadow-outline focus:outline-none text-white font-bold py-3
          rounded">
          바로구매
        </button> -->
        <button
          type="button"
          class="box-border text-white bg-purple-500 hover:bg-purple-400
          focus:shadow-outline focus:outline-none text-white font-bold py-3
          rounded"
          on:click={onClickAddCart}>
          장바구니
        </button>
      </div>

    </div>
  </div>
  <div class="main_img_box max-w-screen-lg mt-24 mr-auto ml-auto px-4">
    <img src={$productDetailItem.productMainImages[0].src} alt="" />
  </div>
{/if}
