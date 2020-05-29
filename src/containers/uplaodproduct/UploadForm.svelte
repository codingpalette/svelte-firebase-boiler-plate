<script>
  import { errorState } from "../../store/SiteStore";
  import { push } from "svelte-spa-router";
  import FileUpload from "../../components/utils/FileUpload.svelte";
  import Error from "../../components/Error.svelte";

  let Mode = "create";
  let questions = [
    { id: 1, text: `육류` },
    { id: 2, text: `해산물` },
    { id: 3, text: `야채` },
    { id: 3, text: `과일` }
  ];
  let formData = {
    productCoverImages: [],
    productMainImages: [],

    title: "",
    description: "",
    selected: questions[0].text,
    price: ""
  };

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

    const RandomNumber = Math.random()
      .toString(36)
      .substr(2, 11);

    formData.id = `product${RandomNumber}${_name}`;

    // console.log(formData);

    try {
      await firebase
        .firestore()
        .collection("products")
        .doc(formData.id)
        .set(formData);
      push("/");
    } catch (e) {
      console.log(e);
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

<div class="upload_product_container max-w-screen-md my-8 ml-auto mr-auto">
  <div class="text-center mb-8">
    <h2 class="text-4xl">상품 업로드</h2>
  </div>

  <form on:submit|preventDefault={handleSubmit}>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <span
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold
          mb-2"
          for="name">
          커버 이미지
        </span>
        <FileUpload
          section="product"
          maxitem="1"
          bind:imageLists={formData.productCoverImages} />
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold
          mb-2"
          for="name">
          상품 이름
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border-2
          border-gray-200 rounded py-3 px-4 mb-3 leading-tight
          focus:outline-none focus:bg-white focus:border-purple-500"
          id="name"
          type="text"
          placeholder=""
          bind:value={formData.title} />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold
          mb-2"
          for="description">
          상품 간단 설명
        </label>
        <textarea
          class="appearance-none block w-full bg-gray-200 text-gray-700 border-2
          border-gray-200 rounded py-3 px-4 mb-3 leading-tight
          focus:outline-none focus:bg-white focus:border-purple-500 "
          id="description"
          type="text"
          placeholder=""
          maxlength="200"
          bind:value={formData.description} />
      </div>
    </div>

    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold
          mb-2"
          for="category">
          상품 카테고리
        </label>
        <select
          name="category"
          id="category"
          bind:value={formData.selected}
          class="block appearance-none w-full bg-gray-200 border-2
          border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight
          focus:outline-none focus:bg-white focus:border-purple-500">
          {#each questions as question}
            <option value={question}>{question.text}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold
          mb-2"
          for="price">
          상품 가격
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-700 border-2
          border-gray-200 rounded py-3 px-4 mb-3 leading-tight
          focus:outline-none focus:bg-white focus:border-purple-500"
          id="price"
          type="number"
          placeholder=""
          bind:value={formData.price} />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <span
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold
          mb-2"
          for="name">
          상품 상세이미지
        </span>
        <FileUpload
          section="product"
          maxitem="1"
          fullWidth
          bind:imageLists={formData.productMainImages} />
      </div>
    </div>
    <button
      type="submit"
      class="bg-purple-500 hover:bg-purple-400 rounded px-4 py-2 text-white
      focus:shadow-outline focus:outline-none">
      업로드
    </button>

  </form>
</div>

<Error backcolor="red" />
