<script>
    export let labelTxt = undefined;
    export let idValue = undefined;
    export let valueData = undefined;
</script>

<style>

</style>

<div class="pb-4">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
           for={idValue}
    >
        {labelTxt}
    </label>
    <input
            class="bg-white focus:outline-none focus:shadow-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            id={idValue}
            type="text"
            bind:value={valueData}
            placeholder=""
    />
</div>
