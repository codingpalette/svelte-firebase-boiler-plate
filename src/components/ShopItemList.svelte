<script>
  import { link } from "svelte-spa-router";
  export let list;
</script>

<style>
  li {
    width: 50%;
  }

  li a {
    display: block;
  }

  li dl {
    position: relative;
    padding-top: 56.25%;
  }

  li dd.img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding-top: inherit;
    overflow: hidden;
  }
  li dd.img a {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding-top: inherit;
  }
  li dd.img a figure {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

  li dd.img a figure img {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }

  @media screen and (min-width: 768px) {
    li {
      width: 33.33%;
    }
  }
</style>

<li class="p-4">
  <dl>
    <dt class="title pt-5 px-4 text-xl font-bold">{list.title}</dt>
    <dd class="price px-4 pt-1 text-base">{list.price.toLocaleString()}원</dd>
    <!-- <dd class="tag px-4 pt-1">
              <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm
                font-semibold text-gray-700 mr-2">
                과일
              </span>
              <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm
                font-semibold text-gray-700 mr-2">
                상큼
              </span>
            </dd> -->
    <dd class="img">
      <a href="/product/{list.id}" use:link class="relative">
        <figure>
          <img src={list.productCoverImages[0].src} alt="" />
        </figure>
      </a>
    </dd>
  </dl>
</li>
