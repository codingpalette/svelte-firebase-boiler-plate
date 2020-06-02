<script>
  import { userState } from "../../store/UserStore";
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";

  const IMP = window.IMP; // 생략가능
  IMP.init("imp18299152"); // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용

  let cartItems = [];
  let totalPrice = 0;
  let cartOk = false;
  let Payment = {
    user: [],
    data: [],
    product: []
  };

  const getItems = async item => {
    const res = await firebase
      .firestore()
      .collection("products")
      .doc(decodeURI(`${item.pid}`))
      .get();
    // console.log(res.data());
    return res.data();
  };

  onMount(async () => {
    const res = await firebase
      .firestore()
      .collection("carts")
      .where("uid", "==", $userState.uid)
      .get();
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
      calculateTotal(cartItems);
      cartOk = true;
    } else {
      console.log("상품이 없음");
    }
  });

  const calculateTotal = cartDetail => {
    let total = 0;
    cartDetail.map(item => {
      total += parseInt(item.price, 10) * item.quantity;
    });
    // console.log(total);
    totalPrice = total;
  };

  const kakaoPay = () => {
    IMP.request_pay(
      {
        pg: "kakao", // version 1.1.0부터 지원.
        pay_method: "card",
        merchant_uid: "merchant_" + new Date().getTime(),
        name: "주문명:결제테스트",
        amount: 14000,
        buyer_email: "iamport@siot.do",
        buyer_name: "구매자이름",
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울특별시 강남구 삼성동",
        buyer_postcode: "123-456",
        m_redirect_url: "https://www.yourdomain.com/payments/complete"
      },
      function(rsp) {
        if (rsp.success) {
          var msg = "결제가 완료되었습니다.";
          msg += "고유ID : " + rsp.imp_uid;
          msg += "상점 거래ID : " + rsp.merchant_uid;
          msg += "결제 금액 : " + rsp.paid_amount;
          msg += "카드 승인번호 : " + rsp.apply_num;
        } else {
          var msg = "결제에 실패하였습니다.";
          msg += "에러내용 : " + rsp.error_msg;
        }
        alert(msg);
      }
    );
  };
</script>

<style>
  .header_text_box {
    border-bottom: 1px solid #d2d2d7;
  }
  .image_box {
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    margin-bottom: 1rem;
  }
  .image_box:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  .image_box img {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  /* .list_box {
    background-color: #fafafa;
  } */
  .item_list .card_box {
    width: 100%;
  }
  .item_list .result_box {
    width: 100%;
    background-color: #fafafa;
  }

  @media screen and (min-width: 768px) {
    .image_box {
      width: 120px;
      height: 120px;
    }
    .name_box {
      margin-left: 1rem;
    }
    /* .item_list .card_box {
      width: 47.5%;
    }
    .item_list .result_box {
      width: 47.5%;
    } */
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
                class="list_box overflow-hidden box-border flex-1 flex
                items-center flex-wrap">
                <div class="image_box rounded">
                  <img src={item.image} alt="" />
                </div>
                <div class="name_box text-xl">
                  <a
                    href="/product/{item.id}"
                    use:link
                    class="text-purple-500 hover:text-purple-400 ">
                    {item.title}
                  </a>
                </div>
                <div class="count_box flex items-center justity-center ml-4">
                  <span>{item.quantity}개</span>
                  <button
                    type="button"
                    class=" box-border px-2 ml-2 bg-gray-300 hover:bg-gray-400
                    focus:shadow-outline focus:outline-none text-white font-bold
                    rounded">
                    <i class="fas fa-plus" />
                  </button>
                  <button
                    type="button"
                    class=" box-border px-2 ml-2 bg-gray-300 hover:bg-gray-400
                    focus:shadow-outline focus:outline-none text-white font-bold
                    rounded">
                    <i class="fas fa-minus" />
                  </button>

                </div>
                <div class="price_box ml-4 ">
                  <span>₩{item.price.toLocaleString()}</span>
                </div>
                <button
                  class="ml-4 hover:bg-gray-300 text-black h-10 w-10 flex
                  items-center justify-center rounded-full">
                  <i class="fas fa-times" />
                </button>
              </div>
            </li>
          {/each}
        </ol>
        <div class="result_box p-4">
          <div class="total_price">
            <span>총 결제금액</span>
            <span>₩{totalPrice}</span>
          </div>
          <div class="btn_box">
            <button
              type="button"
              class="box-border text-white bg-purple-500 hover:bg-purple-400
              focus:shadow-outline focus:outline-none text-white font-bold py-3
              rounded w-full"
              on:click={kakaoPay}>
              결제하기
            </button>
          </div>
        </div>
      </div>
    {/if}

  </div>

</section>
