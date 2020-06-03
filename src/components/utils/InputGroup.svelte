<script>
  export let labelTxt;
  export let idValue;
  export let valueData;
</script>

<style>

</style>

<div class="pb-4">
  <label
    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    for={idValue}>
    {labelTxt}
  </label>
  <input
    class="appearance-none block w-full bg-gray-200 text-gray-700 border-2
    border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none
    focus:bg-white focus:border-purple-500"
    id={idValue}
    type="text"
    bind:value={valueData}
    placeholder="" />
</div>
