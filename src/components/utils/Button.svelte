<script>
    export let width = undefined;
    export let clickEvent = undefined;
</script>

<style>
    .full {
        width: 100%;
    }

</style>

<button type="button" class="bg-transparent leading-normal hover:bg-black text-xs text-black text-opacity-75 hover:text-white px-4 py-2 border border-gray-500 hover:border-transparent focus:shadow-none focus:outline-none rounded-sm"
        class:full={width === 'full'}
        on:click={clickEvent}>
    <slot></slot>
</button>