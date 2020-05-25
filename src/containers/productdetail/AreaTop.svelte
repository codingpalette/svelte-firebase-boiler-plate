<script>
  import { productDetailItem } from "../../store/SiteStore";
</script>

<style>
  .area_item {
    width: 47.5%;
  }
  .info .header {
    padding-bottom: 10px;
    border-bottom: 1.5px solid #707070;
  }
  .area_list li {
    border-bottom: 1px solid #e9e9e9;
  }
  .area_list li strong {
    width: 100px;
  }
  .area_btn_box button {
    width: 47.5%;
  }
</style>

{#if $productDetailItem}
  <div
    class="area_top flex items-start justify-between max-w-screen-lg mt-24
    mr-auto ml-auto">
    <div class="area_item">sfsdf</div>
    <div class="area_item info">
      <div class="header">
        <h2 class="text-xl font-bold">{$productDetailItem.title}</h2>
      </div>
      <div class="area_list">
        <ul>
          <li class="item_price py-4 flex items-center">
            <strong class="text-sm font-normal">상품금액</strong>
            <div class="text-gray-500 font-bold flex-1">
              <span class="text-purple-500">
                {$productDetailItem.price.toLocaleString()}
              </span>
              원
            </div>
          </li>
          <li class="item_price py-4 flex items-center">
            <strong class="text-sm font-normal">상품설명</strong>
            <div class="text-gray-500 font-bold flex-1">
              {$productDetailItem.description}
            </div>
          </li>
        </ul>
      </div>
      <div class="area_btn_box mt-4 flex items-center justify-between">
        <button
          type="button"
          class="box-border bg-purple-500 hover:bg-purple-400
          focus:shadow-outline focus:outline-none text-white font-bold py-3
          rounded">
          바로구매
        </button>
        <button
          type="button"
          class="box-border text-white bg-gray-500 hover:bg-gray-400
          focus:shadow-outline focus:outline-none text-white font-bold py-3
          rounded">
          장바구니
        </button>
      </div>

    </div>
  </div>
{/if}
