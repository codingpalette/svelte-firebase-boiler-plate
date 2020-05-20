<script>
  import { onMount } from "svelte";
  import Swiper from "swiper";
  let backImg04 = "images/back_img04.jpg";
  let backImg05 = "images/back_img05.jpg";
  let backImg06 = "images/back_img06.jpg";
  // console.log(Swiper);

  let slideLists = [
    { id: "1", src: backImg04 },
    { id: "2", src: backImg05 },
    { id: "3", src: backImg06 }
  ];

  let slideModifyOpen = false;

  onMount(() => {
    const swiper = new Swiper(".swiper-container", {
      loop: true,

      navigation: {
        nextEl: ".next_btn",
        prevEl: ".prev_btn"
      }
    });
  });

  const slideModifyModalOpen = () => {
    slideModifyOpen = true;
  };
</script>

<style>
  .slide_container {
    width: 100%;
    height: 400px;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .swiper-slide img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }

  .slide_btn {
    position: absolute;
    top: 50%;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transform: translateY(-50%);
    font-size: 2rem;
    transition: 0.5s;
  }

  .slide_btn.prev_btn {
    left: 20px;
    right: auto;
  }
  .slide_btn.prev_btn:hover {
    transform: translate(-10px, -50%);
  }

  .slide_btn.next_btn {
    right: 20px;
    left: auto;
  }

  .slide_btn.next_btn:hover {
    transform: translate(10px, -50%);
  }

  .slide_modify_open_btn {
    right: 10px;
    top: 10px;
  }

  @media screen and (min-width: 768px) {
    .slide_container {
      height: 640px;
    }
  }
</style>

<div class="slide_container">
  <!-- Swiper -->
  <div class="swiper-container">
    <div class="swiper-wrapper">
      {#each slideLists as list}
        <div class="swiper-slide">
          <img src={list.src} alt="" />
        </div>
      {/each}

    </div>
    <!-- Add Arrows -->
    <button class="slide_btn prev_btn">
      <i class="fas fa-chevron-left fa-lg" />
    </button>
    <button class="slide_btn next_btn">
      <i class="fas fa-chevron-right fa-lg" />
    </button>
    <div
      class="slide_modify_open_btn bg-white hover:bg-gray-300 text-black h-10
      w-10 flex items-center justify-center rounded-full absolute cursor-pointer
      z-10"
      on:click={slideModifyModalOpen}>
      <i class="fas fa-pen" />
    </div>
  </div>
  {#if slideModifyOpen}
    <div
      class="slide_modify_modal flex items-center justify-center fixed top-0
      left-0 w-full h-full z-30 p-4">
      <div
        class="modal_content max-w-screen-md w-full rounded bg-white
        overflow-hidden shadow-lg relative z-10">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2 ">슬라이드 수정</div>

        </div>
        <div class="flex items-center justify-center mt-2">

          <button
            class="w-2/4 bg-gray-300 hover:bg-gray-200 focus:shadow-outline
            focus:outline-none py-2 px-4">
            닫기
          </button>
          <button
            class="w-2/4 bg-purple-500 hover:bg-purple-400 focus:shadow-outline
            focus:outline-none text-white font-bold py-2 px-4"
            type="button">
            수정
          </button>
        </div>
      </div>
      <div
        class="modal_back drawer_back bg-gray-800 opacity-50 absolute left-0
        top-0 w-full h-full " />
    </div>
  {/if}
</div>

<div>Home</div>
<button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button
</button>
