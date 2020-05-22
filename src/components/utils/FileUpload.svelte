<script>
  import { onMount } from "svelte";
  export let section;
  export let maxitem;
  export let imageLists;

  const onChangeInput = async e => {
    // console.log(e.target.files);
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("첨부파일 사이즈는 5MB 이내로 등록 가능합니다.");
      return false;
    }

    const _name = file.name;
    const storageRef = firebase.storage().ref();
    const res = await storageRef.child(`site/${section}/${_name}`).put(file);
    const url = await storageRef
      .child(`site/${section}/${_name}`)
      .getDownloadURL();
    // console.log(url);
    imageLists = [
      ...imageLists,
      {
        src: url,
        name: _name
      }
    ];
  };

  const onClickDeleteImage = async e => {
    // console.log(e);
    const storageRef = firebase.storage().ref();
    await storageRef.child(`site/${section}/${e.name}`).delete();
    imageLists = imageLists.filter(list => list.src !== e.src);
  };
</script>

<style>
  .upload_image_list li {
    width: 25%;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
  }

  .upload_image_list li button {
    position: absolute;
    right: 15px;
    top: 15px;
    z-index: 10;
    color: #fff;
  }

  .upload_image_list li .image_box {
    position: relative;
  }
  .upload_image_list li .image_box:before {
    content: "";
    display: block;
    padding-bottom: 100%;
    width: 100%;
  }

  .upload_image_list li .image_box img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
  }
</style>

<div class="upload_image_list">
  <ul class="flex flex-wrap">

    {#each imageLists as list}
      <li>
        <button type="button">
          <i
            class="far fa-times-circle fa-lg"
            on:click={onClickDeleteImage(list)} />
        </button>
        <div class="image_box">
          <img src={list.src} alt="" />
        </div>
      </li>
    {/each}

  </ul>
</div>

<div class="input_box">
  {#if maxitem > imageLists.length}
    <input
      type="file"
      id="slide_image_file"
      accept="image/*"
      class="hidden"
      on:change={onChangeInput} />
    <label
      for="slide_image_file"
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4
      rounded inline-flex items-center cursor-pointer">
      <span>이미지 업로드</span>
    </label>
  {/if}
</div>
