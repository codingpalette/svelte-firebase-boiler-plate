<script>
  import { siteState } from "../../store/SiteStore";
  // import { mainData, modalData } from "../../store/HomeStore";
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import PenButton from "../../components/PenButton.svelte";
  import FileUpload from "../../components/utils/FileUpload.svelte";
  import InputGroup from "../../components/utils/InputGroup.svelte";
  import NotContent from "../../components/utils/NotContent.svelte";

  let backImg = "images/back_img04.jpg";

  let loading = false;
  let mainData = {
    mainTitle: "What is Lorem Ipsum?",
    subTitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: [{ name: "backImg", src: backImg }]
  };
  let modalData = {
    mainTitle: "What is Lorem Ipsum?",
    subTitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: [{ name: "backImg", src: backImg }]
  };

  let slideModalOpen = false;

  const getMainImage = async () => {
    try {
      const res = await firebase
        .firestore()
        .collection("site")
        .doc("mainImage")
        .get();
      // console.log(res.data());
      if (res.data()) {
        mainData = res.data();
        modalData = res.data();
      }
      // console.log(mainImage);
    } catch (e) {
      // console.log(e);
    } finally {
      loading = true;
    }
  };

  onMount(() => {
    if (mainData.image.length === 0) {
      getMainImage();
    } else {
      loading = true;
    }
  });

  const onClickModalOpen = () => {
    slideModalOpen = true;
  };

  const onClickModalClose = () => {
    slideModalOpen = false;
  };

  const handleSubmit = async () => {
    await firebase
      .firestore()
      .collection("site")
      .doc("mainImage")
      .set({
        mainTitle: modalData.mainTitle,
        subTitle: modalData.subTitle,
        image: modalData.image
      });
    mainData = {
      mainTitle: modalData.mainTitle,
      subTitle: modalData.subTitle,
      image: modalData.image
    };
    slideModalOpen = false;
  };
</script>

<style>
  .slide_content {
    height: 480px;
  }
  .slide_content a img {
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .slide_content .text_box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.35);
    text-align: center;
  }
  @media screen and (min-width: 768px) {
    .slide_content {
      height: 640px;
    }
  }
</style>

<section class="slide_container relative">
  {#if loading}
    {#if mainData.image.length > 0}
      <div class="slide_content">
        <a href="/about" use:link class="block relative w-full h-full">
          <img src={mainData.image[0].src} alt="" />
          <div class="text_box p-4">
            <strong class="text-4xl">{mainData.mainTitle}</strong>
            <p class="text-lg">{mainData.subTitle}</p>
          </div>
        </a>
      </div>
    {:else}
      <div class="py-4 box-border">
        <NotContent text="이미지가 없습니다." />
      </div>
    {/if}
  {/if}
  <!-- <PenButton position clickEvent={onClickModalOpen} /> -->

  {#if slideModalOpen}
    <div
      class="slide_modify_modal flex items-center justify-center fixed top-0
      left-0 w-full h-full z-30 p-4 overflow-y-auto">
      <div
        class="modal_content max-w-screen-md w-full rounded bg-white
        overflow-hidden shadow-lg relative z-10 m-auto">
        <form on:submit|preventDefault={handleSubmit}>
          <div class="px-6 py-4">
            <span
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2"
              for="name">
              메인 이미지
            </span>
            <FileUpload
              section="mainImage"
              maxitem="1"
              bind:imageLists={modalData.image} />
          </div>

          <InputGroup
            labelTxt="메인 타이틀"
            idValue="main_title"
            bind:valueData={modalData.mainTitle} />
          <InputGroup
            labelTxt="서브 타이틀"
            idValue="sub_title"
            bind:valueData={modalData.subTitle} />
          <div class="flex items-center justify-center mt-2">
            <button
              class="w-2/4 bg-gray-300 hover:bg-gray-200 focus:shadow-outline
              focus:outline-none py-2 px-4"
              on:click={onClickModalClose}>
              닫기
            </button>
            <button
              class="w-2/4 bg-purple-500 hover:bg-purple-400
              focus:shadow-outline focus:outline-none text-white font-bold py-2
              px-4"
              type="submit">
              수정
            </button>
          </div>
        </form>

      </div>
      <div
        class="modal_back drawer_back bg-gray-800 opacity-50 fixed left-0 top-0
        w-full h-full "
        on:click={onClickModalClose} />
    </div>
  {/if}
</section>
