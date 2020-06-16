<script>
    import {userState} from "../store/UserStore";
    import {errorState} from "../store/SiteStore";
    import {homeList , productList , shopList } from '../store/ProductStore'
    import {onMount} from "svelte";
    import {link , push , querystring} from "svelte-spa-router";
    import qs from 'qs';


    import UploadForm from "../containers/uplaodproduct/UploadForm.svelte";
    import SectionLayout from '../components/layout/SectionLayout.svelte'
    import FileUpload from "../components/utils/FileUpload.svelte";
    import Error from "../components/Error.svelte";
    import ProgressBar from '../components/utils/ProgressBar.svelte';
    import Button from '../components/utils/Button.svelte';

    onMount(() => {
        if (!$userState) {
            push("/");
        } else if ($userState.level !== 0) {
            push("/");
        }
    });

    let Mode = "create";
    let loading = false
    let questions = [
        {id: 1, text: `육류`},
        {id: 2, text: `해산물`},
        {id: 3, text: `야채`},
        {id: 3, text: `과일`}
    ];
    let formData = {
        productCoverImages: [],
        productMainImages: [],
        title: "",
        description: "",
        selected: questions[0].text,
        price: ""
    };

    const getData = async (id) => {
        const res = await firebase.firestore().collection("products").doc(decodeURI(id)).get();
        // console.log(res.data())
        formData = res.data()
    }

    onMount(() => {
        // console.log($querystring)
        const query = qs.parse($querystring);
        // console.log(query)
        if (query.id) {
            getData(query.id)
            Mode = 'modify'
        }
    })

    const handleSubmit = async () => {

        if (formData.productCoverImages.length !== 1) {
            $errorState = {
                open: true,
                errorMessage: "커버이미지를 등록해주세요."
            };
            return false;
        }
        if (formData.title === "") {
            $errorState = {
                open: true,
                errorMessage: "상품 이름을 입력해주세요."
            };
            return false;
        }
        if (formData.description === "") {
            $errorState = {
                open: true,
                errorMessage: "상품 설명을 입력해주세요."
            };
            return false;
        }
        if (formData.price === "") {
            $errorState = {
                open: true,
                errorMessage: "상품 가격을 입력해주세요."
            };
            return false;
        }
        if (formData.productMainImages.length !== 1) {
            $errorState = {
                open: true,
                errorMessage: "메인이미지를 등록해주세요."
            };
            return false;
        }

        loading = true
        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        const yyyy = today.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }

        let date, createdAt, _name;
        if (Mode === "create") {
            date = yyyy + "-" + mm + "-" + dd;
            createdAt = today;
            _name = yyyy + mm + dd;
        } else {
            date = formData.date;
            createdAt = formData.createdAt;
            _name = formData._name;
        }

        const modifiedAt = today;

        formData.date = date;
        formData.createdAt = createdAt;
        formData.modifiedAt = modifiedAt;
        formData._name = _name;

        if (Mode === 'create') {
            const RandomNumber = Math.random().toString(36).substr(2, 11);
            formData.id = `product${RandomNumber}${_name}`;
        }


        // console.log(formData);

        try {
            await firebase.firestore().collection("products").doc(formData.id).set(formData);
            push("/upload-product-list");
        } catch (e) {
            console.log(e);
        } finally {
            $homeList.length >= 1 && $homeList.unshift(formData)
            $productList.length >= 1 && $productList.unshift(formData)
            $shopList.length >= 1 && $shopList.unshift(formData)



        }

        // const formData = new FormData(); // Currently empty
        // console.log(formData);
    };

</script>

<style>
    textarea {
        height: 150px;
        resize: none;
    }
</style>

{#if loading}
<ProgressBar />
{/if}

<SectionLayout Title="상품 업로드" subTitle="상품 업로드 페이지입니다.">
    <form on:submit|preventDefault={handleSubmit}>

        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <span class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
                  커버 이미지
                </span>
                <FileUpload section="product" maxitem="1" bind:imageLists={formData.productCoverImages}/>
            </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
                    상품 이름
                </label>
                <input class="bg-white focus:outline-none focus:shadow-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                       id="name" type="text" placeholder="" bind:value={formData.title}/>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="description">
                    상품 간단 설명
                </label>
                <textarea
                        class="bg-white focus:outline-none focus:shadow-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                        id="description" type="text" placeholder="" maxlength="250" bind:value={formData.description}/>
            </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="category">
                    상품 카테고리
                </label>
                <select name="category" id="category" bind:value={formData.selected}
                        class="bg-white focus:outline-none focus:shadow-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal">
                    {#each questions as question}
                        <option value={question}>{question.text}</option>
                    {/each}
                </select>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="price">
                    상품 가격
                </label>
                <input class="bg-white focus:outline-none focus:shadow-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                       id="price" type="number" placeholder="" bind:value={formData.price}/>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <span class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
                  상품 상세이미지
                </span>
                <FileUpload section="product" maxitem="1" fullWidth bind:imageLists={formData.productMainImages}/>
            </div>
        </div>
        <div class="btn_box flex items-center justify-center">
            <Button mode="link" href="/upload-product-list">취소</Button>
            <Button type="submit">업로드</Button>
        </div>


    </form>
</SectionLayout>


<Error backcolor="red"/>

<!--<UploadForm/>-->
