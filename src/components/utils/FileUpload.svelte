<script>
    import {onMount} from "svelte";

    export let section;
    export let maxitem;
    export let imageLists;
    export let fullWidth = undefined;

    let loading = false;

    const RandomNumber = Math.random().toString(36).substr(2, 11);

    const onChangeInput = async e => {
        loading = true
        // console.log(e.target.files);
        const file = e.target.files[0];
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            alert("첨부파일 사이즈는 5MB 이내로 등록 가능합니다.");
            loading = false;
            return false;
        }

        const _name = file.name;
        const RandomNumber = Math.random()
                .toString(36)
                .substr(2, 11);
        const storageRef = firebase.storage().ref();
        const res = await storageRef
                .child(`site/${section}/${RandomNumber}-${_name}`)
                .put(file);
        const url = await storageRef
                .child(`site/${section}/${RandomNumber}-${_name}`)
                .getDownloadURL();
        // console.log(url);
        imageLists = [
            ...imageLists,
            {
                src: url,
                name: `${RandomNumber}-${_name}`
            }
        ];
        loading = false;
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

    .upload_image_list.fullWidth li {
        width: 100%;
    }

    .upload_image_list li button {
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 10;
        width: 30px;
        height: 30px;
        background-color: rgba(0,0,0,0.7);
    }

    .upload_image_list li button span{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        height: 1px;
        background-color:#fff;
    }

    .upload_image_list li button span.line1{
        transform: translate(-50% , -50%) rotate(45deg);
    }

    .upload_image_list li button span.line2{
        transform: translate(-50% , -50%) rotate(-45deg);
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

    .upload_image_list.fullWidth li .image_box:before {
        display: none;
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

    .upload_image_list.fullWidth li .image_box img {
        position: relative;
        width: 100%;
        height: auto;
        left: 0;
        top: 0;
        transform: translate(0);
    }

    .input_box label{
        min-width: 100px;
        display: inline-block;
        text-align: center;
    }

    .input_box label.active{
        pointer-events: none;
    }
</style>

<div class="upload_image_list" class:fullWidth>
    <ul class="flex flex-wrap">

        {#each imageLists as list}
            <li>
                <button
                    type="button"
                    class="focus:shadow-none focus:outline-none"
                    on:click={onClickDeleteImage(list)}
                >
                    <span class="line1"></span>
                    <span class="line2"></span>
<!--                    <i class="far fa-times-circle fa-lg" on:click={onClickDeleteImage(list)} />-->
                </button>
                <div class="image_box">
                    <img src={list.src} alt=""/>
                </div>
            </li>
        {/each}

    </ul>
</div>

<div class="input_box ">
    {#if maxitem > imageLists.length}
        <input
                type="file"
                id={RandomNumber}
                accept="image/*"
                class="hidden"
                on:change={onChangeInput}/>
        <label
                for={RandomNumber}
                class:active={loading}
                class="bg-transparent cursor-pointer leading-normal hover:bg-black text-xs text-black text-opacity-75 hover:text-white px-3 py-2 border border-gray-500 hover:border-transparent focus:shadow-none focus:outline-none rounded-sm">
            {#if loading}
                <span><i class="fas fa-spinner fa-spin"></i></span>
            {:else}
                <span>이미지 업로드</span>
            {/if}
        </label>
    {/if}
</div>
