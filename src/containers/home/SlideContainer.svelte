<script>
  import { siteState, siteOk } from "../../store/SiteStore";
  import { userLevel } from "../../store/UserStore";
  import { onMount } from "svelte";
  import Swiper from "swiper";
  let notSlide = "images/notslide.svg";
  import PenButton from "../../components/PenButton.svelte";
  import FileUpload from "../../components/utils/FileUpload.svelte";

  let backImg04 = "images/back_img04.jpg";
  let backImg05 = "images/back_img05.jpg";
  let backImg06 = "images/back_img06.jpg";

  // console.log(Swiper);
  let mainModalSlideLists = [
    { id: 1, src: backImg04 },
    { id: 2, src: backImg05 },
    { id: 3, src: backImg06 }
  ];
  let slideModalOpen = false;
  let swiper;

  onMount(() => {
    // if ($siteState.mainSliders) {
    //   mainModalSlideLists = $siteState.mainSliders;
    // } else {
    //   mainModalSlideLists = [];
    // }
    swiper = new Swiper(".swiper-container", {
      loop: true,

      navigation: {
        nextEl: ".next_btn",
        prevEl: ".prev_btn"
      }
    });
  });

  const onClickslideModifyModalOpen = () => {
    slideModalOpen = true;
  };

  const onClickSlideModifyModalClose = () => {
    slideModalOpen = false;
  };

  const onChangeInput = async e => {
    // console.log(e.target.files);
    const file = e.target.files[0];
    const _name = file.name;
    const storageRef = firebase.storage().ref();
    const res = await storageRef.child(`site/mainSliders/${_name}`).put(file);
    const url = await storageRef
      .child(`site/mainSliders/${_name}`)
      .getDownloadURL();
    // console.log(url);
    mainModalSlideLists = [
      ...mainModalSlideLists,
      {
        src: url
      }
    ];
  };

  const onClickDeleteImage = e => {
    // console.log(e);
    // console.log(event.detail.id);
    mainModalSlideLists = mainModalSlideLists.filter(list => list.src !== e);
  };

  const onClickSlideSave = async () => {
    await firebase
      .database()
      .ref()
      .child("site")
      .update({ mainSliders: mainModalSlideLists });
    slideModalOpen = false;
    swiper.destroy();
    swiper = new Swiper(".swiper-container", {
      loop: true,

      navigation: {
        nextEl: ".next_btn",
        prevEl: ".prev_btn"
      }
    });
    swiper.update();
  };
</script>

<style>
  .slide_container {
    width: 100%;
    height: 400px;
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
    transform: translateY(-50%);
    top: 50%;
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

  .not_slide_container {
    width: 100%;
    height: 100%;
  }

  .not_slide_container .content_box img {
    max-width: 500px;
  }

  @media screen and (min-width: 768px) {
    .slide_container {
      height: 640px;
    }
  }
</style>

<section class="slide_container">
  {#if mainModalSlideLists.length > 0}
    <!-- Swiper -->
    <div class="swiper-container w-full h-full">
      <div class="swiper-wrapper">
        {#each mainModalSlideLists as list}
          <div class="swiper-slide flex items-center justify-center relative ">
            <img src={list.src} alt="" />
          </div>
        {/each}

      </div>
      <!-- Add Arrows -->
      <button
        class="slide_btn prev_btn absolute z-10 flex items-center justify-center
        text-white text-4xl">
        <i class="fas fa-chevron-left fa-lg" />
      </button>
      <button
        class="slide_btn next_btn prev_btn absolute z-10 flex items-center
        justify-center text-white text-4xl">
        <i class="fas fa-chevron-right fa-lg" />
      </button>

      <!-- <PenButton clickEvent={onClickslideModifyModalOpen} position /> -->

    </div>
  {:else}
    <div class="not_slide_container relative">
      <div
        class="content_box w-full h-full flex items-center justify-center
        flex-col relative ">
        <img src={notSlide} alt="" class="w-full h-auto " />
        <p class="text-xl font-bold text-purple-500 mt-8">
          메인슬라이더를 등록해 주세요.
        </p>
      </div>
      <PenButton clickEvent={onClickslideModifyModalOpen} position />

    </div>
  {/if}
  {#if slideModalOpen}
    <div
      class="slide_modify_modal flex items-center justify-center fixed top-0
      left-0 w-full h-full z-30 p-4 overflow-y-auto">
      <div
        class="modal_content max-w-screen-md w-full rounded bg-white
        overflow-hidden shadow-lg relative z-10 m-auto">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2 ">슬라이드 수정</div>
          <FileUpload
            section="mainSliders"
            maxitem="5"
            bind:imageLists={mainModalSlideLists} />

        </div>
        <div class="flex items-center justify-center mt-2">

          <button
            class="w-2/4 bg-gray-300 hover:bg-gray-200 focus:shadow-outline
            focus:outline-none py-2 px-4"
            on:click={onClickSlideModifyModalClose}>
            닫기
          </button>
          <button
            class="w-2/4 bg-purple-500 hover:bg-purple-400 focus:shadow-outline
            focus:outline-none text-white font-bold py-2 px-4"
            type="button"
            on:click={onClickSlideSave}>
            수정
          </button>
        </div>
      </div>
      <div
        class="modal_back drawer_back bg-gray-800 opacity-50 fixed left-0 top-0
        w-full h-full "
        on:click={onClickSlideModifyModalClose} />
    </div>
  {/if}
</section>
