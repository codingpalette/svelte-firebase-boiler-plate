<script>
  import FileUpload from "../../components/utils/FileUpload.svelte";

  let questions = [
    { id: 1, text: `육류` },
    { id: 2, text: `해산물` },
    { id: 3, text: `야채` },
    { id: 3, text: `과일` }
  ];
  let formData = {
    productImages: [],
    title: "",
    description: "",
    selected: questions[0].text,
    price: ""
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      await firebase
        .firestore()
        .collection("products")
        .doc(formData.title)
        .set(formData);
    } catch (e) {
      console.log(e);
    }

    // const formData = new FormData(); // Currently empty
    // console.log(formData);
    console.log("bbbb");
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
        <FileUpload
          section="product"
          maxitem="5"
          bind:imageLists={formData.productImages} />
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
          상품 설명
        </label>
        <textarea
          class="appearance-none block w-full bg-gray-200 text-gray-700 border-2
          border-gray-200 rounded py-3 px-4 mb-3 leading-tight
          focus:outline-none focus:bg-white focus:border-purple-500 "
          id="description"
          type="text"
          placeholder=""
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
    <button
      type="submit"
      class="bg-purple-500 hover:bg-purple-400 rounded px-4 py-2 text-white">
      업로드
    </button>

  </form>
</div>
