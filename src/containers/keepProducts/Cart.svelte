<script>
  import { userState } from "../../store/UserStore";
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";

  import NotContent from "../../components/utils/NotContent.svelte";
  import InputGroup from "../../components/utils/InputGroup.svelte";

  let kakaopayIcon = "images/kakaopay.png";

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
  let addressList = {
    postcode: "",
    road: "",
    jibun: "",
    detail: ""
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
      cartOk = true;
    }
  });

  onMount(() => {});

  function addressEvent() {
    new daum.Postcode({
      oncomplete: function(data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var roadAddr = data.roadAddress; // 도로명 주소 변수
        var extraRoadAddr = ""; // 참고 항목 변수

        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr +=
            extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraRoadAddr !== "") {
          extraRoadAddr = " (" + extraRoadAddr + ")";
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        addressList.postcode = data.zonecode;
        addressList.road = roadAddr;
        addressList.jibun = data.jibunAddress;
      }
    }).open();
  }

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
        amount: totalPrice,
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
  .item_list .card_box li {
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    .image_box {
      width: 120px;
      height: 120px;
    }
    .name_box {
      margin-left: 1rem;
    }
    .item_list .card_box li {
      width: auto;
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
      <div class="mt-12 pb-12 item_list ">
        {#if cartItems.length > 0}
          <div class="cart_list_box">
            <div class="title">
              <h3 class="text-xl font-bold mb-4">상품리스트</h3>
            </div>
            <ol class="card_box flex items-center justify-between flex-wrap">
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
                    <div
                      class="count_box flex items-center justity-center ml-4">
                      <span>{item.quantity}개</span>
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
          </div>

          <div class="address_box py-4">
            <div class="title">
              <h3 class="text-xl font-bold mb-4">주소</h3>
            </div>
            <button
              on:click={addressEvent}
              type="button"
              class="box-border text-white bg-purple-500 hover:bg-purple-400
              focus:shadow-outline focus:outline-none text-white font-bold
              text-sm py-2 px-4 mb-4 rounded ">
              주소찾기
            </button>
            <InputGroup
              labelTxt="우편번호"
              idValue="address_postcode"
              bind:valueData={addressList.postcode} />
            <InputGroup
              labelTxt="도로명주소"
              idValue="address_road"
              bind:valueData={addressList.road} />
            <InputGroup
              labelTxt="지번주소"
              idValue="address_jibun"
              bind:valueData={addressList.jibun} />
            <InputGroup
              labelTxt="상세주소"
              idValue="address_jibun"
              bind:valueData={addressList.jibun} />
          </div>
          <div class="result_box ">
            <div class="title">
              <h3 class="text-xl font-bold mb-4">결제방법</h3>
            </div>
            <div class="total_price mb-4">
              <span>총 결제금액</span>
              <span>₩{totalPrice}</span>
            </div>
            <div class="btn_box">
              <div class="mb-4">
                <button
                  type="button"
                  class="bg-transparent py-2 px-4 rounded border border-gray-400
                  focus:shadow-none focus:outline-none"
                  on:click={kakaoPay}>
                  <img src={kakaopayIcon} alt="" />
                </button>
              </div>
              <div class="mb-4">
                <button
                  type="button"
                  class="box-border text-white bg-purple-500 hover:bg-purple-400
                  focus:shadow-none focus:outline-none text-white font-bold
                  text-sm py-2 px-4 rounded">
                  일반 결제하기
                </button>
              </div>

            </div>
          </div>
        {:else}
          <NotContent text="장바구니가 비어있습니다." />
        {/if}
      </div>
    {/if}

  </div>

</section>
